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
// Prisijungimas kai prisijungime ivede slaptazodi
  public register(email:string, password:string, newUser:boolean){
    const method=(newUser)?'signUp':'signInWithPassword';

    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:'+method+'?key= AIzaSyC4gUDhdYtqTRRLdlx0cMLXHw72rAYdATI ',{
      email:email,
      password:password,
      returnSecureToken:true
    }).pipe(tap( (response)=>{
      this.auth=response;
      this.isLoggedin=true;
      //Issaugome duomenis prisijungimo
      localStorage.setItem("user", JSON.stringify(this.auth));
      this.onUserStatusChange.emit(true);
    }));
  }




 
  public autoLogin(){
   let user=localStorage.getItem("user");
   //Patikriname ar esame prisijunge
   if(user!=null){
    JSON.parse(user);
    this.isLoggedin=true;
    this.onUserStatusChange.emit(true);
   }
  }

  //Asijungiame paspaude mygtuka atsijungti
  public logout(){
    this.isLoggedin=false;
    this.auth=null;
    //Issitriname prisijungimo duomenis
    localStorage.removeItem("user")
    this.onUserStatusChange.emit(false);
    this.router.navigate(['/']);
  }
}