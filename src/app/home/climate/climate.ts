
//se especifican los tipos de variables, en este caso los de location, que incluye todos los lugares disponibles con sus coordenadas
export interface Location {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  tz_id: string;
  localtime_epoch: number;
  localtime: string;
}

//aquí están los de la condición climática dependiendo de la locación en la que se encuentre el usuario y un pequeño ícono que muestra el estado del clima
export interface Condition {
  text: string;
  icon: string;
  code: number;
}

//en current están todos los valores secundarios del clima, llovizna, viento, presión atmosférica, temperatura, etc
export interface Current {
  last_updated_epoch: number;
  last_updated: string;
  temp_c: number;
  temp_f: number;
  is_day: number;
  condition: Condition;
  wind_mph: number;
  wind_kph: number;
  wind_degree: number;
  wind_dir: string;
  pressure_mb: number;
  pressure_in: number;
  precip_mm: number;
  precip_in: number;
  humidity: number;
  cloud: number;
  feelslike_c: number;
  feelslike_f: number;
  vis_km: number;
  vis_miles: number;
  uv: number;
  gust_mph: number;
  gust_kph: number;

}

// en climate se inicializan tanto la variable de location como la de current de todo el contenido del ts
export interface Climate {
  location: Location;
  current: Current;
}
