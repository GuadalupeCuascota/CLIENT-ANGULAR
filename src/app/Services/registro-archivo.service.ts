import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http'
import {Archivo} from '../Models/archivo'
import {Publicacion} from '../Models/publicacion';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistroArchivoService {
  API_URI='http://localhost:3000/api';
  
  constructor(private http:HttpClient) { }
  getArchivos (){
    return this.http.get(`${environment.API_URI}/publicaciones`);
  
  }
  
  getArchivo (id:String){
    return this.http.get<Archivo>(`${environment.API_URI}/publicaciones/${id}`);
  
  }
  saveArchivo (formData){
    
    return this.http.post(`${environment.API_URI}/publicaciones`,formData);
  
  }
  deleteArchivo (id:String){
    return this.http.delete(`${environment.API_URI}/publicaciones/${id}`);
  
  }
updateArchivo (id:number, formData){
    return this.http.put(`${environment.API_URI}/publicaciones/${id}`,formData);
  
  }
  
  

  
}
