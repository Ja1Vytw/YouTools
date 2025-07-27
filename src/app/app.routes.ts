import { Routes } from '@angular/router';
import { ComparadorComponent } from './comparador/comparador.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home.component').then(m => m.HomeComponent)
  },
  {
    path: 'comparador',
    component: ComparadorComponent
  },
  {
    path: 'converter',
    loadComponent: () => import('./converter.component').then(m => m.ConverterComponent)
  },
  {
    path: 'ganhos',
    loadComponent: () => import('./ganhos.component').then(m => m.GanhosComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
