import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { TokenResponse } from '../../models/access-token-response.model';
import { SpotifyTracklistItemsResponse, SpotifyTracklistResponse } from '../../models/spotify-api-response.model';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private baseUrl: string = 'http://localhost:3000';

  constructor( private http: HttpClient, private storage: StorageService ) { }
  
  getAccessToken(): Observable<TokenResponse> {
    const params = new URLSearchParams(window.location.search);
    const requestArgs = new URLSearchParams({
      code: params.get('code') as string,
      state: params.get('state') as string, });
    const url = `${this.baseUrl}/api/tokens/access?${requestArgs.toString()}`;

    return this.http.get(url) as Observable<TokenResponse>;
  }

  refreshAccessToken(): Observable<TokenResponse> {
    const { refresh_token } = this.storage.getItems();
    const url = `${this.baseUrl}/api/tokens/refresh?${refresh_token}`;
  
    return this.http.get(url) as Observable<TokenResponse>;
  }

  getTracklist(identifier: string): Observable<SpotifyTracklistResponse> {
    const { access_token } = this.storage.getItems()
    const requestArgs = new URLSearchParams({
      token: access_token,
      identifier: identifier, });
    const url = `${this.baseUrl}/api/fetch/tracklist?${requestArgs.toString()}`;

    return this.http.get(url) as Observable<SpotifyTracklistResponse>;
  }

  getTracklistItems(identifier: string): Observable<SpotifyTracklistItemsResponse> {
    const { access_token } = this.storage.getItems();
    const requestArgs = new URLSearchParams({
      token: access_token,
      identifier: identifier, });
    const url = `${this.baseUrl}/api/fetch/tracklist_items?${requestArgs.toString()}`;
    
    return this.http.get(url) as Observable<SpotifyTracklistItemsResponse>;
  }
}
