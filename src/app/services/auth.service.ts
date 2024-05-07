import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { AuthResponseData } from '../models/authResponseData';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public auth:AuthResponseData|null=null;
  public isLoggedin=false;
  public onUserStatusChange=new EventEmitter<boolean>();

  constructor(private http:HttpClient, private router:Router) { 

  }

  public register(email:string, password:string, newUser:boolean){
    const method=(newUser)?'signUp':'signInWithPassword';

    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:'+method+'?key= AIzaSyC4gUDhdYtqTRRLdlx0cMLXHw72rAYdATI ',{
      email:email,
      password:password,
      returnSecureToken:true
    }).pipe(tap( (response)=>{
      this.auth=response;
      this.isLoggedin=true;
      this.onUserStatusChange.emit(true);
    }));
  }

  public logout(){
    this.isLoggedin=false;
    this.auth=null;
    this.onUserStatusChange.emit(false);
    this.router.navigate(['/']);
  }
}