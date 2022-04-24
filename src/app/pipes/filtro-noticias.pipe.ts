import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroNoticias'
})
export class FiltroNoticiasPipe implements PipeTransform {

  transform(arreglo: any[],texto:string):any[] {

    console.log(arreglo)
  
  
      if(texto==''||texto.length<2){
        
        return arreglo
      
      }else{
       
        texto=texto.toLowerCase();
        console.log(texto)
        return arreglo.filter(item=>{ return  item.titulo.toLowerCase().includes(texto) 
         
        }
        );
  
      }
    }

}
