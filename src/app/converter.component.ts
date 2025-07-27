import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-converter',
  standalone: true,
  imports: [NgIf, FormsModule],
  template: `
    <div class="flex flex-col items-center justify-center min-h-[60vh] text-center animate-fade-in">
      <h1 class="text-4xl font-extrabold text-gray-900 mb-6">Conversor YouTube para MP3/MP4</h1>
      <p class="text-lg text-gray-600 max-w-xl mb-8">
        Cole a URL de um vídeo do YouTube e escolha o formato desejado.<br>
        A conversão será feita via serviços externos confiáveis.
      </p>
      <input [(ngModel)]="url" class="border-2 border-gray-300 p-2 rounded-lg w-full max-w-md mb-4 outline-none" placeholder="Cole a URL do vídeo aqui">
      <div class="flex gap-4">
        <button (click)="converter('mp3')" [disabled]="!urlValida" class="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold shadow hover:bg-blue-700 transition-all disabled:opacity-50">Baixar MP3</button>
        <button (click)="converter('mp4')" [disabled]="!urlValida" class="bg-gray-700 text-white px-6 py-2 rounded-lg font-bold shadow hover:bg-gray-900 transition-all disabled:opacity-50">Baixar MP4</button>
      </div>
      <p class="text-sm text-gray-400 mt-6">Por questões legais, a conversão é feita em sites externos.</p>
    </div>
  `,
  styleUrls: ['./app.css']
})
export class ConverterComponent {
  url = '';
  get urlValida() {
    return /^https:\/\/www\.youtube\.com\/(watch\?v=|shorts\/)[\w-]+/.test(this.url.trim());
  }
  converter(tipo: 'mp3' | 'mp4') {
    const url = encodeURIComponent(this.url.trim());
    if (tipo === 'mp3') {
      window.open(`https://yt1s.com/pt/youtube-to-mp3?q=${url}`, '_blank');
    } else {
      window.open(`https://yt1s.com/pt/youtube-to-mp4?q=${url}`, '_blank');
    }
  }
} 