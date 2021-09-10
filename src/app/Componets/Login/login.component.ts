import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../Services/Login/login.service';
import { Usuario } from '../../Models/usuario';
import { Router } from '@angular/router';
import { AlertsService } from '../../Services/alerts/alerts.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UsuarioListComponent } from '../Administrador/usuario-list/usuario-list.component';

const helper = new JwtHelperService();
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user :Usuario={
    nombre: '',
    apellido: '',
    nivel_academico: '',
    carrera: '',
    unidad_educativa: '',
    correo_electronico: '',
    contrasenia: '',
    id_rol: 0,
  };
  resp: any = {};

  errorstatus: boolean = false;
  errorMsj: any = {};
  msj: any = '';
  showPassword = false;
  show_eye: Boolean = false;
  formLogin: FormGroup;
  constructor(
    private loginServices: LoginService, 
    private router: Router,
    private formBuilder:FormBuilder,
    private alerts: AlertsService
    ) { }

    
      ngOnInit() { 
     
    }
  toggleShow(): void {
    this.showPassword = !this.showPassword;
    this.show_eye = !this.show_eye;

  }
  login() {
    console.log(this.user);
    this.loginServices.login(this.user).subscribe(
      (res) => {
        console.log(res);
        this.resp = res;
        console.log("datos usuario", this.resp.payload)
        localStorage.setItem('token', this.resp.Token);
        localStorage.setItem('payload', JSON.stringify(this.resp.payload));// stringity convierte un json a string
       
        const id_rol = this.resp.payload.id_rol;

        if (id_rol == 1) {
          console.log('Admin');
          this.router.navigate(['/administrador']);
        }
          if (id_rol == 2) {
            console.log('Editor');
            this.router.navigate(['/editor']);
          
          
        } if (id_rol == 3) {
          console.log('Mentor');
          this.router.navigate(['/mentor']);
      
      }
        
      },
      (err) => {
        console.log('el error', err);
        this.errorstatus = true;
        this.errorMsj = err.error;
         this.alerts.showError(this.errorMsj.text,'Ha ocurrido un error')

        this.msj = this.errorMsj.text;
      }
    );
  }
  logOut() {
    this.loginServices.logOut();
  }
 
}
