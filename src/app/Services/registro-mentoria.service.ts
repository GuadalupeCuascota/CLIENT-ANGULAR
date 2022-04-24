import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http'
import {Mentoria} from '../Models/mentoria'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistroMentoriaService {

  
  filtroUsuario: "";
  

  constructor(private http: HttpClient) { }

  getMentorias(){
    return this.http.get(`${environment.API_URI}/registro-mentorias`);
  
  }
  getMentoriasAgendadas(){
    return this.http.get(`${environment.API_URI}/solicitudMentoria`);
  
  }
  getAgendamientoMentorias(id:number){
    return this.http.get(`${environment.API_URI}/solicitudMentoria/${id}`);
  
  }
  
  getMentoria (id:number){
    return this.http.get(`${environment.API_URI}/registro-mentorias/${id}`);
  
  }
  saveMentoria (formData){
    return this.http.post(`${environment.API_URI}/registro-mentorias`,formData);
  
  }
  deleteMentoria (id:String){
    return this.http.delete(`${environment.API_URI}/registro-mentorias/${id}`);
  
  }
updateMentoria (id:String, updateMentoria:Mentoria){
    return this.http.put(`${environment.API_URI}/registro-mentorias/${id}`,updateMentoria);
  
  }
  updateAgenMentoria(id:number, updateM:Mentoria){
    return this.http.put(`${environment.API_URI}/solicitudMentoria/${id}`,updateM);
  }
  
  
}
