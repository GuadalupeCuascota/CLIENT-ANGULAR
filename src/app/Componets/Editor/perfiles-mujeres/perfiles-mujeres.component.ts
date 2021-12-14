import { Component, OnInit } from '@angular/core';
import { RegistroArchivoService } from '../../../Services/registro-archivo.service';
import { Publicacion } from '../../../Models/publicacion';
import { AlertsService } from '../../../Services/alerts/alerts.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}
@Component({
  selector: 'app-perfiles-mujeres',
  templateUrl: './perfiles-mujeres.component.html',
  styleUrls: ['./perfiles-mujeres.component.css'],
})
export class PerfilesMujeresComponent implements OnInit {
  id = '';
  datos: any = {};
  perfiles: any | Publicacion = [];

  perfil: any | Publicacion = {
    id_publicacion: 0,
    titulo: '',
    nombre_perfil: '',
    fecha_publicacion: new Date(),
    descripcion: '',
    enlace: '',
    profesion: '',
    estado_profesion: '',
    ruta_archivo: '',
    id_tipo_publicacion: '',
    id_estado_publicacion: '1',
    id_usuario: '',
    id_carrera: 'sin asignar',
  };
  textoBuscar = '';
  estadoSeleccion: boolean = false;
  tipo: boolean = false;
  API_URI: string;
  edit: boolean = false;
  closeResult = '';
  archivosSeleccionado: File;
  leerArchivo: string | ArrayBuffer;

