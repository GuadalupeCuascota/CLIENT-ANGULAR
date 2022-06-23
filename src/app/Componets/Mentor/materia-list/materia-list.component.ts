import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Materia } from 'src/app/Models/materias';
import { RegistroMateriasService } from 'src/app/Services/registro-materias.service';
import { RegistroTemaService } from 'src/app/Services/registro-tema.service';
import { RegistroMateriasCarreraService } from '../../../Services/registro-materias-carrera.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertsService } from 'src/app/Services/alerts/alerts.service';
import { TemaMateria } from 'src/app/Models/tema_materia';
interface ButtonStyle {
  fill: string;
  color: string;
}
@Component({
  selector: 'app-materia-list',
  templateUrl: './materia-list.component.html',
  styleUrls: ['./materia-list.component.css'],
})
export class MateriaListComponent implements OnInit {
  datos: any = {};
  materia: Materia = {
    id_materia: 0,
    nombre_materia: '',
    id_estado_materia: 1,
    id_usuario: 0,
  };
  tema: TemaMateria = {
    id_tema_materia: 0,
    nombre_tema: '',
    id_materia: 0,
  };
  datosM: any = {
    id_estado_materia: 0,
  };
  p: number = 0;
  estado: boolean;
  materias: Materia[] = [];
  textoBuscar = '';
  id_materia = 0;
  nombre_materia = '';
  exform: FormGroup;
  temform: FormGroup;
  temas: any = [];
  materiaedit: any = {};

  edit: boolean = false;
  closeResult = '';
  color = '';
  msjErr = '';
  constructor(
    private router: Router,
    private registroMateriaService: RegistroMateriasService,
    private modalService: NgbModal,
    private alerts: AlertsService,
    private registroTemaService: RegistroTemaService
  ) {}

