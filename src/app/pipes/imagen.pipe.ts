//pipe por si viene la imagen la muestra si no no
import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';
//optimizando las url con los url normales del enviroment
//vamos a traer los url normales no los de produccion
const URL = environment.imgPath;
@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {
  //preguntar si existe una imagen si no existe se sakle y no hara nada
  
  transform(img: string, size: string='w500'): string {
    if(!img){
      return './assets/no-image-banner.jpg';
    }
    const imgUrl = `${URL}/${size}/${img}`;
console.log('URL', imgUrl);

    return imgUrl;
  }

}
