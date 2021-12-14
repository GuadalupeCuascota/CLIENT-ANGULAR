import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroPerfiles'
})
export class FiltroPerfilesPipe implements PipeTransform {

  transform(arreglo: any[],texto:string):any[] {
    if(texto=='' || texto.length<2){
      
      return arreglo
    
    }else{
     
      texto=texto.toLowerCase();
      console.log(texto)
      return arreglo.filter(item=>{
         return  item.nombre_perfil.toLowerCase().includes(texto)
        
      }
      );
      
      

    }
  }

}
