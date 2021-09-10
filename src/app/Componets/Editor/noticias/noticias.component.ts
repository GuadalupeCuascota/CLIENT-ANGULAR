import { Component, OnInit } from '@angular/core';
import { RegistroArchivoService } from "../../../Services/registro-archivo.service";
import {Publicacion} from '../../../Models/publicacion'
import{AlertsService} from '../../../Services/alerts/alerts.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {Router,ActivatedRoute} from '@angular/router'
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})
export class NoticiasComponent implements OnInit {
  id='';
  datos: any = {};
  noticias: any|Publicacion=[];
  
  
  noticia: any|Publicacion= {
    id_publicacion:0,
    tiulo:'',
    fecha_publicacion: new Date(),
    descripcion:'',
    enlace:'',
    profesion:'',
    estado_profesion: '',
    ruta_archivo:'',
    id_tipo_publicacion: '',
    id_estado_publicacion :'1',
    id_usuario : '',
    id_carrera : 'sin asignar',
  };
  API_URI:string;
  edit: boolean=false;
  closeResult = '';
  //file: Array<File>
  archivosSeleccionado :File
  leerArchivo:string| ArrayBuffer 
  constructor(private registroArchivo: RegistroArchivoService, private alerts : AlertsService,
  private modalService: NgbModal,private router:ActivatedRoute ) { }
  p: number = 1;
  ngOnInit(): void {
    
    this.id=this.router.snapshot.paramMap.get('id');
    console.log("el id de la ruta",this.id)

    this.datos=JSON.parse(localStorage.getItem('payload'));
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
      this.edit=false
      this.clear()
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      this.edit=false
      this.clear()
      return 'by clicking on a backdrop';
    } else {
      this.clear();
      this.edit=false
      return `with: ${reason}`;
      
    }
  }
  close(content) {
    this.edit=false
    this.modalService.dismissAll(content);
   
  }
  ///////////////////////////////////////////////////////

  clear() {
    console.log("clear clicked")
    this.noticia.titulo=null
    this.noticia.descripcion=null
    this.noticia.estado_profesion=null
    this.noticia.profesion=null
    this.leerArchivo=null
    this.archivosSeleccionado=null
    this.API_URI=null
    

  }
  onFileSelect  (event){
   console.log(event)
    if(event.target.files.length>0){

      this.archivosSeleccionado= <File> event.target.files[0];
      console.log("Archivo cargado", this.archivosSeleccionado)

      const reader= new FileReader(); //Crear un objeto de tipo FileReader  para leer la imagen
      reader.readAsDataURL(this.archivosSeleccionado); //leemos la imagen pasado por parametro
      
      reader.onload =e=>this.leerArchivo=reader.result //Comprobamos la carga del archivo y enviamos el resultado
      console.log("el archivo leer",this.leerArchivo)
    }else {
      console.log("seleccione imagen")
      this.alerts.showError('Error Operation', 'Seleccione imagen')
    }
   
   
  }
 
  saveArchivo(){
   console.log(this.noticia)
   
    try{
      const fd =new FormData(); //objeto que almacena datos de un formulario
      // for( let i=0; i<this.archivosSeleccionado.length; i++){
        fd.append('ruta_archivo',this.archivosSeleccionado)
        fd.append('titulo',this.noticia.titulo)
        fd.append('descripcion',this.noticia.descripcion)
        fd.append('enlace',this.noticia.enlace)
        fd.append('id_usuario',this.datos.id_usuario)
        fd.append('id_tipo_publicacion',this.id)
        fd.append('id_estado_publicacion',this.noticia.id_estado_publicacion)
        fd.append('id_carrera',this.noticia.id_carrera)
      this.registroArchivo.saveArchivo(fd).subscribe(
        (res)=>{
          console.log(res)
          this.getpublicaciones();
          this.alerts.showSuccess('Successfull Operation', 'Noticia guardado')
         
        },
    
         (err)=>
           console.log(err)
        
      );
     }catch{
       console.log("error")
     }
     this.clear();
    
  }

  getpublicaciones() {
    var not = [];
    this.registroArchivo.getArchivos().subscribe(
      
      (res:any) => {
        for (let n of res) {
          if (n.id_tipo_publicacion == 2 ) {
            not.push(n);
            console.log(not);
          }
        }
   

        this.noticias = not;
        
      },
      /*  res=> console.log(res), */
      (err) => console.error(err)
    );
  
  }
  getpublicacion(id: String) {
    
    console.log(id);
    if (id) {
      this.registroArchivo.getArchivo(id).subscribe(
        res => {
          console.log(res);
          this.noticia=res;
          this.API_URI=this.noticia.ruta_archivo;
          this.edit=true 
         
          
        },
        err => console.error(err)
      );
    }
    
  }
  updatepublicacion() {
    this.edit=true;
    try {
      const fda =new FormData(); //objeto que almacena datos de un formulario
      // for( let i=0; i<this.archivosSeleccionado.length; i++){
        fda.append('ruta_archivo',this.archivosSeleccionado)
        fda.append('titulo',this.noticia.titulo)
        fda.append('descripcion',this.noticia.descripcion)
        fda.append('enlace',this.noticia.enlace)
        
       
      // delete this.perfil.fecha_publicacion;

    
    this.registroArchivo.updateArchivo(this.noticia.id_publicacion, fda)
      .subscribe(
        (res) => {
          this.alerts.showSuccess('Successfull Operation', 'publicación actualizado');
          this.getpublicaciones();
          console.log(res);
        },
        (err) => console.log(err)
      );
      
    } catch (error) {
      
    }
    
  }

  deletePublicacion(id: String) {
console.log(id)

    if(confirm('Esta seguro que desea eliminar esto?')){
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

}
