import { Component, OnInit } from '@angular/core';
import { RegistroUsuarioService } from '../../../Services/registro-usuario.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ResgitroCarrerasService } from '../../../Services/resgitro-carreras.service';

//importat modulo del modal para la edicion
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Carrera } from '../../../Models/carreras';
import { AlertsService } from '../../../Services/alerts/alerts.service';

@Component({
  selector: 'app-carrera',
  templateUrl: './carrera.component.html',
  styleUrls: ['./carrera.component.css'],
})
export class CarreraComponent implements OnInit {
  carreras: Carrera[] = [];
  closeResult = '';
  edit: boolean = false;
  carrera: Carrera = {
    id_carrera: 0,
    nombre_carrera: '',
  };
  textoBuscar=''
  carrera1: any = {};

  p: number = 0;
  carreraform: FormGroup;
  constructor(
    private registroCarreraService: ResgitroCarrerasService,
    private alerts: AlertsService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.carreraform = new FormGroup({
      nombre_carrera: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z a-zA-ZñÑáéíóúÁÉÍÓÚ]+'),
      ]),
    });
    this.getCarreras();
  }

  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          this.getCarreras();
        }
      );
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      this.clear();
      this.edit = false;
      return 'by pressing ESC';
   
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      this.clear();
      this.edit = false;
      return 'by clicking on a backdrop';
   

    } else {
      this.clear();
      this.edit = false;
      return `with: ${reason}`;
      
    }
  }
  close(content) {
    this.modalService.dismissAll(content);
    this.getCarreras();
  }
  clear() {
    console.log('clear clicked');
    this.carrera.nombre_carrera=null
    this.carreraform.controls['nombre_carrera'].setValue(
      this.carrera.nombre_carrera)
  }
  getCarreras() {
    var Carrera = [];
    console.log('hol');

    this.registroCarreraService.getCarreras().subscribe(
      (res: any) => {
        for (let n of res) {
          if (n.id_carrera != 1) {
            Carrera.push(n);
          }
        }
        console.log(res);
        this.carreras = Carrera;
      },
      /*  res=> console.log(res), */
      (err) => console.error(err)
    );
  }
  saveCarrera() {
    this.carrera.nombre_carrera=this.carreraform.controls['nombre_carrera'].value;
  

    this.registroCarreraService.saveCarrera(this.carrera).subscribe(
      (res) => {
        this.getCarreras();
        console.log(res);
        this.alerts.showSuccess('Successfull Operation', 'Carrera guardado');
        this.carreraform.reset();
      },
      (err) => {
        console.error(err);
        this.alerts.showError('Error Operation', 'No se puede guardar');
      }
    );
  }
  getCarrera(id_carrera: String) {
    this.edit = true;
    if (id_carrera) {
      this.registroCarreraService.getCarrera(id_carrera).subscribe(
        (res: any) => {
          this.carrera = res;
         this.carreraform.controls['nombre_carrera'].setValue(
          this.carrera.nombre_carrera)
        
          
        },

        (err) => (err) =>  this.alerts.showError('Error Operation', 'No se puede actualizar')
      );
    }
  }

  deleteCarrera(id_carrera: string) {
    if (confirm('Esta seguro que desea eliminar esto?')) {
      this.registroCarreraService.deleteCarrera(id_carrera).subscribe(
        (res) => {
          console.log('PASAA' + res);
          this.getCarreras();
          this.alerts.showSuccess('Successfull Operation', 'Carrera eliminado');
          //this.toastr.success('Successfull Operation', 'Rol eliminado');
        },

        (err) =>
          this.alerts.showError('Error Operation', 'No se puede eliminar')
      );
    }
  }
  updateCarrera() {
    this.carrera.nombre_carrera=this.carreraform.controls['nombre_carrera'].value;

    this.registroCarreraService
      .updateCarrera(this.carrera.id_carrera, this.carrera)
      .subscribe(
        (res) => {
          this.alerts.showSuccess(
            'Successfull Operation',
            'Carrera actualizado'
          );
          this.getCarreras();
          console.log(res);
        },
        (err) =>
        {
          console.log(err)
          this.alerts.showError('Error Operation', 'No se puede guardar');

        }
      );
  }
}
