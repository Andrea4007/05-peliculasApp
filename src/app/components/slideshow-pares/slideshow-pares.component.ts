import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pelicula } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-slideshow-pares',
  templateUrl: './slideshow-pares.component.html',
  styleUrls: ['./slideshow-pares.component.scss'],
})
export class SlideshowParesComponent implements OnInit {
  @Input() peliculas: Pelicula[]=[];
  //para cargar las otras peliculas
  @Output() cargarMas = new EventEmitter();
  slidesOpts={
    //para que se muestre la imagen completa y un poquito ddel otro
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween:-10
  };

onClick(){
  this.cargarMas.emit();
  console.log("Cargar más");
}
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}
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
