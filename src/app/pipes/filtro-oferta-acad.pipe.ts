import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroOfertaAcad',
})
export class FiltroOfertaAcadPipe implements PipeTransform {
  transform(arreglo: any[], texto: string): any[] {
    if (texto == '' || texto.length < 2) {
      return arreglo;
    } else {
      texto = texto.toLowerCase();
      return arreglo.filter((item) => {
        return (
          item.titulo.toLowerCase().includes(texto) ||
          item.nombre_carrera.toLowerCase().includes(texto)
        );
      });
    }
  }
}
