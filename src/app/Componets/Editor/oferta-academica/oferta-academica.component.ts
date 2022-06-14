import { Component, OnInit } from '@angular/core';
import { ResgitroCarrerasService } from '../../../Services/resgitro-carreras.service';
import { Publicacion } from '../../../Models/publicacion';
import { AlertsService } from '../../../Services/alerts/alerts.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { RegistroArchivoService } from 'src/app/Services/registro-archivo.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-oferta-academica',
  templateUrl: './oferta-academica.component.html',
  styleUrls: ['./oferta-academica.component.css'],
})
export class OfertaAcademicaComponent implements OnInit {
  id = '';
  datos: any = {};
  carreras: any = []; //crear arreglo de carreras
  ofertas_academica: any | Publicacion = [];
  FileType = '';
  oferta_academica: any | Publicacion = {
    //Crear objeto
    id_publicacion: 0,
    titulo: '',
    fecha_publicacion: new Date(),
    descripcion: '',
    enlace: '',
    ruta_archivo: '',
    id_tipo_publicacion: '',
    id_estado_publicacion: '1',
    id_usuario: '',
    nombre_carrera: '',
  };
  ofertaAform: FormGroup;
  tipo: boolean = false;
  textoBuscar = '';
  API_URI: string;
  edit: boolean = false;
  closeResult = '';
  archivosSeleccionado: File;
  leerArchivo: string | ArrayBuffer;
  p: number = 1;

  constructor(
    private registroArchivo: RegistroArchivoService,
    private alerts: AlertsService,
    private modalService: NgbModal,
    private router: ActivatedRoute,
    private registroCarreras: ResgitroCarrerasService
  ) {}

