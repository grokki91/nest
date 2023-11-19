import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable()
export class BookCreateInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    return next.handle().pipe(
      map((data) => ({
        status: 'success',
        data: data,
      })),
      catchError((err) => {
        return throwError({
          status: 'fail',
          data: err,
        });
      }),
    );
  }
}
