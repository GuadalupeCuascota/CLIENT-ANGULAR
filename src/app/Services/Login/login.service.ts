import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http'
import {Usuario} from '../../Models/usuario'
import {Router} from '@angular/router'
import { JwtHelperService } from "@auth0/angular-jwt";
import { environment } from 'src/environments/environment';
const helper=new JwtHelperService

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  datos: any = {};
  API_URI='http://localhost:3000/login';
  constructor(private http: HttpClient,
    private router: Router) { }

  login (usuario:Usuario){
    return this.http.post(`${environment.API_URI1}`,usuario); 
  }

  loggedIn(){ //metodo que devuelve un tipo boleano en caso de existir o no un token almacenado en el localstorage
    if(localStorage.getItem('token')){
    
    }
     return  !!localStorage.getItem('token')
  }
  logOut(){
    localStorage.clear();
    this.router.navigate(['/login'])
  }
 
  getToken(){
    return localStorage.getItem('token')

  }
  IsAdmin(){
    
    this.datos=JSON.parse(localStorage.getItem('payload'));
     
        return this.datos.id_rol
     

  }
  }
