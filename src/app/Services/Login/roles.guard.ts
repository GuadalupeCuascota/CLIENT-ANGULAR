import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { LoginService } from './login.service';
import {Router,Routes} from '@angular/router'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolesGuard implements CanActivate {
    constructor( 
    private loginService: LoginService,
    private router:Router){

  }
  canActivate():boolean{
    if(this.loginService.IsAdmin()==1){
      console.log("es admin")
      
      return true

    }else{
     this.router.navigate(['/editor'])
     return false 
    }

  }
}