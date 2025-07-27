import { Component } from '@angular/core';
import { ComparadorComponent } from './comparador/comparador.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ComparadorComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {}
