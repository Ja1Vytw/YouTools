import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  template: `
    <section class="flex flex-col items-center justify-center min-h-[60vh] text-center animate-fade-in">
      <h1 class="text-5xl font-extrabold text-gray-900 mb-4">YouTools</h1>
      <p class="text-lg text-gray-600 max-w-2xl mb-10">
        Plataforma profissional de ferramentas para YouTube.<br>
        Compare canais, converta vídeos, estime ganhos e muito mais — tudo em um só lugar.
      </p>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl mb-12">
        <div class="bg-white border border-gray-200 rounded-2xl shadow-md p-6 flex flex-col items-center transition hover:shadow-lg hover:-translate-y-1 animate-fade-in-up">
          <span class="text-3xl mb-2 text-blue-600">📊</span>
          <h2 class="font-bold text-xl mb-2 text-gray-800">Comparador de Canais</h2>
          <p class="text-gray-500 mb-4">Compare inscritos, visualizações e vídeos de vários canais do YouTube de forma visual e rápida.</p>
          <a routerLink="/comparador" class="text-blue-600 font-semibold hover:underline">Acessar</a>
        </div>
        <div class="bg-white border border-gray-200 rounded-2xl shadow-md p-6 flex flex-col items-center transition hover:shadow-lg hover:-translate-y-1 animate-fade-in-up">
          <span class="text-3xl mb-2 text-green-600">🎵</span>
          <h2 class="font-bold text-xl mb-2 text-gray-800">Conversor YouTube</h2>
          <p class="text-gray-500 mb-4">Converta vídeos do YouTube para MP3 ou MP4 de forma simples e rápida (em breve).</p>
          <a routerLink="/converter" class="text-green-600 font-semibold hover:underline">Acessar</a>
        </div>
        <div class="bg-white border border-gray-200 rounded-2xl shadow-md p-6 flex flex-col items-center transition hover:shadow-lg hover:-translate-y-1 animate-fade-in-up">
          <span class="text-3xl mb-2 text-yellow-600">💰</span>
          <h2 class="font-bold text-xl mb-2 text-gray-800">Estimador de Ganhos</h2>
          <p class="text-gray-500 mb-4">Veja uma estimativa de quanto um vídeo do YouTube gerou em receita (em breve).</p>
          <a routerLink="/ganhos" class="text-yellow-600 font-semibold hover:underline">Acessar</a>
        </div>
      </div>
      <footer class="text-gray-400 text-sm mt-8">&copy; {{ anoAtual }} YouTools. Feito com foco em criadores e curiosos do YouTube.</footer>
    </section>
  `,
  styleUrls: ['./app.css']
})
export class HomeComponent {
  anoAtual = new Date().getFullYear();
} 

