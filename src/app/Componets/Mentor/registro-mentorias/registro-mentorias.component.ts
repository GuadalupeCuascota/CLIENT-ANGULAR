import { Component, Injectable, OnInit } from '@angular/core';
import { RegistroMentoriaService } from '../../../Services/registro-mentoria.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AlertsService } from '../../../Services/alerts/alerts.service';
import { Mentoria } from 'src/app/Models/mentoria';

import * as moment from 'moment/moment';
import { ElementSchemaRegistry } from '@angular/compiler';

@Component({
  selector: 'app-registro-mentorias',
  templateUrl: './registro-mentorias.component.html',
  styleUrls: ['./registro-mentorias.component.css'],
})
export class RegistroMentoriasComponent implements OnInit {
  datos: any = {};
  closeResult = '';
  localTime = moment().format('YYYY-MM-DD');
  // time1 = moment('20:00:00').format('HH:mm');
  // time = moment().format('H:mm ');
  mentorias: any = [];
  error = [];
  errorMsj: any = {};
  mentoria1: any = {};
  horas = [
    '7:00:00',
    '7:30:00',
    '8:00:00',
    '8:30:00',
    '9:00:00',
    '9:30:00',
    '10:00:00',
    '10:30:00',
    '11:00:00',
    '11:30:00',
    '12:00:00',
    '12:30:00',
    '13:00:00',
    '13:30:00',
    '14:00:00',
    '14:30:00',
    '15:00:00',
    '15:30:00',
    '16:00:00',
    '16:30:00',
    '17:00:00',
    '17:30:00',
    '18:00:00',
    '18:30:00',
    '19:00:00',
    '20:00:00',
    '20:30:00',
    '21:00:00',
    '21:30:00',
    '22:00:00',
    '22:30:00',
    '23:00:00',
    
  ];
  mentoria: Mentoria = {
    fecha: this.localTime,
    hora_inicio: '',
    hora_fin: '',
    tipo_mentoria: '',
    id_estado_mentoria: 2,
    id_usuario: 0,
  };
  textoBuscar = '';
  p: number = 0;
  constructor(
    private registroMentoriaService: RegistroMentoriaService,
    private alerts: AlertsService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.datos = JSON.parse(localStorage.getItem('payload'));
    this.getMentorias();
    this.mentoria.id_usuario = this.datos.id_usuario;
  }

  ///////////////////////METODOS DEL MODAL///////////////////////////

  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          // this.getMentorias();
        }
      );
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  close(content) {
    this.modalService.dismissAll(content);
    // this.getMentorias();
  }

  ////////////////////////////////////////////////////

  getMentorias() {
    console.log('obtner mentorias');
    var UsuMentoria = [];
    this.registroMentoriaService.getMentorias().subscribe(
      (res: any) => {
        console.log(res);
        for (let usu1 of res) {
          if (usu1.id_usuario == this.datos.id_usuario) {
            this.localTime = moment(usu1.fecha).format('YYYY-MM-DD');
            // this.time = moment(usu1.hora_inicio).format('HH:mm');
            // this.time1 = moment(usu1.hora_fin).format('HH:mm');

            usu1.fecha = this.localTime;
            // usu1.hora_inicio=this.time
            // usu1.hora_fin=this.time1
            UsuMentoria.push(usu1);
          }
        }
        this.mentorias = UsuMentoria;
        console.log(this.mentorias);
      },

      /*  res=> console.log(res), */
      (err) => console.error(err)
    );
  }
  getMentoria(id_mentoria: String) {
    console.log('este es el id' + id_mentoria);
    if (id_mentoria) {
      this.registroMentoriaService.getMentoria(id_mentoria).subscribe(
        (res) => {
          console.log(res);
          this.mentoria1 = res;
          this.localTime = moment(this.mentoria1.fecha).format('YYYY-MM-DD');
          // this.time = moment(this.mentoria1.hora_inicio).format('HH:mm:ss.SSS');
          // this.time1 = moment(this.mentoria1.hora_fin).format('HH:mm:ss.SSS');

          this.mentoria1.fecha = this.localTime;
          // this.mentoria1.hora_inicio=this.time
          // this.mentoria1.hora_fin=this.time1
        },
        (err) => console.error(err)
      );
    }
  }

  saveMentoria() {
    console.log('el usuario2', this.mentoria);
    if (this.mentoria.hora_fin > this.mentoria.hora_inicio) {
      this.registroMentoriaService.saveMentoria(this.mentoria).subscribe(
        (res) => {
          this.getMentorias();

          console.log(res);
        },
        (err) => {
          this.error = err;
          this.errorMsj = err.error;
         this.alerts.showError(this.errorMsj.text,'Error en la operación')

        
        }
      );
    } else {
      this.alerts.showError(
        'La hora fin debe ser mayor a la hora de inicio',
        'Error en la operación'
      );
    }
  }
  deleteMentoria(id_mentoria: string) {
    if (confirm('Esta seguro que desea eliminar esto?')) {
      this.registroMentoriaService.deleteMentoria(id_mentoria).subscribe(
        (res) => {
          console.log(res);
          this.getMentorias();
          this.alerts.showSuccess(
            'Successfull Operation',
            'Registro mentoria eliminado'
          );
          //this.toastr.success('Successfull Operation', 'Rol eliminado');
        },

        (err) => console.log(err)
      );
    }
  }
  updateMentoria() {
    console.log(this.mentoria1);
    this.registroMentoriaService
      .updateMentoria(this.mentoria1.id_registro_mentoria, this.mentoria1)
      .subscribe(
        (res) => {
          this.alerts.showSuccess(
            'Successfull Operation',
            'Registro mentoria actualizado'
          );
          this.getMentorias();
          console.log(res);
        },
        (err) => console.log(err)
      );
  }
}
