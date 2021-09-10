import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { from, Observable } from 'rxjs';
//importar el módulo encargado de realizar peticiones http
import{HttpClient} from '@angular/common/http'
import {Usuario} from '../Models/usuario'
import {CambioPass} from '../Models/cambioPass'



@Injectable({
  providedIn: 'root'
})
export class RegistroUsuarioService {
 
  filtroUsuario: "";
  

  constructor(private http: HttpClient) { }

  getUsuarios (){
    return this.http.get(`${environment.API_URI}/usuarios`);
  
  }
  
  getUsuario (id:String){
    return this.http.get(`${environment.API_URI}/usuarios/${id}`);
  
  }
  saveUsuario (usuario:Usuario){
    return this.http.post(`${environment.API_URI}/usuarios`,usuario);
  
  }
  deleteUsuario (id:String){
    return this.http.delete(`${environment.API_URI}/usuarios/${id}`);
  
  }
updateUsuario (id:String, updateUsuario:Usuario){
    return this.http.put(`${environment.API_URI}/usuarios/${id}`,updateUsuario);
  
  }
  updatePass(id:String, updatePass:CambioPass){
    return this.http.put(`${environment.API_URI}/cambiarPass/${id}`,updatePass);
  
  }
  
  

}
