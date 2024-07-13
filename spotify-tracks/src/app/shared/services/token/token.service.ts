import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { BackendService } from '../backend/backend.service';
import { StorageService } from '../storage/storage.service';
import { AccessTokenResponse, RefreshTokenResponse } from '../../models/access-token-response.model';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  constructor( private backend: BackendService, private storage: StorageService, ) { }

  getAccessToken() : void {
    const response = firstValueFrom(this.backend.getAccessToken());
    response.then(
      (body: AccessTokenResponse) => {
        if ('error' in body) {
          this.storage.clear();
        } else {
          this.storage.setAccessToken(body.access_token);
          this.storage.setRefreshToken(body.refresh_token);
        }
      });
  }
  
  refreshAccessToken() : void {
    const response = firstValueFrom(this.backend.refreshAccessToken());
    response.then(
      (body: RefreshTokenResponse) => {
        if ('error' in body) {
          this.storage.clear();
          console.error("[error] refresh token request failed.");
        } else {
          this.storage.setAccessToken(body.access_token);
          this.storage.setRefreshToken(body.refresh_token);
        }
      });
  }

}
