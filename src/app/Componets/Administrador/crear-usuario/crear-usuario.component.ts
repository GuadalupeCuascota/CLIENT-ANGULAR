import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AlertsService } from 'src/app/Services/alerts/alerts.service';
import { Usuario } from '../../../Models/usuario';
import { RegistroUsuarioService } from '../../../Services/registro-usuario.service';
import { RegistroRolService } from '../../../Services/registro-rol.service';
import { ResgitroCarrerasService } from 'src/app/Services/resgitro-carreras.service';
import { Carrera } from '../../../Models/carreras';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css'],
})
export class CrearUsuarioComponent implements OnInit {
  usuarios: Usuario[] = [];
  usuario: Usuario = {
    id_usuario: 0,
    nombre: '',
    apellido: '',
    nombre_carrera: '',
    id_carrera: 0,
    unidad_educativa: '',
    correo_electronico: '',
    contrasenia: '',
    id_rol: 0,
    tipo_rol: '',
  };
  carreras: Carrera[] = [];
  roles: any = [];
  exform: FormGroup;
  p: number = 0;
  textoBuscar = '';
  closeResult = '';
  edit: boolean = false;
  estado: boolean;

  constructor(
    private registroUsuarioService: RegistroUsuarioService,
    private alerts: AlertsService,
    private router: Router,
    private registroRolService: RegistroRolService,
    private registroCarreraService: ResgitroCarrerasService,
    private modalService: NgbModal
  ) {}
  private emailPattern: any =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  ngOnInit(): void {
    this.getCarreras();
    this.ObtenerRoles();
    this.getUsuarios();
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
  }
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
  clear() {
    this.usuario.nombre = null;
    this.usuario.apellido = null;
    this.usuario.correo_electronico = null;
    this.usuario.contrasenia = null;
    this.usuario.tipo_rol = null;

    this.exform.controls['nombre'].setValue(this.usuario.nombre);
    this.exform.controls['apellido'].setValue(this.usuario.apellido);
    this.exform.controls['correo_electronico'].setValue(
      this.usuario.correo_electronico
    );
    this.exform.controls['contrasenia'].setValue(this.usuario.contrasenia);
    this.exform.controls['tipo_rol'].setValue(this.usuario.tipo_rol);
  }
  getUsuario(id_usuario: String, id_rol: number) {
    // this.edit = true;
    if (id_usuario) {
      this.registroUsuarioService.getUsuario(id_usuario).subscribe(
        (res: any) => {
          this.usuario = res;
          this.exform.controls['nombre'].setValue(this.usuario.nombre);
          this.exform.controls['apellido'].setValue(this.usuario.apellido);
          this.exform.controls['correo_electronico'].setValue(
            this.usuario.correo_electronico
          );
          this.exform.controls['contrasenia'].setValue(
            this.usuario.contrasenia
          );
          this.exform.controls['tipo_rol'].setValue(this.usuario.tipo_rol);
           //bachillerato
          if (id_rol == 4) {
            this.estado = false;
            this.exform.controls['nombre_carrera'].setValue(
              this.usuario.nombre_carrera = "Sin asignar"
            );

          } else {
            if (id_rol == 5) {
              this.estado = true;

              this.exform.controls['nombre_carrera'].setValue(
                this.usuario.nombre_carrera
              );

            }
          }
        },
        (err) =>
          this.alerts.showError('Error Operation', 'No se puede actualizar')
      );
    }
  }
  getUsuarios() {
    var usuAE = [];
    var c = 0;
    this.registroUsuarioService.getUsuarios().subscribe(
      (res: any) => {
        for (let usu1 of res) {
          if (usu1.id_rol == 4 || usu1.id_rol == 5) {
            if (usu1.id_carrera == 1 || usu1.id_carrera == 12) {
              usu1.nombre_carrera = '';
            }
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
  ObtenerRoles() {
    var rol = [];
    this.registroRolService.getRoles().subscribe(
      (res: any) => {
        for (let rol1 of res) {
          if (rol1.id_rol == 4 || rol1.id_rol == 5) {
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
          this.getUsuarios();
          this.alerts.showSuccess('Successfull Operation', 'Usuario eliminado');
          //this.toastr.success('Successfull Operation', 'Rol eliminado');
        },

        (err) => {
          this.alerts.showError('Error Operation', err);
        }

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
        },

        (err) => {
          console.error(err);
          this.alerts.showError('Error Operation', 'No se puede actualizar');
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

    if (event.target.value == 'Educación Superior') {
      this.estado = true;
      this.exform.controls['nombre_carrera'].setValue(null);
    } else {
      if (event.target.value == 'Bachillerato') {
        this.estado = false;
        this.exform.controls['nombre_carrera'].setValue(
          this.usuario.nombre_carrera = 'Sin Asignar'
        );

      }
    }
  }
}
