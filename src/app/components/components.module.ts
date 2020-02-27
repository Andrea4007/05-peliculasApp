import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SlideshowBackdropComponent } from './slideshow-backdrop/slideshow-backdrop.component';
import { PipesModule } from '../pipes/pipes.module';
import { SlideshowPosterComponent } from './slideshow-poster/slideshow-poster.component';
import { SlideshowParesComponent } from './slideshow-pares/slideshow-pares.component';
import { DetalleComponent } from './detalle/detalle.component';



@NgModule({
  //el detalle componenb se debe espcificar que se puede crear dinamicamente pues es una promesa
  entryComponents: [
    DetalleComponent
  ],
  declarations: [SlideshowBackdropComponent,SlideshowPosterComponent, SlideshowParesComponent, DetalleComponent],
  imports: [
    CommonModule,
    //importamos el ionic module porque vamos a ocupar cards y demas dsiectivas y compoonentes
    IonicModule,
    //el pipe tambien lo vamos a importar porque lo vamos a estar ocupando
    PipesModule
  ], 
  exports:[
    SlideshowBackdropComponent,
    SlideshowPosterComponent,
    SlideshowParesComponent,
    DetalleComponent
  ]
})
export class ComponentsModule { }
