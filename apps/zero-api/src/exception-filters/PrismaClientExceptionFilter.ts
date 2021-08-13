import { ArgumentsHost, Catch, ConflictException, NotFoundException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    switch (exception.code) {
      // see error codes: https://www.prisma.io/docs/reference/api-reference/error-reference#prisma-client-query-engine
      case 'P2002':
        super.catch(new ConflictException(), host);
        break
      case 'P2025':
        super.catch(new NotFoundException(), host);
        break
      default:
        // default 500 error code
        super.catch(exception, host);
        break;
    }
  }
}
