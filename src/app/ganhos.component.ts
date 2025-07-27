import { Component } from '@angular/core';
import { YoutubeService } from './youtube.service';
import { NgIf, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ganhos',
  standalone: true,
  imports: [NgIf, FormsModule, DecimalPipe],
  template: `
    <div class="flex flex-col items-center justify-center min-h-[60vh] text-center animate-fade-in">
      <h1 class="text-4xl font-extrabold text-gray-900 mb-6">Estimador de Ganhos do YouTube</h1>
      <p class="text-lg text-gray-600 max-w-xl mb-8">
        Cole a URL de um vídeo do YouTube e veja uma estimativa de quanto ele gerou em receita.<br>
        (Baseado em visualizações públicas e CPM médio do Brasil)
      </p>
      <input [(ngModel)]="url" class="border-2 border-yellow-400 p-2 rounded-lg w-full max-w-md mb-4 outline-none" placeholder="Cole a URL do vídeo aqui">
      <button (click)="estimar()" [disabled]="!urlValida" class="bg-yellow-500 text-white px-6 py-2 rounded-lg font-bold shadow hover:bg-yellow-600 transition-all disabled:opacity-50">Estimar Ganhos</button>
      <div *ngIf="erro" class="text-red-500 mt-4">{{ erro }}</div>
      <div *ngIf="resultado" class="mt-8 bg-white border border-gray-200 rounded-xl shadow p-6 max-w-md mx-auto animate-fade-in-up">
        <div class="text-2xl font-bold text-yellow-700 mb-2">Estimativa de Ganhos</div>
        <div class="text-gray-700 mb-2">Visualizações: <span class="font-semibold">{{ resultado!.views | number }}</span></div>
        <div class="text-gray-700 mb-2">CPM médio (Brasil): <span class="font-semibold">US$ {{ resultado!.cpm }}</span></div>
        <div class="text-gray-900 text-xl">Receita estimada: <span class="font-bold">US$ {{ resultado!.ganhos | number:'1.2-2' }}</span></div>
      </div>
      <p class="text-sm text-gray-400 mt-6">A estimativa é baseada em um CPM médio brasileiro de US$ 0,80. Valores reais podem variar conforme nicho, época e público.</p>
    </div>
  `,
  styleUrls: ['./app.css']
})
export class GanhosComponent {
  url = '';
  erro = '';
  resultado: { views: number, cpm: number, ganhos: number } | null = null;
  cpmPadrao = 0.8;

  constructor(private youtube: YoutubeService) {}

  get urlValida() {
    return /^https:\/\/www\.youtube\.com\/(watch\?v=|shorts\/)[\w-]+/.test(this.url.trim());
  }

  estimar() {
    this.erro = '';
    this.resultado = null;
    const videoId = this.extrairId(this.url.trim());
    if (!videoId) {
      this.erro = 'URL inválida.';
      return;
    }
    this.youtube.getVideoInfo(videoId).subscribe({
      next: (res: any) => {
        if (res.items && res.items.length > 0) {
          const views = +res.items[0].statistics.viewCount;
          const ganhos = (views / 1000) * this.cpmPadrao;
          this.resultado = { views, cpm: this.cpmPadrao, ganhos };
        } else {
          this.erro = 'Vídeo não encontrado.';
        }
      },
      error: () => {
        this.erro = 'Erro ao buscar informações do vídeo.';
      }
    });
  }

  extrairId(url: string): string | null {
    const match = url.match(/(?:v=|shorts\/)([\w-]+)/);
    return match ? match[1] : null;
  }
} 