import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UserDto } from './dto/user.dto';
import { PasswordReset } from '@prisma/client';
import { EmailService } from '../email/email.service';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name, { timestamp: true });

  constructor(private prisma: PrismaService, private emailService: EmailService) {}

  async create(createUserDto: CreateUserDto): Promise<UserDto> | null {
    const {
      email,
      firstName,
      lastName,
      password,
      roles
    } = createUserDto;

    const data = await this.prisma.user.create({
      data: {
        email,
        firstName,
        lastName,
        roles,
        password: await this.hashPassword(password)
      }
    });


    const emailConfirmationToken = await this.createEmailConfirmation(data.id, parseInt(process.env.EMAIL_CONFIRMATION_TTL) || 86400);

    this.logger.debug(`sending confirmation email to ${data.email}`);
    const url = `${process.env.UI_BASE_URL}/auth/confirm-email#token=${encodeURIComponent(emailConfirmationToken)}`;

    await this.emailService.send({
      to: {
        name: `${data.firstName} ${data.lastName}`.trim(),
        address: data.email
      },
      subject: 'EW Zero - confirm email address',
      text: `Please open following link in your web browser to confirm you have registered a new account at EW Zero with ${data.email} address: ${url}`,
      html: `Please click the following <a href='${url}'>link</a> to confirm you have registered a new account at EW Zero with ${data.email} address. Or copy the following to your web browser address bar: ${url}`
    }).catch(async (err) => {
      this.logger.error(`error sending email address confirmation message to ${data.email}`);
      this.logger.error(err.toString());
      this.logger.debug(JSON.stringify(err));

      // updating record to make it possible to register once again
      await this.prisma.user.update({
        data: { email: `${data.email} fail ${new Date().toISOString()}` },
        where: { email: data.email }
      });

      throw err;
    });

    return new UserDto(data);
  }

  async findAll() {
    return (await this.prisma.user.findMany()).map((row) => new UserDto(row));
  }

  async findOne(id: number): Promise<UserDto> | null {
    const data = await this.prisma.user.findUnique({ where: { id } });
    if (!data) return null;
    return new UserDto(data);
  }

  async findByEmail(email: string): Promise<UserDto> | null {
    const data = await this.prisma.user.findUnique(({ where: { email } }));
    if (!data) return null;
    return new UserDto(data);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const {
      firstName,
      lastName,
      password,
      roles
    } = updateUserDto;

    const data = await this.prisma.user.update({
      where: { id },
      data: {
        firstName,
        lastName,
        password: password ? await this.hashPassword(password) : undefined,
        roles
      }
    });

    return new UserDto(data);
  }

  async remove(id: number) {
    await this.prisma.user.delete({ where: { id } });
  }

  private async hashPassword(password) {
    return await bcrypt.hash(password, 8);
  }

  async checkPassword(id, password) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException();
    }

    return await bcrypt.compare(password, user.password);
  }

  async passwordResetInitialize(userId: number, ttl: number): Promise<string> {
    const expiresAt = new Date(new Date().getTime() + ttl * 1000); // TODO: set in .env
    const newItem = await this.prisma.passwordReset.create({ data: { userId, expiresAt } });

    return newItem.id;
  }

  async passwordResetInvalidate(token) {
    const tokenRecord = await this.prisma.passwordReset.findUnique({ where: { id: token } });

    if (!tokenRecord || tokenRecord.usedAt || tokenRecord.expiresAt < new Date()) {
      throw new NotFoundException();
    }

    return await this.prisma.passwordReset.update({
      where: { id: token },
      data: { usedAt: new Date() }
    });
  }

  async validatePasswordReset(token: string): Promise<PasswordReset | null> {
    const tokenRecord = await this.prisma.passwordReset.findUnique({ where: { id: token } });

    if (tokenRecord === null) return null;

    if (tokenRecord.expiresAt < new Date()) return null;

    if (tokenRecord.usedAt) return null;

    return tokenRecord;
  }

  async createEmailConfirmation(userId: number, ttl: number): Promise<string> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [oldRecords, newRecord] = await this.prisma.$transaction([
      this.prisma.emailConfirmation.updateMany({ where: { userId }, data: { valid: false } }),
      this.prisma.emailConfirmation.create({
        data: {
          userId,
          expiresAt: new Date(new Date().getTime() + ttl * 1000)
        }
      })
    ]);

    return newRecord.id;
  }

  async confirmEmail(token: string) {
    const emailConfirmation = await this.prisma.emailConfirmation.findUnique({ where: { id: token } });

    if (
      !emailConfirmation ||
      emailConfirmation.confirmedAt ||
      !emailConfirmation.valid ||
      emailConfirmation.expiresAt.getTime() < Date.now()
    ) throw new NotFoundException();

    await this.prisma.$transaction([
      this.prisma.user.update({ where: { id: emailConfirmation.userId }, data: { emailConfirmed: true } }),
      this.prisma.emailConfirmation.update({ where: { id: emailConfirmation.id }, data: { confirmedAt: new Date() } }),
      this.prisma.emailConfirmation.updateMany({ where: { userId: emailConfirmation.userId }, data: { valid: false } })
    ]);
  }
}
