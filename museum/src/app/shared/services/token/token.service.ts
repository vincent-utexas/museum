import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from '../../../../environments/environment';
import { DataService } from '../data/data.service';
import { AccessTokenRequest, RefreshTokenRequest, RequestPayload, TokenResponse } from '../../models/access-token-response.model';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private CLIENT_ID = process.env['CLIENT_ID'] || environment.CLIENT_ID;
  private REDIRECT_URI = process.env['REDIRECT_URI'] || environment.REDIRECT_URI;

  constructor( private dataService: DataService, private router: Router ) { }

  async getAccessToken() : Promise<string> {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code') as string;
    const codeVerifier = this.dataService.consumeCodeVerifier();

    const params: AccessTokenRequest = {
      client_id: this.CLIENT_ID,
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: this.REDIRECT_URI,
      code_verifier: codeVerifier,
    }

    const payload: RequestPayload = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(params),
    }

    await this.makeTokenRequest(payload);
    return this.dataService.getItems().access_token;
  }

  refreshAsNeeded(): void {
    //todo handle refresh token expiry, reroute to auth page
    const { expiry } = this.dataService.getItems();
    if (Date.now() >= expiry) {
      
      const { refresh_token } = this.dataService.getItems();
      if (!refresh_token) {
        alert('Looks like your session has expired. Please sign in again.');
        this.router.navigate(['/auth']);
      }
      
      this.refreshAccessToken();
    }
  }

  private refreshAccessToken(): void {
    const { refresh_token } = this.dataService.getItems();

    const params: RefreshTokenRequest = {
      grant_type: 'refresh_token',
      refresh_token: refresh_token,
      client_id: this.CLIENT_ID,
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
      // todo reroute to error
    } else {
      this.dataService.setAccessToken(response.access_token, response.expires_in);
      this.dataService.setRefreshToken(response.refresh_token);
    }
  }
  
}
