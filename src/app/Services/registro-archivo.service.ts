import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http'
import {Archivo} from '../Models/archivo'
import {Publicacion} from '../Models/publicacion';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

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

    return this.http.post(`${environment.API_URI}/publicaciones`,formData,{reportProgress:true,observe:'events'

    }).pipe();

  }

  // saveArchivo (publicacion:Publicacion){

  //   return this.http.post(`${environment.API_URI}/publicaciones`,publicacion);

  // }
  deleteArchivo (id:String){
    return this.http.delete(`${environment.API_URI}/publicaciones/${id}`);

  }
updateArchivo (id:number, formData){
    return this.http.put(`${environment.API_URI}/publicaciones/${id}`,formData);

  }



   // this.perfil.nombre_perfil=this.perfilform.controls['nombre_perfil'].value;
  //   this.perfil.profesion=this.perfilform.controls['profesion'].value;

  //   this.perfil.estado_profesion=this.perfilform.controls['estado_perfil'].value;
  //   this.datos.id_usuario=this.perfilform.controls['id_usuario'].value;
  //   this.id=this.perfilform.controls['id_tipo_publicación'].value;
  //   this.perfil.id_carrera=this.perfilform.controls['id_carrera'].value;
  //   this.perfil.enlace=this.perfilform.controls['enlace'].value;
  //   this.archivosSeleccionado=this.perfilform.controls['ruta_archivo'].value;
}
