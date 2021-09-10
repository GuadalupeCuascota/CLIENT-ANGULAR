import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Carrera} from '../Models/carreras';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ResgitroCarrerasService {
 
  
  

  constructor(private http: HttpClient) { }

 
  
  getCarreras (){
    return this.http.get(`${environment.API_URI}/carrerasFica`);
  
  }
  
  getCarrera (id:String){
    return this.http.get(`${environment.API_URI}/carrerasFica/${id}`);
  
  }
  saveCarrera (carrera:Carrera){
    return this.http.post(`${environment.API_URI}/carrerasFica`,carrera);
  
  }
  deleteCarrera (id:String){
    return this.http.delete(`${environment.API_URI}/carrerasFica/${id}`);
  
  }
updateCarrera(id:String, updateCarrera:Carrera){
    return this.http.put(`${environment.API_URI}/carrerasFica/${id}`,updateCarrera);
  
  }
  
}
