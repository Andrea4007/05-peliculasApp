import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroImagen'
})
export class FiltroImagenPipe implements PipeTransform {
//puede ser un arreglo de peliculadetalle o any
  transform(peliculas:any[]): any[] {
    //vamos a regresar
    return peliculas.filter(peli=>{
      return peli.backdrop_path;
    });
  }

}
