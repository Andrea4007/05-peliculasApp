import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RespuestaMDB, PeliculaDetalle, RespuestaCredits, Genre } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

//creando constante que viene del enviroment 
const URL = environment.url;
const apiKey = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private popularesPage = 0;
  generos: Genre[] = [];

  constructor(private servicio:HttpClient) { }

  //metodo privado solo sera usado aqui desde fuera no lo tienenn que ver
  //<T> por el tipo de dato que quieren que emita, se va a recivir el query que quieren que emita
  private ejecutarQuery<T>(query: string){
    //construyendo el url
    query = URL + query;
    query += `&api_key=${ apiKey }&language=es&include_image_language=es`;
    console.log(query);
    return this.servicio.get<T>(query);
    

  }
  //servicio para buscar peliculas
buscarPelicula(texto: string){
return this.ejecutarQuery(`/search/movie?query=${ texto }`);
}


getPopulares(){
  this.popularesPage++;
  const query = `/discover/movie?sort_by=popularity.desc&page=${this.popularesPage}`;
  //todos los querys regresan respuestamdb 
  return this.ejecutarQuery<RespuestaMDB>(query);
}
//servicio pára obtener el detallle de la pelicula
getPeliculaDetalle(id: string){
  return this.ejecutarQuery<PeliculaDetalle>(`/movie/${ id }?a=1`);

}
getActoresPelicula(id: string){
  //le dejamos el parametro de 1 para que funcione bien el query aunque lo omita el movie db
  return this.ejecutarQuery<RespuestaCredits>(`/movie/${ id }/credits?a=1`);

}
  getFeature(){
    //para el control de fechas
    const hoy = new Date();
    const ultimoDia = new Date(hoy.getFullYear(), hoy.getMonth() +1,0).getDate();
    //los meses estan en base cero
    const mes= hoy.getMonth() + 1;
    let mesString;
    //menor al mes de octubre
    if(mes < 10){
      mesString = '0' + mes;
    }else{
      mesString = mes;
    }

    const inicio = `${ hoy.getFullYear() }-${ mesString }-01`;
    const fin = `${ hoy.getFullYear() }-${ mesString }-${ ultimoDia }`;
    //las fechas se manejan como numeros
    return this.ejecutarQuery<RespuestaMDB>(`/discover/movie?primary_release_date.gte=${ inicio }&primary_release_date.lte=${fin}`);
  }
  cargarGeneros(): Promise<Genre[]>{
    return new Promise( resolve=>{
      this.ejecutarQuery(`/genre/movie/list?a=1`).subscribe(resp =>{
        this.generos = resp['genres'];
        console.log(this.generos);
        resolve(this.generos);
      });

    });

    
  }
}
