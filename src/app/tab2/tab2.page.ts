import { Component } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Pelicula } from '../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../components/detalle/detalle.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  textoBuscar = '';
  buscando = false; // cuando se carga el componente no esta buscando nada
  peliculas: Pelicula[]=[];
  ideas: string[]= ['Spiderman', 'Avenger', 'El señor de los anillos', 'La vida es bella'];

  constructor(private servicio: MoviesService, private modtalCtrl:ModalController) {}

  buscar( event ){
    //tomando el valor
    const valor:string = event.detail.value;
    if(valor.length===0){ //si la consulta es igual a cero
      this.buscando = false; //cancela el spinner
      this.peliculas=[]; // y d3eja el arreglo de peliculaas
      return; // para que no siga cargando el codigo
    }
  console.log(event);
  this.buscando = true;
  this.servicio.buscarPelicula(valor).subscribe(resp=>{
 
    console.log(resp);
    /* para no crear la interfaz se hace referencia a la respuesta entre comillas como un elemento de arreglo */
    this.peliculas = resp['results'];
    this.buscando = false;
  });
  }

  //funcion mostrar el detalle de la pelicula
 async detalle(id:string){
    const modal = await this.modtalCtrl.create({
      component: DetalleComponent,
      componentProps:{
        id
      }
    });
    modal.present();

  }
}
