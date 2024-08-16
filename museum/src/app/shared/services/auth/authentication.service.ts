import { Injectable } from '@angular/core';

import { DataService } from '../data/data.service';
import { AuthRequest } from '../../models/login-response.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private CLIENT_ID = process.env['CLIENT_ID'] || environment.CLIENT_ID;
  private REDIRECT_URI = process.env['REDIRECT_URI'] || environment.REDIRECT_URI;

  constructor( private dataService: DataService ) { }

  async login(): Promise<void> {
    const SCOPE = "playlist-read-private playlist-read-collaborative user-library-read user-read-private user-read-email";

    const codeVerifier = this.generateRandomString(64);
    const hashed = await this.sha256(codeVerifier);
    const codeChallenge = this.base64encode(hashed);
    this.dataService.setCodeVerifer(codeVerifier);

    const params: AuthRequest = {
      response_type: 'code',
      client_id: this.CLIENT_ID,
      scope: SCOPE,
      code_challenge_method: 'S256',
      code_challenge: codeChallenge,
      redirect_uri: this.REDIRECT_URI,
    }

    const authUrl = new URL("https://accounts.spotify.com/authorize");
    authUrl.search = new URLSearchParams(params).toString();
    window.location.href = authUrl.toString();
  }

  generateRandomString(length: number): string {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], "");
  }  

  async sha256(plain: string): Promise<ArrayBuffer> {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    return window.crypto.subtle.digest('SHA-256', data);
  }

  base64encode(input: ArrayBufferLike): string {
    return btoa(String.fromCharCode(...new Uint8Array(input)))
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  }
  
}
