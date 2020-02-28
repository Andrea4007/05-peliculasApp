import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
//interfaz pelicula detalle
import { PeliculaDetalle } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class DataLocalService {
  /* arreglo9 de pelicula detalle inicializado en vacio */
  peliculas: PeliculaDetalle[]=[];

  constructor(private storage: Storage,
              private toastCtrl: ToastController) {
                //cargando favoritos del storgae, cargar la accion
                this.cargarFavoritos;
               }

  async presentToast(message: string) {
      const toast = await this.toastCtrl.create({
        message,
        duration: 1500
      });
      toast.present();
    }

  //metodo para grabar en el storage guardar pelicula 
  guardarPelicula(pelicula: PeliculaDetalle){
    let mensaje = '';
    //validando si existe la pelicula si existe en lugar de guardarla la borra
    let existe = false;
    for(const peli of this.peliculas ){
      if(peli.id === pelicula.id){
         existe = true;
        break;
      }
    }
    if( existe ){
      this.peliculas = this.peliculas.filter(peli => peli.id !== pelicula.id); 

        mensaje = 'Removido de favoritos';

      }else{
        this.peliculas.push(pelicula);
        mensaje = 'Agregada a favoritos';
      }

    
    //mosrtrar mensaje 
    this.presentToast( mensaje );

  //  this.peliculas.push(pelicula); //insertandolo en pelicula que vieene del argumento
    //grabando el objeto de arriba en el storage
    //siempre se disparara esta funcion ya sea que exista el arreglo o un sarrevglo nuevo.
    this.storage.set('peliculas', this.peliculas);
    //tenemos que mandar la negacion al otro lado si existe o no existe
    return !existe;

  }

  //cargar favoritos de las peliculas que se tiene en el storage
  //esto e suna promesa mediante async y retorna un arreglo de las peliculas o un null
  async cargarFavoritos(){
    //si esto no existe regresa un null 
    const peliculas = await this.storage.get('peliculas');
    //si get peñliculas es null va a mandar un arreglo vacio
    this.peliculas = peliculas || []; 
    return this.peliculas;
  }

  async existePelicula(id){
    console.log(id);
    id = Number(id);
    console.log(id);

    //cargar la parte de favoritos
    await this.cargarFavoritos();
    const existe = this.peliculas.find(peli => peli.id === id );
    //usando el operador ternario como un if nsi existe hara un true si no existe hara un false
    return (existe) ? true : false;
  }

}
