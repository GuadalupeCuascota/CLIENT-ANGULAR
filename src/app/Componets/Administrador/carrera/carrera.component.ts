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
  archivosSeleccionado: File;
  FileType = '';
  leerArchivo: string | ArrayBuffer;
  closeResult = '';
  edit: boolean = false;
  carrera: Carrera = {
    id_carrera: 0,
    nombre_carrera: '',
    descripcion: '',
    ruta_archivo: '',
    siglas: '',
  };
  textoBuscar = '';
  carrera1: any = {};
  API_URI: string;
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
      descripcion: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
      siglas: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z a-zA-ZñÑáéíóúÁÉÍÓÚ]+'),
      ]),
    });
    this.getCarreras();
  }
  onFileSelect(event) {
    if (event.target.files.length > 0) {
      this.archivosSeleccionado = <File>event.target.files[0];
      const reader = new FileReader(); //Crear un objeto de tipo FileReader  para leer la imagen
      reader.readAsDataURL(this.archivosSeleccionado); //leemos la imagen pasado por parametro
      this.FileType = this.archivosSeleccionado.type;
      reader.onload = (e) => (this.leerArchivo = reader.result); //Comprobamos la carga del archivo y enviamos el resultado
    } else {
      this.alerts.showError('Error Operation', 'Seleccione imagen');
    }
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
    this.edit = false;
    this.modalService.dismissAll(content);
    // this.getCarreras();
  }
  clear() {

    this.carrera.nombre_carrera = null;
    this.carrera.siglas=null;
    this.carrera.descripcion=null;

    this.carreraform.controls['nombre_carrera'].setValue(
      this.carrera.nombre_carrera
    );
    this.carreraform.controls['siglas'].setValue(
      this.carrera.siglas
    );
    this.carreraform.controls['descripcion'].setValue(
      this.carrera.descripcion
    );

    this.archivosSeleccionado = null;
    this.leerArchivo = null;
    this.API_URI = null;
  }
  estado() {
    this.edit = false;
  }
  getCarreras() {
    var Carrera = [];
    this.registroCarreraService.getCarreras().subscribe(
      (res: any) => {
        for (let n of res) {
          if (n.id_carrera != 1) {
            Carrera.push(n);
          }
        }
        this.carreras = Carrera;
      },
      (err) => this.alerts.showError('Error Operation', 'No se puede guardar')
    );
  }
  saveCarrera() {
    try {
      const fd = new FormData();
      fd.append('ruta_archivo', this.archivosSeleccionado);
      fd.append(
        'nombre_carrera',
        this.carreraform.controls['nombre_carrera'].value
      );
      fd.append('siglas', this.carreraform.controls['siglas'].value);
      fd.append('descripcion', this.carreraform.controls['descripcion'].value);
      this.registroCarreraService.saveCarrera(fd).subscribe(
        (res) => {
          this.getCarreras();
          this.alerts.showSuccess('Successfull Operation', 'Carrera guardado');
          this.carreraform.reset();
          this.ngOnInit();
        },
        (err) => {
          this.alerts.showError('Error Operation', 'No se puede guardar');
        }
      );
    } catch (error) {
      this.alerts.showError('Error Operation', error);
    }
  }
  getCarrera(id_carrera: String) {
    this.edit = true;
    if (id_carrera) {
      this.registroCarreraService.getCarrera(id_carrera).subscribe(
        (res: any) => {
          this.carrera = res;
          this.carreraform.controls['nombre_carrera'].setValue(
            this.carrera.nombre_carrera
          );
          this.carreraform.controls['descripcion'].setValue(
            this.carrera.descripcion
          );
          this.carreraform.controls['siglas'].setValue(this.carrera.siglas);
          this.API_URI = this.carrera.ruta_archivo;

          this.edit = true;
        },

        (err) => (err) => this.alerts.showError('Error Operation', err)
      );
    }
  }

  deleteCarrera(id_carrera: string) {
    if (confirm('Esta seguro que desea eliminar esto?')) {
      this.registroCarreraService.deleteCarrera(id_carrera).subscribe(
        (res) => {
          this.getCarreras();
          this.alerts.showSuccess('Successfull Operation', 'Carrera eliminado');

        },
        (err) =>
          this.alerts.showError('Error Operation', 'No se puede eliminar')
      );
    }
  }
  updateCarrera() {
    if (this.archivosSeleccionado) {
      this.edit = true;
      try {
        const fda = new FormData();
        fda.append('ruta_archivo', this.archivosSeleccionado);
        fda.append(
          'nombre_carrera',
          this.carreraform.controls['nombre_carrera'].value
        );
        fda.append(
          'descripcion',
          this.carreraform.controls['descripcion'].value
        );
        fda.append('siglas', this.carreraform.controls['siglas'].value);

        this.registroCarreraService
          .updateCarrera(this.carrera.id_carrera, fda)
          .subscribe(
            (res) => {
              this.alerts.showSuccess(
                'Successfull Operation',
                'Carrera actualizado'
              );
              this.getCarreras();
            },
            (err) => {
              this.alerts.showError('Error Operation', 'No se puede guardar');
            }
          );
      } catch (error) {}
    } else {
      try {
        const fda = new FormData();
        fda.append('ruta_archivo', this.carrera.ruta_archivo);
        fda.append(
          'nombre_carrera',
          this.carreraform.controls['nombre_carrera'].value
        );
        fda.append(
          'descripcion',
          this.carreraform.controls['descripcion'].value
        );
        fda.append('siglas', this.carreraform.controls['siglas'].value);
        this.registroCarreraService
          .updateCarrera(this.carrera.id_carrera, fda)
          .subscribe(
            (res) => {
              this.alerts.showSuccess(
                'Successfull Operation',
                'Carrera actualizado'
              );
              this.getCarreras();
            },
            (err) => {
              this.alerts.showError('Error Operation', 'No se puede guardar');
            }
          );
      } catch (error) {
        this.alerts.showError('Error Operation', error);
      }
    }
    this.clear();
  }
}
