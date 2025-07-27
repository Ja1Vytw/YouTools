import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  private apiKey = 'AIzaSyC81MuS0QmPbU3AHLjZZd5Sd6B7D4zwPoc';

  constructor(private http: HttpClient) { }

  getChannelInfoById(channelId: string): Observable<any> {
    const url = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${this.apiKey}`;
    return this.http.get(url);
  }

  getChannelIdByUsername(username: string): Observable<any> {
    const url = `https://www.googleapis.com/youtube/v3/channels?part=id&forUsername=${username}&key=${this.apiKey}`;
    return this.http.get(url);
  }

  getChannelIdByHandle(handle: string): Observable<any> {
    // Busca pelo handle usando a API de search
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${handle}&key=${this.apiKey}`;
    return this.http.get(url);
  }
} 