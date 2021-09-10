import { Injectable } from '@angular/core';
import { CanActivate,  RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class IsMentorGuard implements CanActivate {
  constructor( 
    private loginService: LoginService,
    private router:Router){

  }
  canActivate():boolean{
    if(this.loginService.IsAdmin()==3){
      console.log("es mentor")
      
      return true

    }else{
     this.router.navigate(['/administrador'])
     return false 
    }

  }
  
}
