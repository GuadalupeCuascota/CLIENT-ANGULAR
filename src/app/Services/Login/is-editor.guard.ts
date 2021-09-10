import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';
import {Router,Routes} from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class IsEditorGuard implements CanActivate {
  constructor( 
    private loginService: LoginService,
    private router:Router){

  }
  canActivate():boolean{
    if(this.loginService.IsAdmin()==2){
      console.log("es editor1")
      
      return true

    }else{
     this.router.navigate(['/administrador'])
     return false 
    }

  }
  
}
