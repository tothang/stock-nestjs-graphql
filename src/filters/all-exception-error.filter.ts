import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    console.log('exception', exception);
    const status =
      (exception?.getStatus && exception?.getStatus()) ||
      HttpStatus.INTERNAL_SERVER_ERROR;
    return response.json({
      status: 'error',
      error_code: status.toString(),
      error_message:
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        exception?.options?.description || exception?.message || '',
      data: exception?.getResponse && exception.getResponse(),
    });
  }
}
