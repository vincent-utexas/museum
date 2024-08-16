import { Injectable } from '@angular/core';

import { DataService } from '../data/data.service';
import { AuthRequest } from '../../models/login-response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor( private dataService: DataService ) { }

  async login(): Promise<void> {
    const CLIENT_ID = "9fefcc5e5f3c49559723a850ee6db721";
    const REDIRECT_URI = "http://localhost:4200/redirect";
    const SCOPE = "playlist-read-private playlist-read-collaborative user-library-read user-read-private user-read-email";

    const codeVerifier = this.generateRandomString(64);
    const hashed = await this.sha256(codeVerifier);
    const codeChallenge = this.base64encode(hashed);
    this.dataService.setCodeVerifer(codeVerifier);

    const params: AuthRequest = {
      response_type: 'code',
      client_id: CLIENT_ID,
      scope: SCOPE,
      code_challenge_method: 'S256',
      code_challenge: codeChallenge,
      redirect_uri: REDIRECT_URI,
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
