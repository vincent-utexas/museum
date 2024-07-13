import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { LoginResponse } from '../../models/login-response.model';
import { AccessTokenResponse, RefreshTokenResponse } from '../../models/access-token-response.model';
import { SpotifyTracklistItemsResponse, SpotifyTracklistResponse } from '../../models/spotify-api-response.model';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private baseUrl: string = 'http://localhost:3000';

  constructor( private http: HttpClient, private storage: StorageService ) { }

  login(): Observable<LoginResponse> {
    const url = `${this.baseUrl}/api/users/login`;

    return this.http.get(url) as Observable<LoginResponse>;
  }
  
  getAccessToken(): Observable<AccessTokenResponse> {
    const params = new URLSearchParams(window.location.search);
    const requestArgs = new URLSearchParams({
      code: params.get('code') as string,
      state: params.get('state') as string, });
    const url = `${this.baseUrl}/api/tokens/access?${requestArgs.toString()}`;

    return this.http.get(url) as Observable<AccessTokenResponse>;
  }

  refreshAccessToken(): Observable<RefreshTokenResponse> {
    const { refresh_token } = this.storage.getItems();
    const url = `${this.baseUrl}/api/tokens/refresh?${refresh_token}`;
  
    return this.http.get(url) as Observable<RefreshTokenResponse>;
  }

  getTracklist(): Observable<SpotifyTracklistResponse> {
    const { access_token, identifier } = this.storage.getItems()
    const requestArgs = new URLSearchParams({
      token: access_token,
      identifier: identifier, });
    const url = `${this.baseUrl}/api/fetch/tracklist?${requestArgs.toString()}`;

    return this.http.get(url) as Observable<SpotifyTracklistResponse>;
  }

  getTracklistItems(): Observable<SpotifyTracklistItemsResponse> {
    const { access_token, identifier } = this.storage.getItems();
    const requestArgs = new URLSearchParams({
      token: access_token,
      identifier: identifier, });
    const url = `${this.baseUrl}/api/fetch/tracklist_items?${requestArgs.toString()}`;
    
    return this.http.get(url) as Observable<SpotifyTracklistItemsResponse>;
  }
}
