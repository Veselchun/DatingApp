import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { NavigationExtras, Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router,private toastr: ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(error => {
        if(error) {
          switch(error.status) {
            case 400:
              //flatten errors
              if(error.error.errors) {
                const modelStateErrors = [];
                for(const key in error.error.errors) {
                  if(error.error.errors[key]) {
                    modelStateErrors.push(error.error.errors[key]);
                  }
                }
                throw modelStateErrors.flat();
              }
              else {
                this.toastr.error(error.statusText, error.status);
              }
              break;
            
            case 401:
              this.toastr.error(error.statusText, error.status);
              break;
            
            case 404:
              this.router.navigateByUrl('/not-found');
              break;
            
            case 500:
              const navigationExtras: NavigationExtras = { state: {error: error.error }};
              this.router.navigateByUrl('/server-error', navigationExtras);
              break;

            default:
              this.toastr.error('Something unexpected went wrong.');
              console.log(error);
              break;
          }
        }
        return throwError(error);
      })
    );
  }
}
