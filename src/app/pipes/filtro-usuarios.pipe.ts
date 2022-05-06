import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroUsuarios',
})
export class FiltroUsuariosPipe implements PipeTransform {
  transform(arreglo: any[], texto: string): any[] {

    if (texto == '' || texto.length < 2) {
      return arreglo;
    } else {
      texto = texto.toLowerCase();
      return arreglo.filter((item) => {
        return (
          item.apellido.toLowerCase().includes(texto) ||
          item.nombre.toLowerCase().includes(texto)
        );
      });
    }
  }
}