  perfilform: FormGroup;
  constructor(
    private registroArchivo: RegistroArchivoService,
    private alerts: AlertsService,
    private modalService: NgbModal,
    private router: ActivatedRoute
  ) {}
  p: number = 1;
  ngOnInit(): void {
    this.id = this.router.snapshot.paramMap.get('id'); //obtener el valor de la ruta
    this.datos = JSON.parse(localStorage.getItem('payload')); //obtener los datos  almacenados

    // this.perfilform = new FormGroup({
    //   nombre_perfil: new FormControl('', [
    //     Validators.required,
    //     Validators.pattern('[a-zA-Z a-zA-ZñÑáéíóúÁÉÍÓÚ]+'),
    //   ]),
    //   profesion: new FormControl('', [
    //     Validators.required,
    //     Validators.pattern('[a-zA-Z a-zA-ZñÑáéíóúÁÉÍÓÚ]+'),
    //   ]),
    //   descripcion: new FormControl('', [
    //     Validators.required,
    //     Validators.minLength(8),
    //   ]),

    //   enlace: new FormControl('', [Validators.required]),
    //   estado_profesion:new FormControl('',[Validators.required]),
    //   ruta_archivo: new FormControl('',[Validators.required]),
    // });
    this.getpublicaciones();
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
      // this.edit = false;
      this.tipo = false;
      // this.clear();
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      // this.edit = false;
      this.tipo = false;
      // this.clear();
      return 'by clicking on a backdrop';
    } else {
      // this.edit = false;
      this.tipo = false;
      // this.clear();
      return `with: ${reason}`;
    }
  }
  close(content) {
    this.edit = false;
    this.tipo = false;
    this.modalService.dismissAll(content);
  }
  ///////////////////////////////////////////////////////

  clear() {
    console.log('clear clicked');
    this.perfil.descripcion = null;
    this.perfil.nombre_perfil = null;
    this.perfil.estado_profesion = null;
    this.perfil.profesion = null;
    this.leerArchivo = null;
    this.API_URI = null;
    this.perfil.enlace = null;
    this.archivosSeleccionado = null;
  }
  onFileSelect(event: HtmlInputEvent) {
    console.log('el evento', event);
    this.estadoSeleccion = true;
    if (event.target.files.length > 0 && event.target.files) {
      this.archivosSeleccionado = <File>event.target.files[0];
      console.log('Archivo cargado', this.archivosSeleccionado);
      console.log('el', event.target.files[0].type);
      if (event.target.files[0].type == 'image/jpeg' || 'image/png') {
        this.tipo = true;
      } else {
        if (event.target.files[0].type == 'image/jpeg' || 'image/png') {
          this.tipo = true;
        }
      }

      const reader = new FileReader(); //Crear un objeto de tipo FileReader  para leer la imagen
      reader.readAsDataURL(this.archivosSeleccionado); //leemos la imagen pasado por parametro
      reader.onload = (e) => (this.leerArchivo = reader.result); //Comprobamos la carga del archivo y enviamos el resultado
    } else {
      console.log('seleccione imagen');
      this.alerts.showError('Error Operation', 'Seleccione imagen');
    }
  }
  estado() {
    this.edit = false;
  }

  saveArchivo() {
    console.log(this.perfil);

    try {
      const fd = new FormData(); //objeto que almacena datos de un formulario
      // for( let i=0; i<this.archivosSeleccionado.length; i++){
      fd.append('nombre_perfil', this.perfil.nombre_perfil);
      fd.append('ruta_archivo', this.archivosSeleccionado);
      fd.append('profesion', this.perfil.profesion);
      fd.append('estado_profesion', this.perfil.estado_profesion);
      fd.append('descripcion', this.perfil.descripcion);
      fd.append('id_usuario', this.datos.id_usuario);
      fd.append('id_tipo_publicacion', this.id);
      fd.append('id_estado_publicacion', this.perfil.id_estado_publicacion);
      fd.append('id_carrera', this.perfil.id_carrera);
      fd.append('enlace', this.perfil.enlace);
      console.log('el archivo es', fd);
      this.registroArchivo.saveArchivo(fd).subscribe(
        (res) => {
          console.log(res);
          this.getpublicaciones();
          this.alerts.showSuccess('Successfull Operation', 'Archivo guardado');
        },

        (err) => console.log(err)
      );
    } catch {
      console.log('No se ha seleccionado el archivo');
    }
    this.clear();
  }

  getpublicaciones() {
    var per = [];
    console.log('pasa obter');
    this.registroArchivo.getArchivos().subscribe(
      (res: any) => {
        for (let per1 of res) {
          if (per1.id_tipo_publicacion == 1) {
            console.log('es perfil');
            per.push(per1);
            console.log(per);
          }
        }

        this.perfiles = per;
      },
      /*  res=> console.log(res), */
      (err) => console.error(err)
    );
  }
  getpublicacion(id: String) {
    console.log(id);
    if (id) {
      this.registroArchivo.getArchivo(id).subscribe(
        (res) => {
          console.log(res);
          this.perfil = res;
          this.API_URI = this.perfil.ruta_archivo;
          console.log('enlace', this.API_URI);
          this.edit = true;
        },
        (err) => console.error(err)
      );
    }
  }
  updatepublicacion() {
    if (this.archivosSeleccionado) {
      this.edit = true;
      console.log('este es  la RUTA', this.perfil.ruta_archivo);

      try {
        const fda = new FormData(); //objeto que almacena datos de un formulario
        // for( let i=0; i<this.archivosSeleccionado.length; i++){

        fda.append('ruta_archivo', this.archivosSeleccionado);
        fda.append('profesion', this.perfil.profesion);
        fda.append('estado_profesion', this.perfil.estado_profesion);
        fda.append('descripcion', this.perfil.descripcion);
        fda.append('nombre_perfil', this.perfil.nombre_perfil);
        fda.append('enlace', this.perfil.enlace);
        this.registroArchivo
          .updateArchivo(this.perfil.id_publicacion, fda)
          .subscribe(
            (res) => {
              this.alerts.showSuccess(
                'Successfull Operation',
                'publicación actualizado'
              );
              this.getpublicaciones();
              console.log(res);
            },
            (err) => console.log(err)
          );
      } catch (error) {}
    } else {
      try {
        const fda = new FormData(); //objeto que almacena datos de un formulario
        // for( let i=0; i<this.archivosSeleccionado.length; i++){

        fda.append('ruta_archivo', this.perfil.ruta_archivo);
        fda.append('profesion', this.perfil.profesion);
        fda.append('estado_profesion', this.perfil.estado_profesion);
        fda.append('descripcion', this.perfil.descripcion);
        fda.append('nombre_perfil', this.perfil.nombre_perfil);
        fda.append('enlace', this.perfil.enlace);

        this.registroArchivo
          .updateArchivo(this.perfil.id_publicacion, fda)
          .subscribe(
            (res) => {
              this.alerts.showSuccess(
                'Successfull Operation',
                'publicación actualizado'
              );
              this.getpublicaciones();
              console.log(res);
            },
            (err) => console.log(err)
          );
      } catch (error) {}
    }
    this.clear();
  }

  deletePublicacion(id: String) {
    console.log(id);

    if (confirm('Esta seguro que desea eliminar esto?')) {
      this.registroArchivo.deleteArchivo(id).subscribe(
        (res) => {
          console.log(res);
          this.getpublicaciones();
          this.alerts.showSuccess(
            'Successfull Operation',
            'Publicación eliminado'
          );
        },
        (err) => console.log(err)
      );
    }
  }
}
