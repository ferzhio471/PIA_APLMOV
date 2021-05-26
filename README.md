## Producto Integrador de Aprendizaje

**Responsables del proyecto:**

 - Gomez Rodriguez Fernando Daniel		1904204
 - Lopez Castro Brenda Montserrat		1744884
 - Rangel Pardo Diego					1989986


**Requisitos para ejecutar el programa en un dispositivo propio:**

 - Node
 - Android Studio
 - JDK 8
 - Gradle
 
 **Para su ejecucion:**
 
 Es necesario instalar las dependecias npm y los plugins utilizados en la app, para esto, en la carpeta donde se almacenó el proyecto, dar click una vez al final de la ruta, y escribir cmd, esto abrira la linea de comando ubicada en dicha ruta (o bien, en caso de estar en otro SO o que esto presente problemas, abrir el node.js comand prompt y posicionarse en la ruta manualmente).

Una vez hecho esto, se deberán ejecutar los siguientes comandos:

 - npm install
 - npm i @ionic-native/media-capture @ionic-native/file @ionic-native/media @ionic-native/streaming-media @ionic-native/photo-viewer @ionic-native/image-picker
 - ionic cordova plugin add cordova-plugin-media-capture
 - ionic cordova plugin add cordova-plugin-file
 - ionic cordova plugin add cordova-plugin-media
 - ionic cordova plugin add cordova-plugin-streaming-media
 - ionic cordova plugin add com-sarriaroman-photoviewer
 - cordova plugin add cordova-android-support-gradle-release

Abrir Android studio y realizar lo siguiente: 
Ir a File > Settings > Plugins > Buscar "PhoneGap/Cordova" > Dar click en Install > Aplicar cambios > Cerrar pestaña

Despues:

Dar click en Add configuration > Seleccionar "PhoneGap/Cordova" de las templates > Dar click en  Create Configuration > Cambiar la opcion de Command a "Run" > Aplicar cambios > Cerrar pestaña > Dar click en el icono de Run

**En caso de que el icono de Run no esté disponible o presente errores al correr la aplicacion:**

Abrimos la terminal de Android Studio y ejecutamos los siguientes comandos:

 - ionic cordova build android
 - ionic cordova run android




nota: en ocasiones hay que configurar manualmente las variables del sistema "JAVA_HOME" y "GRADLE_HOME" con las rutas de donde se encuentra el JDK y la carpeta .bin de gradle, respectivamente

 
 

