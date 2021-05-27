import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

//Aqui se incluyen las librerias que se utilizaran para el funcionamiento de la captura de multimedia
import { MediaCapture } from '@ionic-native/media-capture/ngx';
import { Media } from '@ionic-native/media/ngx';
import { File } from '@ionic-native/file/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { StreamingMedia } from '@ionic-native/streaming-media/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx'

import { Geolocation } from '@ionic-native/geolocation/ngx';//como es un provider, agregarlo también dentro de la sección @NgModule dentro de providers.
import {SQLite} from '@ionic-native/sqlite/ngx';
import { HttpClientModule } from '@angular/common/http';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [StatusBar, SplashScreen, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Media, File, MediaCapture, ImagePicker, StreamingMedia, PhotoViewer, Geolocation, SQLite, SQLitePorter
    //en caso de obtener error en el MediaCapture correr el siguiente comando
    //npm i @ionic-native/core
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
