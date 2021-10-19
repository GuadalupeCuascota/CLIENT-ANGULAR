import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Materia} from '../Models/materias';
import { environment } from 'src/environments/environment'
@Injectable({
  providedIn: 'root'
})
export class RegistroEventosService {


  constructor(private http: HttpClient) { }
  getEventos(){
    return this.http.get(`${environment.API_URI}/registro-evento`);
  
  }
  
  
  getMateriaCarrera (id:String){
    return this.http.get(`${environment.API_URI}/registro-evento/${id}`);
  
  }
  saveMateriaCarrera (materia:Materia){
    return this.http.post(`${environment.API_URI}/registro-evento`,materia);
  
  }
  deleteMateriaCarrera (id:String){
    return this.http.delete(`${environment.API_URI}/registro-evento/${id}`);
  
  }
updateMateriaCarrera(id:String, updateMateria:Materia){
    return this.http.put(`${environment.API_URI}/registro-evento/${id}`,updateMateria);
  
  }
}
