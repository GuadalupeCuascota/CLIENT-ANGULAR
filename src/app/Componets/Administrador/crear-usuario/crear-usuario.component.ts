import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators,ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { AlertsService } from 'src/app/Services/alerts/alerts.service';
import { Usuario } from '../../../Models/usuario';
import { RegistroUsuarioService } from '../../../Services/registro-usuario.service';
import { RegistroRolService } from '../../../Services/registro-rol.service';
import { ResgitroCarrerasService } from 'src/app/Services/resgitro-carreras.service';
import { Carrera } from '../../../Models/carreras';
@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {
  exform:FormGroup
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
  carreras: Carrera [] = [];
  roles: any = [];
  estado: boolean;
  showPassword = false;
  show_eye: Boolean = false;
  constructor( private registroUsuarioService: RegistroUsuarioService, private alerts: AlertsService,private router: Router,
    private registroRolService: RegistroRolService,private registroCarreraService:  ResgitroCarrerasService) { }

  ngOnInit(): void {
    this.ObtenerRoles();
    this.getCarreras();
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
  regresar(){
    this.router.navigate(['/usuarios']);
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
        
      //  this.getUsuarios();
        console.log(res);
        this.alerts.showSuccess('Successfull Operation', 'Usuario guardado')
        this.router.navigate(['/usuarios']);
        this.exform.reset();
      },
      (err) => {
        console.error(err)
      this.alerts.showError('Error Operation', 'No se puede guardar')
      }
    );
    
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
  getCarreras() {
    var Carrera = [];
    console.log("hol")
    
    this.registroCarreraService.getCarreras().subscribe(
      
      (res:any) => {


        for (let n of res) {
          if (n.id_carrera!=1) {
            Carrera.push(n);
            
          }
        }
        console.log(res)
       this.carreras=Carrera;

      },
      /*  res=> console.log(res), */
      (err) => console.error(err)
    );
  
  }
}
