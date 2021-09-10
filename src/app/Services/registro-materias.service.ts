import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Materia} from '../Models/materias';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class RegistroMateriasService {

  constructor(private http: HttpClient) { }
  
  getMaterias (){
    return this.http.get(`${environment.API_URI}/materias`);
  
  }
  
  getMateria (id:String){
    return this.http.get(`${environment.API_URI}/materias/${id}`);
  
  }
  saveMateria (materia:Materia){
    return this.http.post(`${environment.API_URI}/materias`,materia);
  
  }
  deleteMateria (id:String){
    return this.http.delete(`${environment.API_URI}/materias/${id}`);
  
  }
updateMateria(id:String, updateMateria:Materia){
    return this.http.put(`${environment.API_URI}/materias/${id}`,updateMateria);
  
  }
}
