import { Component, OnInit } from '@angular/core';
import { ResgitroCarrerasService } from '../../../Services/resgitro-carreras.service';
import { Publicacion } from '../../../Models/publicacion';
import { AlertsService } from '../../../Services/alerts/alerts.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { RegistroArchivoService } from 'src/app/Services/registro-archivo.service';

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

  oferta_academica: any | Publicacion = { //Crear objeto
    id_publicacion: 0,
    titulo: '',
    fecha_publicacion: new Date(),
    descripcion: '',
    enlace: '',
    ruta_archivo: '',
    id_tipo_publicacion: '',
    id_estado_publicacion: '1',
    id_usuario: '',
    id_carrera: '',
  };
  textoBuscar='';
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
    console.log(this.datos)
    this.getpublicaciones();
    this.ObtenerCarreras();
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
    this.modalService.dismissAll(content);
  }
  ///////////////////////////////////////////////////////////

  // clear() {
  //   console.log('clear clicked');
  //   this.perfil.descripcion = null;
  //   this.perfil.nombre_perfil = null;
  //   this.perfil.estado_profesion = null;
  //   this.perfil.profesion = null;
  //   this.leerArchivo = null;
  //   this.API_URI = null;
  // }
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
      fd.append('titulo', this.oferta_academica.titulo);
      fd.append('ruta_archivo', this.archivosSeleccionado);
      fd.append('descripcion', this.oferta_academica.descripcion);
      fd.append('id_usuario', this.datos.id_usuario);
      fd.append('id_tipo_publicacion', this.id);
      fd.append('id_estado_publicacion', this.oferta_academica.id_estado_publicacion);
      fd.append('id_carrera', this.oferta_academica.id_carrera);

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
  }

  getpublicaciones() {
    console.log("pasa")
    var per = [];

    this.registroArchivo.getArchivos().subscribe(
      (res: any) => {
        console.log(res)
        for (let per1 of res) {
          if (per1.id_tipo_publicacion == 3) {
            per.push(per1);
            console.log(per);
          }
        }

        this.ofertas_academica = per;
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
          this.oferta_academica = res;
          this.API_URI = this.oferta_academica.ruta_archivo;
          this.edit = true;
        },
        (err) => console.error(err)
      );
    }
  }
  updatepublicacion() {
    console.log('hola', this.oferta_academica.ruta_archivo);
    try {
      const fda = new FormData(); //objeto que almacena datos de un formulario
      // for( let i=0; i<this.archivosSeleccionado.length; i++){
      fda.append('ruta_archivo', this.archivosSeleccionado);
      fda.append('profesion', this.oferta_academica.profesion);
      fda.append('estado_profesion', this.oferta_academica.estado_profesion);
      fda.append('descripcion', this.oferta_academica.descripcion);

      // delete this.perfil.fecha_publicacion;

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

  deletePublicacion(id: String) {
    console.log(id);

    if (confirm('Esta seguro que desea eliminar esto?')) {
      this.registroArchivo.deleteArchivo(id).subscribe(
        (res) => {
          console.log(res);
          this.getpublicaciones();
          this.alerts.showSuccess('Successfull Operation', 'Rol eliminado');
        },
        (err) => console.log(err)
      );
    }
  }
  ObtenerCarreras() {
    var auxper = [];
  console.log("pasa2")
    this.registroCarreras.getCarreras().subscribe(
      (res: any) => {
        for (let aux of res) {
          if (aux.id_carrera != 1) {
            auxper.push(aux);
            console.log(auxper)

          }
        }

       
        this.carreras = auxper;
      },
      (err) => console.error(err)
    );
  }
}
