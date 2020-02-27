import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagenPipe } from './imagen.pipe';
import { ParesPipe } from './pares.pipe';



@NgModule({
  declarations: [ImagenPipe, ParesPipe],
  //tenemos que exportarlo porque lo usaremos en otros modulos
  exports: [
    ImagenPipe,
    ParesPipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
