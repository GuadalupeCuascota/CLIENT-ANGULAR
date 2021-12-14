import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroCarreras'
})
export class FiltroCarrerasPipe implements PipeTransform {

  transform(arreglo: any[],texto:string):any[] {


  
  
    if(texto==''||texto.length<2){
      
      return arreglo
    
    }else{
     
      texto=texto.toLowerCase();
      
      return arreglo.filter(item=>{ return  item.nombre_carrera.toLowerCase().includes(texto)
       
      }
      );
      
      

    }
  }



}
