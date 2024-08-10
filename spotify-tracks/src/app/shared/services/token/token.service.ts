import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { StorageService } from '../storage/storage.service';
import { AccessTokenRequest, RefreshTokenRequest, RequestPayload, TokenResponse } from '../../models/access-token-response.model';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  constructor( private storage: StorageService, private router: Router ) { }

  async getAccessToken() : Promise<void> {
    const _CLIENT_ID = "9fefcc5e5f3c49559723a850ee6db721";
    const _REDIRECT_URI = "http://localhost:4200/redirect";

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code') as string;
    const codeVerifier = this.storage.consumeCodeVerifier();

    const params: AccessTokenRequest = {
      client_id: _CLIENT_ID,
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: _REDIRECT_URI,
      code_verifier: codeVerifier,
    }

    const payload: RequestPayload = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(params),
    }

    this.makeTokenRequest(payload);

  }

  refreshAsNeeded(): void {
    //todo handle refresh token expiry, reroute to auth page
    const { expiry } = this.storage.getItems();
    if (Date.now() >= expiry) {
      
      const { refresh_token } = this.storage.getItems();
      if (!refresh_token) {
        alert('Looks like your session has expired. Please sign in again.');
        this.router.navigate(['/auth']);
      }
      
      this.refreshAccessToken();
    }
  }

  private refreshAccessToken(): void {
    const _CLIENT_ID = "9fefcc5e5f3c49559723a850ee6db721";
    const { refresh_token } = this.storage.getItems();

    const params: RefreshTokenRequest = {
      grant_type: 'refresh_token',
      refresh_token: refresh_token,
      client_id: _CLIENT_ID,
    }

    const payload: RequestPayload = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(params),
    }

    this.makeTokenRequest(payload);

  }

  private async makeTokenRequest(payload: RequestPayload): Promise<void> {

    const body = await fetch('https://accounts.spotify.com/api/token', payload);
    const response: TokenResponse = await body.json();

    if ('error' in response) {
      //todo handle error redirect to home
    } else {
      this.storage.setAccessToken(response.access_token, response.expires_in);
      this.storage.setRefreshToken(response.refresh_token);
    }  
  
  }
}
