import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { BackendService } from '../backend/backend.service';
import { StorageService } from '../storage/storage.service';
import { TokenResponse } from '../../models/access-token-response.model';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  constructor( private backend: BackendService, private storage: StorageService, ) { }

  getAccessToken() : void {
    const response = firstValueFrom(this.backend.getAccessToken());
    response.then(
      (body: TokenResponse) => {
        if ('error' in body) {
          this.storage.clear();
        } else {
          this.storage.setAccessToken(body.access_token, body.expires_in);
          this.storage.setRefreshToken(body.refresh_token);
        }
      });
  }
  
  refreshAccessToken() : void {
    const response = firstValueFrom(this.backend.refreshAccessToken());
    response.then(
      (body: TokenResponse) => {
        if ('error' in body) {
          this.storage.clear();
          console.error("[error] refresh token request failed.");
        } else {
          this.storage.setAccessToken(body.access_token, body.expires_in);
          this.storage.setRefreshToken(body.refresh_token);
        }
      });
  }

  refreshAsNeeded() : void { // todo check if refresh token is invalid
    const expiry: number = parseInt(this.storage.getItems().expiry, 10);
    if (Date.now() >= expiry) {
      this.refreshAccessToken();
    }
  }

}
