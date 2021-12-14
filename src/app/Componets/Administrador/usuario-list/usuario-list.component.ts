import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { RegistroUsuarioService } from '../../../Services/registro-usuario.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { RegistroRolService } from '../../../Services/registro-rol.service';
import { Rol } from '../../../Models/rol';
//importat modulo del modal para la edicion
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Usuario } from '../../../Models/usuario';
import { AlertsService } from '../../../Services/alerts/alerts.service';
import { Router } from '@angular/router';
import { Carrera } from 'src/app/Models/carreras';
import { ResgitroCarrerasService } from 'src/app/Services/resgitro-carreras.service';

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
  usuarios: Usuario[] = [];
  usuario1: any = {};
  estado: boolean;
  usuario: Usuario = {
    id_usuario: 0,
    nombre: '',
    apellido: '',
    nivel_academico: '',
    nombre_carrera: '',
    id_carrera: 0,
    unidad_educativa: '',
    correo_electronico: '',
    contrasenia: '',
    id_rol: 0,
    tipo_rol: '',
  };
  count = 0;
  textoBuscar = '';
  carreras: Carrera[] = [];
  //////////
  exform: FormGroup;
  saveForm:FormGroup;
  edit: boolean = false;

  constructor(
    private registroUsuarioService: RegistroUsuarioService,
    private registroRolService: RegistroRolService,
    private alerts: AlertsService,
    private modalService: NgbModal,
    private router: Router,
    private registroCarreraService: ResgitroCarrerasService
  ) {}
  p: number = 0;
  private emailPattern: any =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  ngOnInit(): void {
    this.getCarreras();
    this.getUsuarios();
    this.ObtenerRoles();
    /////////////
    this.exform = new FormGroup({
      nombre: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z a-zA-ZñÑáéíóúÁÉÍÓÚ]+'),
      ]),
      apellido: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z a-zA-ZñÑáéíóúÁÉÍÓÚ]+'),
      ]),
      correo_electronico: new FormControl('', [
        Validators.required,
        Validators.pattern(this.emailPattern),
      ]),
      contrasenia: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      tipo_rol: new FormControl('', Validators.required),
      nombre_carrera: new FormControl('', Validators.required),
    });
    this.saveForm = new FormGroup({
      nombre: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z a-zA-ZñÑáéíóúÁÉÍÓÚ]+'),
      ]),
      apellido: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z a-zA-ZñÑáéíóúÁÉÍÓÚ]+'),
      ]),
      correo_electronico: new FormControl('', [
        Validators.required,
        Validators.pattern(this.emailPattern),
      ]),
      contrasenia: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      id_rol: new FormControl('', Validators.required),
      id_carrera: new FormControl('', Validators.required),
    });
  }
  toggleShow(): void {
    this.showPassword = !this.showPassword;
    this.show_eye = !this.show_eye;
  }

  ///////////////////////METODOS DEL MODAL///////////////////////////

  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
          this.estado = false;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          this.getUsuarios();
          this.estado = false;
        }
      );
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      this.edit = false;
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      this.edit = false;
      return 'by clicking on a backdrop';
    } else {
      this.edit = false;
      return `with: ${reason}`;
    }
  }
  close(content) {
    this.modalService.dismissAll(content);
    this.getUsuarios();
    this.estado = false;
  }

  ////////////////////////////////////////////////////
  Crear() {
    this.router.navigate(['/crear-usuario']);
  }
  public optionsFn1(event) { // guardar  
    console.log("pasa chage guardar")
    console.log("el evento",event.target.value);
    if (event.target.value =="Mentor") {
      this.estado = true

    } 
    else {
      this.estado = false
      this.saveForm.patchValue({id_carrera: "Sin asignar" });
    }


  }

  clear() {
    console.log('clear clicked');
    this.usuario1.nombre = null;
    this.usuario1.apellido = null;
    this.usuario1.correo_electronico = null;
    this.usuario1.contrasenia=null;
    this.usuario1.tipo_rol=null
    this.usuario1.nombre_carrera=null

    this.exform.controls['nombre'].setValue(this.usuario1.nombre);
    this.exform.controls['apellido'].setValue(this.usuario1.apellido);
    this.exform.controls['correo_electronico'].setValue(
      this.usuario1.correo_electronico
    );
    this.exform.controls['contrasenia'].setValue(
      this.usuario1.contrasenia
    );
    this.exform.controls['tipo_rol'].setValue(
      this.usuario1.tipo_rol
    );
  }
  saveUsuario() {
    console.log("GUARDAR")
    console.log(this.exform.value);
    this.usuario.nombre=this.saveForm.controls['nombre'].value;
    this.usuario.apellido = this.saveForm.controls['apellido'].value;
    this.usuario.correo_electronico = this.saveForm.controls['correo_electronico'].value;
    this.usuario.contrasenia = this.saveForm.controls['contrasenia'].value;
    this.usuario.id_rol = this.saveForm.controls['id_rol'].value;
    this.usuario.id_carrera=this.saveForm.controls['id_carrera'].value;
    this.registroUsuarioService.saveUsuario(this.usuario).subscribe(
      (res) => {
        
       this.getUsuarios();
        console.log(res);
        this.alerts.showSuccess('Successfull Operation', 'Usuario guardado')
       
        this.saveForm.reset();
      },
      (err) => {
        console.error(err)
      this.alerts.showError( err.error.text,'Error Operation',)
      }
    );
    this.clear();
  }
  getUsuarios() {
    var usuAE = [];
    var c = 0;
    this.registroUsuarioService.getUsuarios().subscribe(
      (res: any) => {
        for (let usu1 of res) {
          if (usu1.id_rol == 1 || usu1.id_rol == 2 || usu1.id_rol == 3) {
            usuAE.push(usu1);
            c = c + 1;
          }
        }

        this.usuarios = usuAE;
      },

      (err) => {
        this.alerts.showError('', 'Error Operation');
      }
    );
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

      (err) => console.error(err)
    );
  }

  public optionsFn(event) {
    //editar

    console.log('el evento ES', event.target.value);
    if (event.target.value == 'Mentor') {
      // this.estado = true;
    } else {
      this.exform.patchValue({ nombre_carrera: 'Sin asignar' });
      this.estado = false;
    }
  }
  getUsuario(id_usuario: String, id_rol: number) {
    // this.edit = true;
    if (id_usuario) {
      this.registroUsuarioService.getUsuario(id_usuario).subscribe(
        (res:any) => {
          console.log("se obtiene",res);
          this.usuario= res;
          console.log("LA CARRERA",this.usuario.nombre_carrera)
          this.exform.controls['nombre'].setValue(this.usuario.nombre);
          this.exform.controls['apellido'].setValue(this.usuario.apellido);
          this.exform.controls['correo_electronico'].setValue(
            this.usuario.correo_electronico
          );
          this.exform.controls['contrasenia'].setValue(
            this.usuario.contrasenia
          );
          this.exform.controls['tipo_rol'].setValue(this.usuario.tipo_rol);
          this.exform.controls['nombre_carrera'].setValue(
            this.usuario.nombre_carrera
          );
          if (id_rol == 3) {
            this.estado = true;
          }
        },
        (err) =>
          this.alerts.showError('Error Operation', 'No se puede actualizar')
      );
    }
  }
  ObtenerRoles() {
    var rol = [];
    this.registroRolService.getRoles().subscribe(
      (res: any) => {
        for (let rol1 of res) {
          if (rol1.id_rol == 1 || rol1.id_rol == 2 || rol1.id_rol == 3) {
            rol.push(rol1);
          }
        }
        this.roles = rol;
      },
      (err) => console.error(err)
    );
  }

 
  deleteUsuario(id_usuario: string) {
    if (confirm('Esta seguro que desea eliminar esto?')) {
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
    this.usuario.nombre = this.exform.controls['nombre'].value;
    this.usuario.apellido = this.exform.controls['apellido'].value;
    this.usuario.correo_electronico =
      this.exform.controls['correo_electronico'].value;
    this.usuario.contrasenia = this.exform.controls['contrasenia'].value;
    this.usuario.tipo_rol = this.exform.controls['tipo_rol'].value;
    this.usuario.nombre_carrera = this.exform.controls['nombre_carrera'].value;

    this.registroUsuarioService
      .updateUsuario(this.usuario.id_usuario, this.usuario)
      .subscribe(
        (res) => {
          this.alerts.showSuccess(
            'Successfull Operation',
            'Usuario actualizado'
          );
          this.getUsuarios();
          console.log(res);
        },


        (err) =>{
          console.error(err);
          this.alerts.showError('Error Operation', 'No se puede actualizar');
        }
      );
  }
}
