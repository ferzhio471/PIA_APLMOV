import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

//redireccion y carga de modulos de cada pestaña
const routes: Routes = [
  {
    path: 'tabs',
    component: HomePage,
    children:[
      {
        //redirige a la pestaña media al iniciar la app
        path: '',
        redirectTo: '/home/tabs/media',
        pathMatch: 'full'
      },
      {
        path: 'media',
        loadChildren: () => import('./media/media.module').then( m => m.MediaPageModule)
      },
      {
        path: 'googlemaps',
        loadChildren: () => import('./googlemaps/googlemaps.module').then( m => m.GooglemapsPageModule)
      },
      {
        path: 'climate',
        loadChildren: () => import('./climate/climate.module').then( m => m.ClimatePageModule)
      }

    ]
  },
  {
    path: '',
    redirectTo: '/home/tabs/media',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
