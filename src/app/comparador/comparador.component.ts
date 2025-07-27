import { Component } from '@angular/core';
import { NgIf, NgForOf, NgClass, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { YoutubeService } from '../youtube.service';

interface CanalComparado {
  id: string;
  info: any;
  erro?: string;
}

@Component({
  selector: 'app-comparador',
  standalone: true,
  imports: [NgIf, NgForOf, NgClass, FormsModule, DecimalPipe],
  templateUrl: './comparador.component.html',
  styleUrls: ['./comparador.component.css']
})
export class ComparadorComponent {
  canais: CanalComparado[] = [
    { id: '', info: null },
    { id: '', info: null }
  ];
  erro: string = '';
  instrucoes: string = 'Digite o ID do canal do YouTube (exemplo: UCVddZ3jH9RjXg9yB1cGrc1Q)';

  urlPesquisa: string = '';
  idPesquisado: string = '';
  erroPesquisa: string = '';

  constructor(private youtube: YoutubeService) {}

  adicionarCanal() {
    this.canais.push({ id: '', info: null });
  }

  removerCanal(idx: number) {
    if (this.canais.length > 2) {
      this.canais.splice(idx, 1);
    }
  }

  comparar() {
    this.erro = '';
    this.canais.forEach(c => { c.info = null; c.erro = undefined; });
    let pendentes = this.canais.length;
    this.canais.forEach((canal, idx) => {
      this.youtube.getChannelInfoById(canal.id).subscribe((res: any) => {
        if (res.items && res.items.length > 0) {
          this.canais[idx].info = res.items[0];
        } else {
          this.canais[idx].erro = 'Canal não encontrado!';
        }
        if (--pendentes === 0) this.marcarComparacao();
      }, err => {
        this.canais[idx].erro = 'Erro ao buscar canal!';
        if (--pendentes === 0) this.marcarComparacao();
      });
    });
  }

  destaque: { inscritos: number[], views: number[], videos: number[] } = { inscritos: [], views: [], videos: [] };

  marcarComparacao() {
    const canaisValidos = this.canais.filter(c => c.info);
    if (canaisValidos.length < 2) return;
    let maxI = -Infinity, minI = Infinity;
    let maxV = -Infinity, minV = Infinity;
    let maxN = -Infinity, minN = Infinity;
    canaisValidos.forEach(c => {
      const i = +c.info.statistics.subscriberCount;
      const v = +c.info.statistics.viewCount;
      const n = +c.info.statistics.videoCount;
      if (i > maxI) maxI = i;
      if (i < minI) minI = i;
      if (v > maxV) maxV = v;
      if (v < minV) minV = v;
      if (n > maxN) maxN = n;
      if (n < minN) minN = n;
    });
    this.destaque = { inscritos: [], views: [], videos: [] };
    this.canais.forEach((c, idx) => {
      if (!c.info) return;
      const i = +c.info.statistics.subscriberCount;
      const v = +c.info.statistics.viewCount;
      const n = +c.info.statistics.videoCount;
      if (i === maxI && maxI !== minI) this.destaque.inscritos.push(idx);
      if (i === minI && maxI !== minI) this.destaque.inscritos.push(idx);
      if (v === maxV && maxV !== minV) this.destaque.views.push(idx);
      if (v === minV && maxV !== minV) this.destaque.views.push(idx);
      if (n === maxN && maxN !== minN) this.destaque.videos.push(idx);
      if (n === minN && maxN !== minN) this.destaque.videos.push(idx);
    });
  }

  getClasseDestaque(tipo: 'inscritos' | 'views' | 'videos', idx: number): string {
    if (this.destaque[tipo].length === 0) return '';
    const canaisValidos = this.canais.filter(c => c.info);
    if (canaisValidos.length < 2) return '';
    const valores = canaisValidos.map(c => {
      if (tipo === 'inscritos') return +c.info.statistics.subscriberCount;
      if (tipo === 'views') return +c.info.statistics.viewCount;
      return +c.info.statistics.videoCount;
    });
    const max = Math.max(...valores);
    const min = Math.min(...valores);
    const valor = this.canais[idx]?.info ?
      (tipo === 'inscritos' ? +this.canais[idx].info.statistics.subscriberCount :
      tipo === 'views' ? +this.canais[idx].info.statistics.viewCount :
      +this.canais[idx].info.statistics.videoCount) : null;
    if (valor === max && max !== min) return 'text-green-600 font-bold animate-pop-in';
    if (valor === min && max !== min) return 'text-red-600 font-bold animate-pop-in';
    return '';
  }

  pesquisarId() {
    this.idPesquisado = '';
    this.erroPesquisa = '';
    const url = this.urlPesquisa.trim();
    if (!url) {
      this.erroPesquisa = 'Informe a URL do canal.';
      return;
    }
    const channelMatch = url.match(/\/channel\/([a-zA-Z0-9_-]+)/);
    if (channelMatch) {
      this.idPesquisado = channelMatch[1];
      return;
    }
    const atMatch = url.match(/youtube\.com\/@([\w\d._-]+)/i);
    if (atMatch) {
      const handle = atMatch[1];
      this.youtube.getChannelIdByHandle(handle).subscribe((res: any) => {
        if (res.items && res.items.length > 0) {
          this.idPesquisado = res.items[0].snippet.channelId;
        } else {
          this.erroPesquisa = 'Canal não encontrado pelo handle.';
        }
      }, err => {
        this.erroPesquisa = 'Erro ao buscar pelo handle.';
      });
      return;
    }
    this.erroPesquisa = 'URL não reconhecida. Use a URL do canal com /channel/ID ou /@username.';
  }
} 