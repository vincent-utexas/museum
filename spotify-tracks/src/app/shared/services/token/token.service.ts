import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BackendService } from '../backend/backend.service';
import { AccessTokenResponse } from '../../models/access-token-response.model';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  constructor(private backend: BackendService, private router: Router) { }

  setDummy() : void {
    localStorage.setItem('access_token', 'undefined');
  }

  hasAccessToken() : boolean {
    const access_token: string | null = localStorage.getItem('access_token');
    return access_token != null && access_token != '';
  }

  getAccessToken() : void {
    this.backend.getAccessToken().subscribe(
      (response: AccessTokenResponse) => {
        if ('error' in response) {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          this.router.navigate(['/error']); //todo make error page
        } else {
          localStorage.setItem('access_token', response.access_token);
          localStorage.setItem('refresh_token', response.refresh_token);
          this.router.navigate(['/start']);
        }
      }
    );
  }
}
