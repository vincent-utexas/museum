import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

import { BackendService } from '../backend/backend.service';
import { StorageService } from '../storage/storage.service';
import { AccessTokenResponse } from '../../models/access-token-response.model';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  constructor(
    private backend: BackendService, 
    private storage: StorageService,
    private router: Router ) { }

  getAccessToken() : void {
    const response = firstValueFrom(this.backend.getAccessToken());
    response.then(
      (body: AccessTokenResponse) => {
        if ('error' in body) {
          this.storage.clear();
          this.router.navigate(['/error']); // todo make error page
        } else {
          this.storage.setAccessToken(body.access_token);
          this.storage.setRefreshToken(body.refresh_token);
          this.router.navigate(['/start']);
        }
      }
    );
  }
}
