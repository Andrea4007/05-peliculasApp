import { Component, OnInit, Input} from '@angular/core';
import { Pelicula } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-slideshow-backdrop',
  templateUrl: './slideshow-backdrop.component.html',
  styleUrls: ['./slideshow-backdrop.component.scss'],
})
export class SlideshowBackdropComponent implements OnInit {
  @Input() peliculas: Pelicula[]=[];
  slidesOpts={
    //para que se muestre la imagen completa y un poquito ddel otro
    slidesPerView: 1.3,
    freeMode: true
  };

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}
  //todo esto ahora regresa una promesa por eso se pone el await
  //para poder usar el awit se necesita que la funcion sea async
 async verDetalle(id: string){
    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps:{
        id
      }
    });
    modal.present();

}
}
