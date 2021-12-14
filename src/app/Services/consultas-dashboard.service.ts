


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ConsultasDashboardService {
  constructor(private http: HttpClient) {}
  getEstudiantesMes() {
    return this.http.get(`${environment.API_URI}/nroEstudiantesMes`);
  }
  getMentoriasMes(){
    return this.http.get(`${environment.API_URI}/nroMentoriasMes`);
  }

  getTipoMentoria(){
    return this.http.get(`${environment.API_URI}/tipoMentoria`);
  }
  getNroEventoPorCarrera(){
    return this.http.get(`${environment.API_URI}/eventoPorCarrera`);
  }
  getNroLikesPorPerfil(){
    return this.http.get(`${environment.API_URI}/likesPorPerfil`);
  }
  
}