  ngOnInit(): void {
    this.id = this.router.snapshot.paramMap.get('id');
    this.datos = JSON.parse(localStorage.getItem('payload'));
    this.getpublicaciones();
    this.ObtenerCarreras();

    this.ofertaAform = new FormGroup({
      nombre_carrera: new FormControl('', [Validators.required]),
      titulo: new FormControl('', [Validators.required]),
      descripcion: new FormControl(''),

      enlace: new FormControl(''),
    });
  }
  estado() {
    this.edit = false;
  }
  estadoedit() {
    this.edit = true;
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
        }
      );
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      //  this.edit = false;
      this.tipo = false;

      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      this.tipo = false;

      return 'by clicking on a backdrop';
    } else {
      this.tipo = false;

      return `with: ${reason}`;
    }
  }
  close(content) {
    this.edit = false;
    this.tipo = false;
    this.modalService.dismissAll(content);
  }
  ///////////////////////////////////////////////////////////

  clear() {
    this.oferta_academica.titulo = null;
    this.oferta_academica.descripcion = null;
    this.ofertas_academica.nombre_carrera = null;
    this.oferta_academica.profesion = null;
    this.leerArchivo = null;
    this.archivosSeleccionado = null;
    this.API_URI = null;
    this.FileType = null;
    this.ofertaAform.controls['titulo'].setValue(this.oferta_academica.titulo);
    this.ofertaAform.controls['descripcion'].setValue(
      this.oferta_academica.descripcion
    );
    this.ofertaAform.controls['enlace'].setValue(this.oferta_academica.enlace);
    this.ofertaAform.controls['nombre_carrera'].setValue(
      this.oferta_academica.id_carrera
    );
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

  saveArchivo() {
    try {
      const fd = new FormData(); //objeto que almacena datos de un formulario
      // for( let i=0; i<this.archivosSeleccionado.length; i++){
      fd.append('titulo', this.ofertaAform.controls['titulo'].value);
      fd.append('ruta_archivo', this.archivosSeleccionado);
      fd.append('descripcion', this.ofertaAform.controls['descripcion'].value);
      fd.append('id_usuario', this.datos.id_usuario);
      fd.append('id_tipo_publicacion', this.id);
      fd.append(
        'id_estado_publicacion',
        this.oferta_academica.id_estado_publicacion
      );
      fd.append(
        'nombre_carrera',
        this.ofertaAform.controls['nombre_carrera'].value
      );

      this.registroArchivo.saveArchivo(fd).subscribe(
        (res) => {
          this.getpublicaciones();
          this.alerts.showSuccess('Successfull Operation', 'Archivo guardado');
          this.ngOnInit();
        },

        (err) => {
          this.alerts.showError('Error Operation', 'No se puede guardar');
        }
      );
    } catch {
      this.alerts.showError(
        'Error Operation',
        'No se ha seleccionado el archivo'
      );
    }
    this.clear();
  }

  getpublicaciones() {
    var per = [];
    this.registroArchivo.getArchivos().subscribe(
      (res: any) => {
        for (let per1 of res) {
          if (per1.id_tipo_publicacion == 3) {
            per.push(per1);
          }
        }
        this.ofertas_academica = per;
      },

      (err) => this.alerts.showError('Error Operation', 'No se puede guardar')
    );
  }
  getpublicacion(id: String) {
    if (id) {
      this.registroArchivo.getArchivo(id).subscribe(
        (res) => {
          this.oferta_academica = res;
          this.ofertaAform.controls['nombre_carrera'].setValue(
            this.oferta_academica.nombre_carrera
          );
          this.ofertaAform.controls['titulo'].setValue(
            this.oferta_academica.titulo
          );
          this.ofertaAform.controls['descripcion'].setValue(
            this.oferta_academica.descripcion
          );
          this.API_URI = this.oferta_academica.ruta_archivo;
          this.edit = true;
          this.FileType = this.oferta_academica.tipo_archivo;
        },
        (err) => {
          this.alerts.showError('Error Operation', err);
        }
      );
    }
  }
  updatepublicacion() {
    if (this.archivosSeleccionado) {
      this.edit = true;
      try {
        const fda = new FormData(); //objeto que almacena datos de un formulario
        // for( let i=0; i<this.archivosSeleccionado.length; i++){
        fda.append(
          'nombre_carrera',
          this.ofertaAform.controls['nombre_carrera'].value
        );
        fda.append('ruta_archivo', this.archivosSeleccionado);

        fda.append(
          'descripcion',
          this.ofertaAform.controls['descripcion'].value
        );

        fda.append('enlace', this.ofertaAform.controls['enlace'].value);
        this.registroArchivo
          .updateArchivo(this.oferta_academica.id_publicacion, fda)
          .subscribe(
            (res) => {
              this.alerts.showSuccess(
                'Successfull Operation',
                'publicación actualizado'
              );
              this.getpublicaciones();
            },
            (err) => {
              this.alerts.showError('Error Operation', err);
            }
          );
      } catch (error) {}
    } else {
      try {
        const fda = new FormData(); //objeto que almacena datos de un formulario
        // for( let i=0; i<this.archivosSeleccionado.length; i++){

        fda.append('ruta_archivo', this.oferta_academica.ruta_archivo);
        fda.append('titulo', this.ofertaAform.controls['titulo'].value);

        fda.append(
          'descripcion',
          this.ofertaAform.controls['descripcion'].value
        );
        fda.append(
          'nombre_carrera',
          this.ofertaAform.controls['nombre_carrera'].value
        );
        fda.append('enlace', this.ofertaAform.controls['enlace'].value);

        this.registroArchivo
          .updateArchivo(this.oferta_academica.id_publicacion, fda)
          .subscribe(
            (res) => {
              this.alerts.showSuccess(
                'Successfull Operation',
                'publicación actualizado'
              );
              this.getpublicaciones();
            },
            (err) => {
              this.alerts.showError('Error Operation', err);
            }
          );
      } catch (error) {}
    }
    this.clear();
  }
  ObtenerCarreras() {
    var auxper = [];

    this.registroCarreras.getCarreras().subscribe(
      (res: any) => {
        for (let aux of res) {
          if (aux.id_carrera != 1 && aux.id_carrera != 12) {
            auxper.push(aux);
          }
        }

        this.carreras = auxper;
      },
      (err) => console.error(err)
    );
  }
  deletePublicacion(id: String) {
    if (confirm('Esta seguro que desea eliminar esto?')) {
      this.registroArchivo.deleteArchivo(id).subscribe(
        (res) => {
          this.getpublicaciones();
          this.alerts.showSuccess(
            'Successfull Operation',
            'Publicación eliminado'
          );
        },
        (err) => {
          this.alerts.showError('Error Operation', 'No se puede eliminar');
        }
      );
    }
  }
}
