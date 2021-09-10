import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistroMateriasCarreraService } from '../../../Services/registro-materias-carrera.service';

@Component({
  selector: 'app-materia-list',
  templateUrl: './materia-list.component.html',
  styleUrls: ['./materia-list.component.css']
})
export class MateriaListComponent implements OnInit {
  materiasCarrera: any [] = [];
  constructor(private router: Router, private registroCarrerasMateria:RegistroMateriasCarreraService ) { }
  p: number = 0;
  ngOnInit(): void {
    this.getMateriasCarrera()
  }
   Crear(){
    this.router.navigate(['/crear-materia']);
   }

   getMateriasCarrera() {
    var Materia = [];
    
    console.log("hol")
   
    var c=0;
    this.registroCarrerasMateria.getMateriasCarrera().subscribe(
      
      (res:any) => {


       
        console.log(res)
       this.materiasCarrera=res;

      },
      /*  res=> console.log(res), */
      (err) => console.error(err)
    );
  
  }
}
