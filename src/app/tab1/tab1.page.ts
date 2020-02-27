import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Pelicula } from '../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  peliculasRecientes:Pelicula[] = [];
  populares: Pelicula[]=[];

/*   slidesOpts={
    //para que se muestre la imagen completa y un poquito ddel otro
    slidesPerView: 1.1,

    freeMode: true
  };
 */
  constructor(private servicio:MoviesService) {}
  ngOnInit(){
    //con esto typescript sabe que tipo de datos tiene cada cosa
    this.servicio.getFeature().subscribe(resp => {
      console.log('Resp', resp);
      //esto nos ayudara a obtener las propiedades
      this.peliculasRecientes = resp.results;

    });
    this.getPopulares();
    /* this.servicio.getPopulares().subscribe(resp=>{
      console.log('Populares', resp);
      this.populares = resp.results;
    }); */
  }
  cargarMas(){
    this.getPopulares();

  }
  //aqui esta toda la logica
  getPopulares(){
    this.servicio.getPopulares().subscribe(resp=>{
      //concatenando a las peliculas que ya estabn las peliculas que se cargaron 
      const arrTemp = [...this.populares, ...resp.results];
  //   console.log('Populares', resp);
      //agregar al arreglo de populares las nuevas peliculas al pulsar el boton de cargar mas, 
      //usando el operador esprec vamos a separar los elementos que veine en esos resultados
     // this.populares.push(...resp.results);
     this.populares = arrTemp;
      /* aqui solo estamos reinicializando el arreglo de popuelares */
    /*   this.populares = resp.results; */
    });
  }

}
