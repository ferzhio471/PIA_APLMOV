import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import { Climate, Current } from './climate';// se hace import de climate y current
import {LocationDBService} from './climateDB.service';
import {Locations} from './location';

@Component({
  selector: 'app-climate',
  templateUrl: './climate.page.html',
  styleUrls: ['./climate.page.scss'],
})
export class ClimatePage implements OnInit {
  apikey = "09d1a62c194e4ac89a0205805212505"; //API KEY que se utiliza en el request a la API
  url = "http://api.weatherapi.com/v1";

  climate: Climate;
  locations: Locations;

  latitud: number;//se declaran las variables de longitud y latitud que nos darán la temperatura de la zona en cuestión
  longitud: number;

  constructor(//se agrega un constructor con una variable private de la geolocalización
    private geolocation: Geolocation,
    private locationDBService: LocationDBService
  ) { }

  ngOnInit() {//se crea una variable ngOnInit que trae el resultado de getLocation, el cual contiene una tarea más pesada que no se recomienda agregar al constructor
    this.getLocation();
    this.locationDBService.getLocations();
  }

  private async getLocation() {
    const rta = await this.geolocation.getCurrentPosition();//se llama al método donde está la posición actual del usuario en la librería de geolocalización, y se obtiene la posición del usuario para guardar 
    this.latitud = rta.coords.latitude;         //estos datos en la variable const rta, la cual devolverá las coordenadas de latitud y longitud respectivamente
    this.longitud = rta.coords.longitude;
    this.getWheatherData();
  }

  getWheatherData() //se crea un fetch para acceder a una parte del código de HTTP, en el cual se devolverán los valores de la url, del apikey, latitud y longitud y se mostrarán en pantalla, junto con los headers
  {
    fetch(`${this.url}/current.json?key=${this.apikey}&q=${this.latitud},${this.longitud}&aqi=no`, {
      "method": "GET",
      "headers": { //headers recomendados de la documentación de la API
        "Transfer-Encoding": "chunked",
        "Connection": "keep-alive",
        "Vary": "Accept-Encoding",
        "CDN-PullZone": "93447",
        "CDN-Uid": "8fa3a04a-75d9-4707-8056-b7b33c8ac7fe",
        "CDN-RequestCountryCode": "GB",
        "CDN-EdgeStorageId": "615",
        "Request-Context": "appId=cid-v1:89996683-9a04-40b3-8e46-77754119dcf5",
        "CDN-CachedAt": "2021-05-25 23:01:31",
        "CDN-RequestPullSuccess": "True",
        "CDN-RequestPullCode": "200",
        "CDN-RequestId": "dab012502021edc2164f1ef146f6dab4",
        "CDN-Cache": "MISS",
        "Cache-Control": "public, max-age=180",
        "Content-Type": "application/json",
        "Date": "Tue, 25 May 2021 21:01:31 GMT",
        "Server": "BunnyCDN-FI1-615",
        "mode": 'cors',
      }
    })
    .then(response => response.json())//el fetch regresa un response, donde la respuesta se convierte a json para poderse interpretar
    .then(data => {//una vez obtenido el json, se asigna a la variable de climate
      this.climate = data; 
      this.locations = data;
    })
    .catch(err => {
      console.error(err);
    });
  }
}

