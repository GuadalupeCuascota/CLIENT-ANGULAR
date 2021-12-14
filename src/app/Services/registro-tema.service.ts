import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import{HttpClient} from '@angular/common/http'
import {TemaMateria} from '../Models/tema_materia'



@Injectable({
  providedIn: 'root'
})
export class RegistroTemaService {

  constructor(private http: HttpClient) { }

  getTemas (){
    return this.http.get(`${environment.API_URI}/temaMateria`);
  
  }
  
  getTema (id:number){
    return this.http.get(`${environment.API_URI}/temaMateria/${id}`);
  
  }
  saveTema (tema:TemaMateria){
    return this.http.post(`${environment.API_URI}/temaMateria`,tema);
  
  }
  deleteTema (id:number){
    return this.http.delete(`${environment.API_URI}/temaMateria/${id}`);
  
  }
updateTema (id:String, updateTema:TemaMateria){
    return this.http.put(`${environment.API_URI}/temaMateria/${id}`,updateTema);
  
  }
  
}
