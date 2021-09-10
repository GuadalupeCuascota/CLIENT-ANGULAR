import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators,ReactiveFormsModule} from '@angular/forms';
import { RegistroMateriasService } from '../../../Services/registro-materias.service';
import { ResgitroCarrerasService } from '../../../Services/resgitro-carreras.service';

//importat modulo del modal para la edicion
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Materia } from '../../../Models/materias';
import{AlertsService} from '../../../Services/alerts/alerts.service';
import { Carrera } from '../../../Models/carreras';
import { RegistroMateriasCarreraService } from '../../../Services/registro-materias-carrera.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-crear-materia',
  templateUrl: './crear-materia.component.html',
  styleUrls: ['./crear-materia.component.css']
})
export class CrearMateriaComponent implements OnInit {
  carreras: Carrera [] = [];
  materias: Materia [] = [];
  closeResult = '';
  materia: Materia = {
    id_materia:0,
    nombre_materia:'',
  };
 materia1: any= {};

  p: number = 0;
  materiaform:FormGroup
  materiaCarreraform:FormGroup
  constructor(
    private registroMateriaService:RegistroMateriasService,
    private alerts: AlertsService,
    private modalService: NgbModal,
    private registroCarreraService:  ResgitroCarrerasService,
    private registroMateriasCarreraService:RegistroMateriasCarreraService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.materiaform=new FormGroup({
      nombre_materia: new FormControl('', Validators.required)

    })

    this.materiaCarreraform=new FormGroup({
      nombre_materia: new FormControl(),
      nombre_carrera: new FormControl('', Validators.required)

    })

    this.getMaterias();
  }
  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          this.getMaterias();
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
    this.getMaterias;
  }
  getMaterias() {
    var Materia = [];
    console.log("hol")
   
    var c=0;
    this.registroMateriaService.getMaterias().subscribe(
      
      (res:any) => {


       
        console.log(res)
       this.materias=res;

      },
      /*  res=> console.log(res), */
      (err) => console.error(err)
    );
  
  }
  saveMateria() {
    console.log("GUARDAR")
    console.log(this.materiaform.value);
    this.materia.nombre_materia=this.materiaform.controls['nombre_materia'].value;
   

    this.registroMateriaService.saveMateria(this.materia).subscribe(  
      (res) => {
        
       this.getMaterias();
        console.log(res);
        this.alerts.showSuccess('Successfull Operation', 'Guardado')
        
        this.materiaform.reset();
      },
      (err) => {
        console.error(err)
      this.alerts.showError('Error Operation', 'No se puede guardar')
      }
    );
    
  }
  getMateria(id_materia: String) {
    console.log("este es el id"+id_materia);
    if (id_materia) {
      this.registroMateriaService.getMateria(id_materia).subscribe(
        (res:any) => {
          console.log("respiuest",res);

          this.materia1= res;
          console.log('este es:' + this.materia1.nombre_materia);

        },
        
        (err) => console.error(err) 
        
      );
    }
  }

  deleteMateria(id_materia: string) {
    if(confirm('Esta seguro que desea eliminar esto?')){
    this.registroMateriaService.deleteMateria(id_materia).subscribe(
      (res) => {

        console.log("PASAA"+res);
        this.getMaterias();
        this.alerts.showSuccess('Successfull Operation', 'Eliminado');
        //this.toastr.success('Successfull Operation', 'Rol eliminado');
      },
      
      (err) =>  this.alerts.showError('Error Operation', 'No se puede eliminar')

    );
    }
  }
  updateMateria() {
    console.log("para actu",this.materia1);
    this.registroMateriaService
      .updateMateria(this.materia1.id_materia, this.materia1)
      .subscribe(
        (res) => {
          this.alerts.showSuccess('Successfull Operation', 'Actualizado');
          this.getMaterias();
          console.log(res);
        },
        (err) => console.log(err)
      );
  }
  getCarreras(){
    console.log()
    var Carrera = [];
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
  guardar(){
    console.log("LA MATERIA",this.materia1)
    console.log("GUARDAR")

    console.log(this.materiaCarreraform.value);
    this.materia1.nombre_materia=this.materiaCarreraform.controls['nombre_materia'].value;
   
    this.materia1.nombre_carrera=this.materiaCarreraform.controls['nombre_carrera'].value;
   
 console.log("la m", this.materia1)

    this.registroMateriasCarreraService.saveMateriaCarrera(this.materia1).subscribe(  
      (res) => {
        
      //  this.getMaterias();
        console.log(res);
        this.alerts.showSuccess('Successfull Operation', 'Guardado')
       
        this.router.navigate(['/materia']);

      },
      (err) => {
        console.error(err)
      this.alerts.showError('Error Operation', 'No se puede guardar')
      }
    );
    

  }

}
