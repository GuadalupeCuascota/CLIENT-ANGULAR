import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Materia} from '../Models/materias';
import { environment } from 'src/environments/environment'
@Injectable({
  providedIn: 'root'
})
export class RegistroMateriasCarreraService {

  constructor(private http: HttpClient) { }
  getMateriasCarrera (){
    return this.http.get(`${environment.API_URI}/materiasCarrera`);
  
  }
  
  getMateriaCarrera (id:String){
    return this.http.get(`${environment.API_URI}/materiasCarrera/${id}`);
  
  }
  saveMateriaCarrera (materia:Materia){
    return this.http.post(`${environment.API_URI}/materiasCarrera`,materia);
  
  }
  deleteMateriaCarrera (id:String){
    return this.http.delete(`${environment.API_URI}/materiasCarrera/${id}`);
  
  }
updateMateriaCarrera(id:String, updateMateria:Materia){
    return this.http.put(`${environment.API_URI}/materiasCarrera/${id}`,updateMateria);
  
  }
}
