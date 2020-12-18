import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { MessagesService } from '../shared/services/messages.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor {

  constructor (
    private messageService: MessagesService
    ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap((evento: HttpEvent<any>) => { }),
      catchError(resposta => this.processError(resposta)));
  }

  processError(response: object): Observable<HttpEvent<any>> {
    if (response instanceof HttpErrorResponse && response.status !== 401) {
      this.messageService.error(response.error.message);
    }

    return throwError(response);
  }
}
