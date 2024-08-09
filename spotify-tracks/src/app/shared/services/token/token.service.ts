import { Injectable } from '@angular/core';

import { StorageService } from '../storage/storage.service';
import { TokenRequest, TokenResponse } from '../../models/access-token-response.model';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  constructor( private storage: StorageService, ) { }

  async getAccessToken() : Promise<void> {
    const CLIENT_ID = "9fefcc5e5f3c49559723a850ee6db721";
    const REDIRECT_URI = "http://localhost:4200/redirect";

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code') as string;
    const codeVerifier = this.storage.consumeCodeVerifier();

    const params: TokenRequest = {
      client_id: CLIENT_ID,
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: REDIRECT_URI,
      code_verifier: codeVerifier,
    }

    const payload = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(params),
    }

    const body = await fetch('https://accounts.spotify.com/api/token', payload);
    const response: TokenResponse = await body.json();

    if ('error' in response) {
      this.storage.clear();
      //todo handle error redirect to home
    } else {
      this.storage.setAccessToken(response.access_token, response.expires_in);
      this.storage.setRefreshToken(response.refresh_token);
    }

  }

  refreshAsNeeded(): void {}

  private async refreshAccessToken(): Promise<void> {}
}
