import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {solicitudMentoria} from '../Models/solicitudMentoria';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class RegistroSolicitudMentoriasService {

  constructor(private http: HttpClient) { }
  getSolicitudMentorias(){
    return this.http.get(`${environment.API_URI}/solicitudesMentoria`);
  }
}
