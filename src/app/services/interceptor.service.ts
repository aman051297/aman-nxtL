import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "../../environments/environment";
import { AuthService } from "../services/auth.service";
import { ActivatedRoute, Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class InterceptorService implements HttpInterceptor {
  isLoggedIn: boolean = false;

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url.includes(environment.BACKEND_HOST)) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
    } 
    // else {
    //   req = req.clone({
    //     setHeaders: {
    //       Authorization: "Bearer " + this.auth.javaAuthToken,
    //     },
    //   });
    // }
    return next.handle(req).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 410) {
            //this.router.navigate("/");
          } else {
            return throwError(err);
          }
        }
      })
    );
  }

}
