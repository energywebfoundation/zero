import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

import { User, UserRole } from '@prisma/client';

export class UserEntity implements User {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'testuser1@foo.bar' })
  email: string;

  @ApiProperty({ example: 'John' })
  firstName: string;

  @ApiProperty({ example: 'Smith' })
  lastName: string;

  @ApiProperty({ isArray: true, enum: UserRole, enumName: 'UserRole' })
  roles: UserRole[]

  @Exclude()
  password: string;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }

}
