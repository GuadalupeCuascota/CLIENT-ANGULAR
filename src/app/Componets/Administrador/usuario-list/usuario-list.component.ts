import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { RegistroUsuarioService } from '../../../Services/registro-usuario.service';
import { FormBuilder, FormControl, FormGroup, Validators,ReactiveFormsModule} from '@angular/forms';
import { RegistroRolService } from '../../../Services/registro-rol.service';
import { Rol } from '../../../Models/rol';
//importat modulo del modal para la edicion
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Usuario } from '../../../Models/usuario';
import{AlertsService} from '../../../Services/alerts/alerts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.css'],
})
export class UsuarioListComponent implements OnInit {
  closeResult = '';
  showPassword = false;
  show_eye: Boolean = false;
  roles: any = [];
  usuarios: any = [];
  usuario1: any = {};
  estado: boolean;
  usuario: Usuario = {
    nombre: '',
    apellido: '',
    nivel_academico: '',
    carrera: '',
    unidad_educativa: '',
    correo_electronico: '',
    contrasenia: '',
    id_rol: 0,
  };
  count=0;
  textoBuscar='';
   
//////////
exform:FormGroup
  


  constructor(
    private registroUsuarioService: RegistroUsuarioService,
    private registroRolService: RegistroRolService,
    private alerts: AlertsService,
    private modalService: NgbModal,
    private router: Router
  ) {}
  p: number = 0;
  ngOnInit(): void {
    this.getUsuarios();
    this.ObtenerRoles();
    /////////////
    this.exform=new FormGroup({
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      correo_electronico: new FormControl('', Validators.required),
      contrasenia: new FormControl('', Validators.required),
      id_rol:new FormControl('', Validators.required),
      carrera: new FormControl(),

    })


  }
  toggleShow(): void {
    this.showPassword = !this.showPassword;
    this.show_eye = !this.show_eye;

  }
  carreras= ['Ingeniería en Mecatrónica', 'Ingeniería en Telecomunicaciones','Ingeniería de Software','Ingeniería Industrial','Ingeniería Textil','Ingeniería Automotriz', 'Ingeniería en Electricidad'];
 
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
          this.getUsuarios();
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
    this.getUsuarios();
  }
  
  ////////////////////////////////////////////////////
  Crear(){
    console.log("PASAA")
    this.router.navigate(['/crear-usuario']);
   }
  getUsuarios() {
    console.log("hol")
    var usuAE = [];
    var c=0;
    this.registroUsuarioService.getUsuarios().subscribe(
      
      (res:any) => {
        console.log(res)
        for (let usu1 of res) {
          if (usu1.tipo_rol == "Admin" || usu1.tipo_rol == "Editor"  || usu1.tipo_rol == "Mentora") {
            usuAE.push(usu1);
            c=c+1;
        }
      }
      console.log("NUMERO DE PERSONAS",c)
        console.log(res);
         this.usuarios = usuAE  ;

      },
      /*  res=> console.log(res), */
      (err) => console.error(err)
    );
  
  }
  public optionsFn(event) { //here item is an object 
    console.log("pasa chage")
    console.log("el evento",event.target.value);
    if (event.target.value =="Mentora") {
      this.estado = true

    }
    else {
      this.estado = false
    }


  }
  getUsuario(id_usuario: String) {
    console.log("este es el id"+id_usuario);
    if (id_usuario) {
      this.registroUsuarioService.getUsuario(id_usuario).subscribe(
        (res) => {
          console.log(res);

          this.usuario1 = res;
          console.log('este es:' + this.usuario1.tipo_rol);

        },
        (err) => console.error(err)
      );
    }
  }
  ObtenerRoles() {
    var rol = [];
    this.registroRolService.getRoles().subscribe(
      (res: any) => {
        for (let rol1 of res) {
          if (rol1.id_rol == 1 || rol1.id_rol == 2 ||rol1.id_rol==3) {
            rol.push(rol1);
            console.log(rol);
          }
        }
        this.roles = rol;
      },
      (err) => console.error(err)
    );
  }

  saveUsuario() {
    console.log("GUARDAR")
    console.log(this.exform.value);
    this.usuario.nombre=this.exform.controls['nombre'].value;
    this.usuario.apellido = this.exform.controls['apellido'].value;
    this.usuario.correo_electronico = this.exform.controls['correo_electronico'].value;
    this.usuario.contrasenia = this.exform.controls['contrasenia'].value;
    this.usuario.id_rol = this.exform.controls['id_rol'].value;

    this.registroUsuarioService.saveUsuario(this.usuario).subscribe(
      (res) => {
        
       this.getUsuarios();
        console.log(res);
        this.alerts.showSuccess('Successfull Operation', 'Usuario guardado')
        this.exform.reset();
      },
      (err) => {
        console.error(err)
      this.alerts.showError('Error Operation', 'No se puede guardar')
      }
    );
    
  }
  deleteUsuario(id_usuario: string) {
    if(confirm('Esta seguro que desea eliminar esto?')){
    this.registroUsuarioService.deleteUsuario(id_usuario).subscribe(
      (res) => {
        console.log(res);
        this.getUsuarios();
        this.alerts.showSuccess('Successfull Operation', 'Usuario eliminado');
        //this.toastr.success('Successfull Operation', 'Rol eliminado');
      },
    
      (err) => console.log(err)
    );
    }
  }
  updateUsuario() {
    console.log(this.usuario1);
    this.registroUsuarioService
      .updateUsuario(this.usuario1.id_usuario, this.usuario1)
      .subscribe(
        (res) => {
          this.alerts.showSuccess('Successfull Operation', 'Usuario actualizado');
          this.getUsuarios();
          console.log(res);
        },
        (err) => console.log(err)
      );
  }
  
}
