import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http'
import {Mentoria} from '../Models/mentoria'

@Injectable({
  providedIn: 'root'
})
export class RegistroMentoriaService {

  API_URI='http://localhost:3000/api';
  filtroUsuario: "";
  

  constructor(private http: HttpClient) { }

  getMentorias(){
    return this.http.get(`${this.API_URI}/registro-mentorias`);
  
  }
  getAgendamientoMentorias(){
    return this.http.get(`${this.API_URI}/solicitudMentoria`);
  
  }
  
  getMentoria (id:String){
    return this.http.get(`${this.API_URI}/registro-mentorias/${id}`);
  
  }
  saveMentoria (formData){
    return this.http.post(`${this.API_URI}/registro-mentorias`,formData);
  
  }
  deleteMentoria (id:String){
    return this.http.delete(`${this.API_URI}/registro-mentorias/${id}`);
  
  }
updateMentoria (id:String, updateMentoria:Mentoria){
    return this.http.put(`${this.API_URI}/registro-mentorias/${id}`,updateMentoria);
  
  }
  updateAgenMentoria(id:number, updateM:Mentoria){
    return this.http.put(`${this.API_URI}/solicitudMentoria/${id}`,updateM);
  }
  
  
}
