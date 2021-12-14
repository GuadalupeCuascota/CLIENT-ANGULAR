import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment'
import {Mentoria} from '../Models/mentoria'
@Injectable({
  providedIn: 'root'
})
export class CancelarMentoriaService {

  constructor(private http: HttpClient) { }
  cancelarMentoria(id:String, id_estado_mentoria:String){
    return this.http.put(`${environment.API_URI}/cancelacionMentoria/${id}`,id_estado_mentoria);
  
  }
}