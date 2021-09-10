import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http'
import {Rol} from '../Models/rol';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class RegistroRolService {
  
  constructor( private http:HttpClient) { }
  getRoles(){
    return this.http.get(`${environment.API_URI}/roles`);
 
  
  }
  getRol (id:String){
    return this.http.get(`${environment.API_URI}/roles/${id}`);
  
  }
  saveRol (rol:Rol){
    return this.http.post(`${environment.API_URI}/roles`,rol);
  
  }
  deleteURol (id:String){
    return this.http.delete(`${environment.API_URI}}/roles/${id}`);
  
  }
  updateRol (id:String, updateRol:Rol){
    return this.http.put(`${environment.API_URI}/roles/${id}`,updateRol);
  
  }
}
