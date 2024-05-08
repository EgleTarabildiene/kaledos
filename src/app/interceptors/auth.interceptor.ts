import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class authInterceptor implements HttpInterceptor {

  constructor (private authService:AuthService){

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("Interceptorius paleistas");
    //Patikriname ar esame prisijungę
    if (this.authService.auth!=null){
      //Sukuriam kopiją requesto
      let newReq=req.clone({
        // Į rekquestą įdedame naują parametrą
        params:req.params.append("auth",this.authService.auth.idToken)
      });
      //Perduodame modifikuotą requestą
      return next.handle(newReq);
    }

    //perduodame ne modifikuotą requestą
    return next.handle(req);
  }

} 