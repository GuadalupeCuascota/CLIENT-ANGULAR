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
    console.log('el id de la ruta', this.id);
    this.datos = JSON.parse(localStorage.getItem('payload'));
    console.log(this.datos);
    this.getpublicaciones();
    this.ObtenerCarreras();

    this.ofertaAform = new FormGroup({
      nombre_carrera: new FormControl('', [Validators.required]),
      titulo: new FormControl('', [Validators.required]),
      descripcion: new FormControl('',
      ),

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

  // clear() {|
  //   console.log('clear clicked');
  //   this.perfil.descripcion = null;
  //   this.perfil.nombre_perfil = null;
  //   this.perfil.estado_profesion = null;
  //   this.perfil.profesion = null;
  //   this.leerArchivo = null;
  //   this.API_URI = null;
  // }

  clear() {
    console.log('clear clicked');
    this.oferta_academica.titulo = null;
    this.oferta_academica.descripcion = null;
    this.ofertas_academica.nombre_carrera = null;
    this.oferta_academica.profesion = null;
    this.leerArchivo = null;
    this.archivosSeleccionado = null;
    this.API_URI = null;

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
    console.log('el evento', event);
    if (event.target.files.length > 0) {
      this.archivosSeleccionado = <File>event.target.files[0];
      console.log('Archivo cargado', this.archivosSeleccionado);

      const reader = new FileReader(); //Crear un objeto de tipo FileReader  para leer la imagen
      reader.readAsDataURL(this.archivosSeleccionado); //leemos la imagen pasado por parametro
      reader.onload = (e) => (this.leerArchivo = reader.result); //Comprobamos la carga del archivo y enviamos el resultado
    } else {
      console.log('seleccione imagen');
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
          console.log(res);
          this.getpublicaciones();
          this.alerts.showSuccess('Successfull Operation', 'Archivo guardado');
          this.ngOnInit();
        },

        (err) => console.log(err)
      );
    } catch {
      console.log('No se ha seleccionado el archivo');
    }
    this.clear();
  }

  getpublicaciones() {
    console.log('pasa');
    var per = [];

    this.registroArchivo.getArchivos().subscribe(
      (res: any) => {
        console.log(res);
        for (let per1 of res) {
          if (per1.id_tipo_publicacion == 3) {
            per.push(per1);
          }
        }
        this.ofertas_academica = per;
        console.log('oferta', this.ofertas_academica);
      },
      /*  res=> console.log(res), */

      (err) => this.alerts.showError('Error Operation', 'No se puede guardar')
    );
  }
  getpublicacion(id: String) {
    console.log(id);
    if (id) {
      this.registroArchivo.getArchivo(id).subscribe(
        (res) => {
          console.log(res);
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
        },
        (err) => console.error(err)
      );
    }
  }
  updatepublicacion() {
    console.log('pasa actu');
    if (this.archivosSeleccionado) {
      this.edit = true;
      console.log('este es  la RUTA', this.oferta_academica.ruta_archivo);

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
              console.log(res);
            },
            (err) => console.log(err)
          );
      } catch (error) {}
    } else {
      console.log('no hay');
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
              console.log(res);
            },
            (err) => console.log(err)
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
          if (aux.id_carrera != 1 && aux.id_carrera!=12) {
            auxper.push(aux);
          }
        }

        this.carreras = auxper;
        console.log('carreras', this.carreras);
      },
      (err) => console.error(err)
    );
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
