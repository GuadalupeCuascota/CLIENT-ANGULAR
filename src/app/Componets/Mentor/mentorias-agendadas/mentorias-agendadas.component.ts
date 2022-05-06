import { Component, OnInit } from '@angular/core';
import { RegistroMentoriaService } from '../../../Services/registro-mentoria.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AlertsService } from '../../../Services/alerts/alerts.service';
import { Mentoria } from 'src/app/Models/mentoria';

import * as moment from 'moment/moment';
import { ActivatedRoute, Router } from '@angular/router';

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
  params = this.actRoute.snapshot.params.id;
  datosM: any = {
    nombre_estado_agen_mentoria: 'Confirmada',
  };

  constructor(private registroMentoriaService: RegistroMentoriaService,private router: Router,private actRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.datos = JSON.parse(localStorage.getItem('payload'));
   this.getSolicitudMentorias();
  }

  getSolicitudMentorias() {

    var agenMentoria = [];
    this.registroMentoriaService.getAgendamientoMentorias(this.params).subscribe(
      (res: any) => {
        for (let usu1 of res) {
          if (usu1.id_usuario == this.datos.id_usuario) {
            this.localTime = moment(usu1.fecha).format('YYYY-MM-DD');
            usu1.fecha = this.localTime;
           agenMentoria.push(usu1);
          }
        }
        this.mentoriasAgen = agenMentoria;
      },
      (err) => console.error(err)
    );
  }
  updateEstadoMentoria(id_agendamiento_mentoria: number) {
    this.registroMentoriaService
      .updateAgenMentoria(id_agendamiento_mentoria, this.datosM)
      .subscribe(
        (res: any) => {
          // this.getSolicitudMentorias();
        },

        (err) => {

        }
      );
  }

}
