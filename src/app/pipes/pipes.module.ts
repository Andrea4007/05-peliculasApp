import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagenPipe } from './imagen.pipe';
import { ParesPipe } from './pares.pipe';
import { FiltroImagenPipe } from './filtro-imagen.pipe';



@NgModule({
  declarations: [ImagenPipe, ParesPipe, FiltroImagenPipe],
  //tenemos que exportarlo porque lo usaremos en otros modulos
  exports: [
    ImagenPipe,
    ParesPipe,
    FiltroImagenPipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
