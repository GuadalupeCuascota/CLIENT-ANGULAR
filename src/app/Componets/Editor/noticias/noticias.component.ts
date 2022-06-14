import { Component, OnInit } from '@angular/core';
import { RegistroArchivoService } from '../../../Services/registro-archivo.service';
import { Publicacion } from '../../../Models/publicacion';
import { AlertsService } from '../../../Services/alerts/alerts.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {map} from 'rxjs/operators';
@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css'],
})
export class NoticiasComponent implements OnInit {
  id = '';
  datos: any = {};
  noticias: any | Publicacion = [];
  FileType = '';
  textoBuscar = '';
  noticia: any | Publicacion = {
    id_publicacion: 0,
    tiulo: '',
    fecha_publicacion: new Date(),
    descripcion: '',
    enlace: '',
    profesion: '',
    estado_profesion: '',
    ruta_archivo: '',
    id_tipo_publicacion: '',
    id_estado_publicacion: '1',
    id_usuario: '',
    nombre_carrera: 'Sin asignar',

  };
  barWidth:'0%';
  API_URI: string;
  edit: boolean = false;
  closeResult = '';
  archivosSeleccionado: File;
  leerArchivo: string | ArrayBuffer;
  constructor(
    private registroArchivo: RegistroArchivoService,
    private alerts: AlertsService,
    private modalService: NgbModal,
    private router: ActivatedRoute
  ) {}
  p: number = 1;
  noticiaform: FormGroup;
  ngOnInit(): void {
    this.id = this.router.snapshot.paramMap.get('id');
    this.datos = JSON.parse(localStorage.getItem('payload'));
    this.getpublicaciones();
    this.noticiaform = new FormGroup({
      titulo: new FormControl('', [
        Validators.required,
        Validators.maxLength(250),
      ]),
      descripcion: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
      enlace: new FormControl(''),
    });
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
  }
  ///////////////////////////////////////////////////////
  estado() {
    this.edit = false;
  }
  clear() {
    this.noticia.titulo = null;
    this.noticia.descripcion = null;
    this.noticia.estado_profesion = null;
    this.noticia.profesion = null;
    this.leerArchivo = null;
    this.archivosSeleccionado = null;
    this.API_URI = null;
    this.FileType=null;
    this.noticiaform.controls['titulo'].setValue(this.noticia.titulo);
    this.noticiaform.controls['descripcion'].setValue(this.noticia.descripcion);
    this.noticiaform.controls['enlace'].setValue(this.noticia.enlace);
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
      fd.append('ruta_archivo', this.archivosSeleccionado);
      fd.append('titulo', this.noticiaform.controls['titulo'].value);
      fd.append('descripcion', this.noticiaform.controls['descripcion'].value);
      fd.append('enlace', this.noticiaform.controls['enlace'].value);
      fd.append('id_usuario', this.datos.id_usuario);
      fd.append('id_tipo_publicacion', this.id);
      fd.append('id_estado_publicacion', this.noticia.id_estado_publicacion);
      fd.append('nombre_carrera', this.noticia.nombre_carrera);
      this.registroArchivo.saveArchivo(fd).subscribe(


        (res) => {
          this.getpublicaciones();

          this.alerts.showSuccess('Successfull Operation', 'Noticia guardado');
          this.ngOnInit();
        },

        (err) => this.alerts.showError('Error Operation', 'No se puede guardar')
      );
    } catch {}
    this.clear();
  }

  getpublicaciones() {
    var not = [];
    this.registroArchivo.getArchivos().subscribe(
      (res: any) => {
        for (let n of res) {
          if (n.id_tipo_publicacion == 2) {
            not.push(n);
          }
        }
        this.noticias = not;
      },
      (err) => console.error(err)
    );
  }
  getpublicacion(id: String) {
    if (id) {
      this.registroArchivo.getArchivo(id).subscribe(
        (res) => {
          this.noticia = res;
          this.noticiaform.controls['titulo'].setValue(this.noticia.titulo);
          this.noticiaform.controls['descripcion'].setValue(
            this.noticia.descripcion
          );
          this.noticiaform.controls['enlace'].setValue(this.noticia.enlace);
          this.API_URI = this.noticia.ruta_archivo;
          this.FileType=this.noticia.tipo_archivo;
          this.edit = true;
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
        fda.append('ruta_archivo', this.archivosSeleccionado);
        fda.append('titulo', this.noticiaform.controls['titulo'].value);
        fda.append(
          'descripcion',
          this.noticiaform.controls['descripcion'].value
        );
        fda.append('enlace', this.noticiaform.controls['enlace'].value);
        fda.append('nombre_carrera', this.noticia.nombre_carrera);

        this.registroArchivo
          .updateArchivo(this.noticia.id_publicacion, fda)
          .subscribe(
            (res) => {
              this.alerts.showSuccess(
                'Successfull Operation',
                'publicación actualizado'
              );
              this.getpublicaciones();
            },
            (err) =>
              this.alerts.showError('Error Operation', 'No se puede actualizar')
          );
      } catch (error) {}
    } else {
      try {
        const fda = new FormData(); //objeto que almacena datos de un formulario
        // for( let i=0; i<this.archivosSeleccionado.length; i++){

        fda.append('ruta_archivo', this.noticia.ruta_archivo);
        fda.append('titulo', this.noticiaform.controls['titulo'].value);
        fda.append(
          'descripcion',
          this.noticiaform.controls['descripcion'].value
        );
        fda.append('enlace', this.noticiaform.controls['enlace'].value);
        fda.append('nombre_carrera', this.noticia.nombre_carrera);
        this.registroArchivo
          .updateArchivo(this.noticia.id_publicacion, fda)
          .subscribe((res) => {
            this.alerts.showSuccess(
              'Successfull Operation',
              'publicación actualizado'
            );
            this.getpublicaciones();
          });
        (err) =>
          this.alerts.showError('Error Operation', 'No se puede actualizar');
      } catch (error) {}
    }
    this.clear();
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
