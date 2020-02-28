import { Component, OnInit, Input } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { PeliculaDetalle, Cast } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {
 /*  //esta reciviendo el id por el input al dar clic en el deatlle modal */
  @Input() id;
/*   //como este objeto se declaro como vacio los elementos de la 
inrterfaz se deben de declarar como opciones en la interfaz de peliicula detallle. */
pelicula: PeliculaDetalle = {};
/* //actores cast */
actores: Cast[] = [];
/* cuando la pagina cargue la estrella sera outline */
estrella = 'star-outline';
slideOptPoster = {
  slidesPerView: 3.3,
  freeMode: true,
  spacebetween: -5
}
  constructor(private servicio: MoviesService,
              private modalCtrl: ModalController,
              private dataLocal: DataLocalService) { };
  oculto = 150;

  /* async */ ngOnInit() {
/* //aqui carga la pelicula
//verificando si existe la pelicual */
/* const existe= await this.dataLocal.existePelicula(this.id);
console.log('Detalle component existe:', existe);
 */
/* //console.log('ID', this.id); */
//trabajando lo commo una promesa normal quitando el async 
this.dataLocal.existePelicula(this.id)
.then(existe=>this.estrella = (existe)? 'star' : 'star-outline');

    this.servicio.getPeliculaDetalle(this.id)
    .subscribe(resp=>{
      console.log(resp);
      this.pelicula=resp;
    });

    /* //actores pelicula informacion de los actores de la pelicula */
    this.servicio.getActoresPelicula(this.id)
    .subscribe(resp=>{
      this.actores= resp.cast;
      console.log(resp);
    });
  }
  regresar(){
    this.modalCtrl.dismiss();

  }
  favorito(){
   const existe =  this.dataLocal.guardarPelicula(this.pelicula);
   this.estrella = (existe) ? 'star' : 'star-outline';

  }

}
