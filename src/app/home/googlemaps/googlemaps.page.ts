//El archivo .ts están las funciones hechas en angular, las cuales al momento de ejecutarse hacen que se muestre el mapa con la ubicación del usuario.

/*se utilizó una API Key de Google Maps, la cual está alojada en el archivo index.html ubicado en: 
PiaAppMoviles-master\src\index.html en la línea 20 del código, está dentro de un <script>.*/

import { Component, OnInit } from '@angular/core';
import {Geolocation, Geoposition} from '@ionic-native/geolocation/ngx';
import { LoadingController } from '@ionic/angular';

declare var google;

@Component({
  selector: 'app-googlemaps',
  templateUrl: './googlemaps.page.html',
  styleUrls: ['./googlemaps.page.scss'],
})
export class GooglemapsPage implements OnInit {

  mapRef = null;

  latitud: number;
  longitud: number;

  constructor(
    private geolocation: Geolocation,
    private loadingCtrl: LoadingController
  ) {}

  obtenerCoordenadas() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitud = resp.coords.latitude;
      this.longitud = resp.coords.longitude;
      console.log("Long: " + this.longitud + " Lat:" + this.latitud)
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

  ngOnInit() {
    this.loadMap();
  }

  /* Esta devuelve un objeto asyncfunction y es utilizada para “cargar el mapa”.
   Tenemos const loading, el cual carga la localización del dispositivo. */
  async loadMap() {
    const loading = await this.loadingCtrl.create();
    loading.present();
    //obtiene las coordenadas (latitud – longitud) con la función getLocation.
    const myLatLng = await this.getLocation();
    //se llama al div: map creado en el archivo .html para que cargue el mapa.
    const mapEle: HTMLElement = document.getElementById('map');
    //centra en la pantalla las coordenadas obtenidas con un zoom de 8 (Tamaño normal).
    this.mapRef = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 8
    });
    google.maps.event
    .addListenerOnce(this.mapRef, 'idle', () => {
      loading.dismiss();
      this.addMaker(myLatLng.lat, myLatLng.lng);
    });
  }

  //añade un marcador con la posición obtenida (lat – lng) dentro del mapa especificado this.mapRef.
  private addMaker(lat: number, lng: number) {
    const marker = new google.maps.Marker({
      position: { lat, lng },
      map: this.mapRef,
    });
  }

  /*ésta con el paquete Geolocation importado obtiene las coordenadas lat y lng (latitud y longitud) 
  exactas de la ubicación del dispositivo y devuelve los valores tipo numéricos donde esta sea llamada.*/
  private async getLocation() {
    const rta = await this.geolocation.getCurrentPosition();
    return {
      lat: rta.coords.latitude,
      lng: rta.coords.longitude
    };
  }
}
