import { getTranslationDeclStmts } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { RegistroRolService } from '../../../Services/registro-rol.service';

import{AlertsService} from '../../../Services/alerts/alerts.service';

//importar las rutas
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-roles-list',
  templateUrl: './roles-list.component.html',
  styleUrls: ['./roles-list.component.css'],
})
export class RolesListComponent implements OnInit {
  roles: any = [];

  rol: any= {
    id_rol: 0,
    tipo_rol: '',
  };
  rolform:FormGroup
  edit: boolean=false;
  constructor( 
    private registroRolService: RegistroRolService,
    private router: Router,
    private alerts: AlertsService,
    private activedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getRoles();
    this.rolform=new FormGroup({
      tipo_rol: new FormControl('', Validators.required),
      
    })
  }

  getRoles() {
    this.registroRolService.getRoles().subscribe(
      (res) => {
        console.log(res);
        this.roles = res;
        
      },
      (err) => console.error(err)
    );
  }

  saveRol() {
    delete this.rol.id_rol;
    this.rol.tipo_rol=this.rolform.controls['tipo_rol'].value;
    this.registroRolService.saveRol(this.rol).subscribe(
      (res) => {
        console.log(res);
        this.getRoles();
        this.alerts.showSuccess('Rol guardado', 'Operación exitosa')
      },
      (err) => console.error(err)
    );
  }
  deleteRol(id: string) {
    if(confirm('Esta seguro que desea eliminar esto?')){
    this.registroRolService.deleteURol(id).subscribe(
      (res) => {
        console.log(res);
        this.getRoles();
        this.alerts.showSuccess('Rol eliminado','Operación exitosa', );
      },
      (err) => {
        console.error(err)
      this.alerts.showError('Error Operation', 'No se puede eliminar')
      }
    );
    }
  }
  getRol(id: String) {
    console.log(id);
    if (id) {
      this.registroRolService.getRol(id).subscribe(
        res => {
          console.log(res);
          this.rol= res;   
          this.edit=true 
          
        },
        err => console.error(err)
      );
    }
    
  }
  updateRol(){
    console.log(this.rol)
    this.registroRolService.updateRol(this.rol.id_rol,this.rol).subscribe(
      res=>{
        console.log(res);
        this.getRoles();
        this.edit=false;
        //window.location.reload();

      },
      err=>console.log(err)  
    );


  }

}
