import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroNoticias',
})
export class FiltroNoticiasPipe implements PipeTransform {
  transform(arreglo: any[], texto: string): any[] {
    if (texto == '' || texto.length < 2) {
      return arreglo;
    } else {
      texto = texto.toLowerCase();
      return arreglo.filter((item) => {
        return item.titulo.toLowerCase().includes(texto);
      });
    }
  }
}