  ngOnInit(): void {
    this.datos = JSON.parse(localStorage.getItem('payload'));
    this.getMaterias();

    this.exform = new FormGroup({
      nombre_materia: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z a-zA-ZñÑáéíóúÁÉÍÓÚ]+'),
      ]),
    });
    this.temform = new FormGroup({
      nombre_tema: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z a-zA-ZñÑáéíóúÁÉÍÓÚ]+'),
      ]),
    });
  }

  open(content) {
    this.clear();
    this.cleartema();
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          this.getMaterias();
        }
      );
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      this.clear();
      this.cleartema();
      this.edit = false;
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      this.clear();
      this.cleartema();
      this.edit = false;
      return 'by clicking on a backdrop';
    } else {
      this.clear();
      this.cleartema();
      this.edit = false;
      return `with: ${reason}`;
    }
  }
  close(content) {
    this.cleartema();
    this.modalService.dismissAll(content);
    this.getMaterias();
    this.estado = false;
    this.edit = false;
  }
  Crear() {
    this.router.navigate(['/crear-materia']);
  }
  getidMateria(id: number, nombre_materia: string) {
    this.id_materia = id;
    this.nombre_materia = nombre_materia;
  }
  clear() {
    this.ngOnInit();
    this.materia.nombre_materia = null;
    this.exform.controls['nombre_materia'].setValue(
      this.materia.nombre_materia
    );
  }
  saveTema() {
    this.tema.nombre_tema = this.temform.controls['nombre_tema'].value;
    this.tema.id_materia = this.id_materia;

    this.registroTemaService.saveTema(this.tema).subscribe(
      (res) => {
        this.alerts.showSuccess('Successfull Operation', 'Tema guardado');
      },
      (err) => {
        console.error(err);
        this.alerts.showError(err.error.text, 'Error Operation');
      }
    );
  }
  cleartema() {
    this.temas.length = 0;
    this.tema.nombre_tema = null;
    // this.tema.id_materia = null;
    this.temform.controls['nombre_tema'].setValue(this.tema.nombre_tema);
  }
  getTemaMateria(id_materia: number) {
    if (id_materia) {
      this.registroTemaService.getTema(id_materia).subscribe(
        (res: any) => {
          console.log("temas",res)
          this.temas = res;
          this.temform.controls['nombre_tema'].setValue(this.tema.nombre_tema);
        },
        (err) => {
          this.msjErr = err.error.text;
          // this.alerts.showError(err.error.text, 'Error Operation')
        }
      );
    }
  }

  saveMateria() {
    this.materia.nombre_materia = this.exform.controls['nombre_materia'].value;
    this, (this.materia.id_usuario = this.datos.id_usuario);

    this.registroMateriaService.saveMateria(this.materia).subscribe(
      (res) => {
        this.alerts.showSuccess('Successfull Operation', 'Materia guardado');
      },
      (err) => {
        this.alerts.showError(err.error.text, 'Error Operation');
      }
    );
  }
  getMaterias() {
    var subjet = [];
    var c = 0;
    this.registroMateriaService.getMaterias().subscribe(
      (res: any) => {
        for (let mat of res) {
          if (mat.id_usuario == this.datos.id_usuario) {
            subjet.push(mat);
          }
        }
        this.materias = subjet;
      },
      (err) => {
        this.alerts.showError('Error Operation', err);
      }
    );
  }
  editMateria() {
    this.materia.nombre_materia = this.exform.controls['nombre_materia'].value;

    this.registroMateriaService
      .updateMateria(this.materia.id_materia, this.materia)
      .subscribe(
        (res) => {
          this.getMaterias();
          this.alerts.showSuccess(
            'Successfull Operation',
            'materia actualizada'
          );
          this.exform.reset();
        },
        (err) => {
          console.error(err);
          this.alerts.showError('Error Operation', 'No se puede guardar');
        }
      );
  }

  getMateria(id_materia: String) {
    this.edit = true;
    if (id_materia) {
      this.registroMateriaService.getMateria(id_materia).subscribe(
        (res: any) => {
          this.materia = res;
          this.exform.controls['nombre_materia'].setValue(
            this.materia.nombre_materia
          );
        },
        (err) => {
          this.alerts.showError(err.error.text, 'Error Operation');
        }
      );
    }
  }
  deleteTemaMateria(id: number) {
    if (confirm('Esta seguro que desea eliminar esto?')) {
      this.registroTemaService.deleteTema(id).subscribe(
        (res) => {
          this.alerts.showSuccess('Successfull Operation', 'Dato eliminado');
        },
        (err) => {
          this.alerts.showError(err.error.text, 'Error Operation');
        }
      );
    }
  }
  deleteCarrera(id: String) {
    if (confirm('Esta seguro que desea eliminar esto?')) {
      this.registroMateriaService.deleteMateria(id).subscribe(
        (res) => {
          this.getMaterias();
          this.alerts.showSuccess('Successfull Operation', 'Rol eliminado');
        },
        (err) => {
          this.alerts.showError(err.error.text, 'Error Operation');
        }
      );
    }
  }

  // applyButtonSelectedStyle(buttonSelect: number) {
  //   switch (buttonSelect) {
  //     case 1:
  //       this.button1 = {
  //         fill: 'solid',
  //         color: 'primary',
  //       };

  //       break;
  //     case 2:
  //       this.button2 = {
  //         fill: 'solid',
  //         color: 'primary',
  //       };

  //       break;
  //   }
  // }
  updateEstadoMateria(id: number, idestado: number) {
    if (confirm('Esta seguro que desea activar/desactivar la materia?')) {
      if (idestado == 1) {
        this.datosM.id_estado_materia = 2;
        // this.color='btn btn-danger'
      } else {
        if (idestado == 2) {
          this.datosM.id_estado_materia = 1;
        }

        // this.color='btn btn-primary'
      }

      this.registroMateriaService
        .updateEstadoMateria(id, this.datosM)
        .subscribe(
          (res) => {
            this.getMaterias();
          },
          (err) => {
            this.alerts.showError('Error Operation', err);
          }
        );
    }
  }
}
