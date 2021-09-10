import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertsService } from 'src/app/Services/alerts/alerts.service';
import { RegistroUsuarioService } from 'src/app/Services/registro-usuario.service';

@Component({
  selector: 'app-cambio-contrasenia',
  templateUrl: './cambio-contrasenia.component.html',
  styleUrls: ['./cambio-contrasenia.component.css'],
})
export class CambioContraseniaComponent implements OnInit {
  contraN: any = {};
  contra1 = '';
  contra2 = '';
  datos: any = {};
  errorMsj: any = {};
  msj: any = '';
  
  constructor(
    private registroUsuarioService: RegistroUsuarioService,
    private alerts: AlertsService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.datos=JSON.parse(localStorage.getItem('payload'));
    
  }


  CambioContrasenia() {

  console.log(this.contraN);
   this.contra1= this.contraN.contraseniaN1 ;
   this.contra2= this.contraN.contraseniaN ;
    if (this.contra1 == this.contra2) {
      this.registroUsuarioService.updatePass(this.datos.id_usuario,this.contraN)
      .subscribe(
        (res) => {
          this.alerts.showSuccess('Successfull Operation', 'contraseña actualizado');
          if(this.datos.id_rol==1){
            this.router.navigate(['/admin']);
          }
          if(this.datos.id_rol==2){
            this.router.navigate(['/editor']);

          }
          if(this.datos.id_rol==3){
            this.router.navigate(['/mentor'])
          }
         
        },
        (err) => {
          console.log('el error', err);
        
          this.errorMsj = err.error;
           this.alerts.showError(this.errorMsj.text,'Ha ocurrido un error')
  
          this.msj = this.errorMsj.text;
        }
        // this.alerts.showError('Error Operation', 'Las contraseñas no coinciden')
        
      );
      
    }else{
      this.alerts.showError('Error Operation', 'Las contraseñas no coinciden')
    }

    // this.registroUsuarioService
    //   .updateUsuario(this.contra.id_usuario, this.contra)
    //   .subscribe(
    //     (res) => {
    //       this.alerts.showSuccess('Successfull Operation', 'Usuario actualizado');
    //       // this.getUsuarios();
    //       // console.log(res);
    //     },
    //     (err) => console.log(err)
    //   );
  }
}
