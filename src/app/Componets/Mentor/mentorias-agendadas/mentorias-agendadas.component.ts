import { Component, OnInit } from '@angular/core';
import { RegistroMentoriaService } from '../../../Services/registro-mentoria.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AlertsService } from '../../../Services/alerts/alerts.service';
import { Mentoria } from 'src/app/Models/mentoria';

import * as moment from 'moment/moment';

@Component({
  selector: 'app-mentorias-agendadas',
  templateUrl: './mentorias-agendadas.component.html',
  styleUrls: ['./mentorias-agendadas.component.css'],
})
export class MentoriasAgendadasComponent implements OnInit {
  datos: any = {};
  mentoriasAgen: any = [];
  localTime = moment().format('YYYY-MM-DD');
  // time1 = moment().format('HH:mm');
  // time = moment().format('HH:mm ');
  p: number = 0;

  datosM: any = {
    nombre_estado_agen_mentoria: 'Confirmada',
  };

  constructor(private registroMentoriaService: RegistroMentoriaService) {}

  ngOnInit(): void {
    this.datos = JSON.parse(localStorage.getItem('payload'));
    this.getSolicitudMentorias();
  }
  getSolicitudMentorias() {
    var agenMentoria = [];
    this.registroMentoriaService.getAgendamientoMentorias().subscribe(
      (res: any) => {
        console.log('el arreglo', res);
        for (let usu1 of res) {
          if (usu1.id_usuario == this.datos.id_usuario) {
            this.localTime = moment(usu1.fecha).format('YYYY-MM-DD');
            // this.time = moment(usu1.hora_inicio).format('HH:mm');
            // this.time1 = moment(usu1.hora_fin).format('HH:mm');

            usu1.fecha = this.localTime;
            // usu1.hora_inicio=this.time
            // usu1.hora_fin=this.time1
            agenMentoria.push(usu1);
          }
        }
        this.mentoriasAgen = agenMentoria;
        console.log(this.mentoriasAgen);
      },

      /*  res=> console.log(res), */
      (err) => console.error(err)
    );
  }
  updateEstadoMentoria(id_agendamiento_mentoria: number) {
    console.log('el id', id_agendamiento_mentoria);

    this.registroMentoriaService
      .updateAgenMentoria(id_agendamiento_mentoria, this.datosM)
      .subscribe(
        (res: any) => {
          console.log(res);
          this.getSolicitudMentorias();
        },

        /*  res=> console.log(res), */
        (err) => console.error(err)
      );
  }
}
