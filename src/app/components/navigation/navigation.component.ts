import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {
  public isLoggedin=false;

  public constructor(private authService:AuthService){
    this.authService.onUserStatusChange.subscribe( (isLoggedin)=>{
      this.isLoggedin=isLoggedin;
    });
  }

  public onClickLogout(){
    this.authService.logout();
  }



}