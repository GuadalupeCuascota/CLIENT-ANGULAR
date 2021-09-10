import { Component, OnInit } from '@angular/core';
import { RegistroUsuarioService } from '../../../Services/registro-usuario.service';
import { Usuario } from '../../../Models/usuario';
import{AlertsService} from '../../../Services/alerts/alerts.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registro-editor',
  templateUrl: './registro-editor.component.html',
  styleUrls: ['./registro-editor.component.css']
})
export class RegistroEditorComponent implements OnInit {
  usuario: Usuario = {
    nombre: '',
    apellido: '',
    nivel_academico: '',
    carrera: '',
    unidad_educativa: '',
    correo_electronico: '',
    contrasenia: '',
    id_rol: 2,
  };
  codigo_registro=123
  constructor(
    private registroUsuarioService: RegistroUsuarioService,
    private alerts: AlertsService,
    private router: Router) { }

  ngOnInit(): void {
  }
  saveUsuario() {
    console.log(this.usuario);
    this.registroUsuarioService.saveUsuario(this.usuario).subscribe(
      (res) => {
        console.log(res);
        this.alerts.showSuccess('Successfull Operation', 'Usuario guardado')
        this.router.navigate(['/login']);

      },
      (err) => {
        console.error(err)
      this.alerts.showError('Error Operation', 'No se puede guardar')
      }
    );
  }
}
