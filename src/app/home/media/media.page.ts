import { Component, OnInit } from '@angular/core';

//https://ionicframework.com/docs/native/media/
//https://ionicframework.com/docs/native/media-capture
//https://stackoverflow.com/questions/43480076/ionic-2-error-could-not-find-an-installed-version-of-gradle-either-in-android
//https://ionicframework.com/docs/native/streaming-media
//https://ionicframework.com/docs/native/image-picker

import { MediaCapture, MediaFile, CaptureError } from '@ionic-native/media-capture/ngx';
import { File, FileEntry } from '@ionic-native/file/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { StreamingMedia } from '@ionic-native/streaming-media/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Platform } from '@ionic/angular';

// nombre de la carpeta donde se almacenaran los elementos de la ruta que sera asignada 
const MEDIA_FOLDER = 'my_media'; 

@Component({
  selector: 'app-media',
  templateUrl: './media.page.html',
  styleUrls: ['./media.page.scss'],
})
export class MediaPage implements OnInit {

  files = [];

  constructor(
    private mediaCapture: MediaCapture,
    private file: File,
    private imagePicker: ImagePicker,
    private photoViewer: PhotoViewer,
    private streamingMedia: StreamingMedia,
    private platform: Platform

  ) { }


  ngOnInit() {
    this.platform.ready().then(() => {
      let path = this.file.dataDirectory;
      //cuando se abre la app se cargan los elementos que se guardaron en la ruta asignada
      this.file.checkDir(path, MEDIA_FOLDER).then(() => {
        this.loadFiles();
      }, err => {
        this.file.createDir(path, MEDIA_FOLDER, false);
      }
      );
    });
  }

  captureImage() {
    this.mediaCapture.captureImage().then((data: MediaFile[]) => {
      if (data.length > 0) {
        this.copyFileToLocalDir(data[0].fullPath);
      }
    }, (err: CaptureError) => console.error(err));
  }

  recordVideo() {
    this.mediaCapture.captureVideo().then((data: MediaFile[]) => {

      if (data.length > 0) {
        this.copyFileToLocalDir(data[0].fullPath);
      }
    }, (err: CaptureError) => console.error(err));
  }

  copyFileToLocalDir(fullPath) {

    let path = fullPath;

    if (fullPath.indexOf('file://') < 0) {
      path = 'file://' + fullPath;
    }

    //se descarta por un momento el formato del archivo para poder renombrarlo correctamente
    const ext = path.split('.').pop();
    const d = Date.now();
    //se renombra el elemento con la fecha en que fue tomado
    const newName = `${d}.${ext}`;

    const name = path.substr(path.lastIndexOf('/') + 1);
    const copyFrom = path.substr(0, path.lastIndexOf('/') + 1);
    //se asigna la nueva ruta donde seran almacenados los elementos
    const copyTo = this.file.dataDirectory + MEDIA_FOLDER;

    //una vez que se hizo el re-routing se manda a llamar a la funcion para mostrarlo en la lista
    this.file.copyFile(copyFrom, name, copyTo, newName).then(
      success => {
        this.loadFiles();
      },
      error => {
        console.log('error: ', error);
      }
    );

  }

  loadFiles() {
    //carga los archivos de la ruta que se asigno, en caso de haberlos
    this.file.listDir(this.file.dataDirectory, MEDIA_FOLDER).then(res => {
      this.files = res;
    }, err => console.log('Error al cargar los archivos', err));
  }

  openFile(f: FileEntry) {

    //se determina el tipo de archivo que es para abrirlo correctamente

    if (f.name.indexOf('.MOV') > -1 || f.name.indexOf('.mp4') > -1) {
      this.streamingMedia.playVideo(f.nativeURL);

    } else if (f.name.indexOf('.jpg') > -1) {

      this.photoViewer.show(f.nativeURL, 'Imagen')

    }
  }

  deleteFile(f: FileEntry) {

    const path = f.nativeURL.substr(0, f.nativeURL.lastIndexOf('/') + 1);

    //para eliminar un elemento solo se necesita la ruta y el nombre de archivo
    this.file.removeFile(path, f.name).then(() => {

      this.loadFiles();

    }, err => console.log('error remove: ', err));

  }

  pickImages() {
    this.imagePicker.getPictures({}).then(res => {
      //se obtiene una por una las imagenes con el ciclo 
      for (var i = 0; i < res.length; i++) {
        this.copyFileToLocalDir(res[i]);
      }
    })
  }

}
