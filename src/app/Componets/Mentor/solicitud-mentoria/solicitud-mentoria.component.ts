import { Component, OnInit } from '@angular/core';
import { solicitudMentoria } from 'src/app/Models/solicitudMentoria';
import { RegistroSolicitudMentoriasService } from 'src/app/Services/registro-solicitud-mentorias.service';
import * as moment from 'moment/moment';
@Component({
  selector: 'app-solicitud-mentoria',
  templateUrl: './solicitud-mentoria.component.html',
  styleUrls: ['./solicitud-mentoria.component.css']
})
export class SolicitudMentoriaComponent implements OnInit {
  datos: any = {};
  p: number = 0;
  localTime = moment().format('YYYY-MM-DD');
  SolicitudMentorias: any = [];
  constructor( private registroSolicitudMentoriaService: RegistroSolicitudMentoriasService,) { }

  ngOnInit(): void {
    this.datos = JSON.parse(localStorage.getItem('payload'));
    this.getSolicitudMentorias();
  }
  getSolicitudMentorias() {
    var MentoriaSolicitud= [];
    console.log('obtner mentorias');
   
    this.registroSolicitudMentoriaService.getSolicitudMentorias().subscribe(
      (res: any) => {
        
        for (let usu1 of res) {
          if (usu1.carrera== this.datos.carrera) {
            this.localTime = moment(usu1.fecha_solicitud_mentoria).format('YYYY-MM-DD');
            usu1.fecha_solicitud_mentoria = this.localTime;
            MentoriaSolicitud.push(usu1)
            
          }
        }
        this.SolicitudMentorias=MentoriaSolicitud;
       
      },

     
      (err) => console.error(err)
    );
  }
}
