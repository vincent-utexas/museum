import { Injectable } from '@angular/core';
import { BackendService } from '../backend/backend.service';
import { AccessTokenResponse } from '../../models/access-token-response.model';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private backend: BackendService) { }

  getAccessToken() {
    this.backend.getAccessToken().subscribe(
      (response: AccessTokenResponse) => {
        if ('error' in response) { // handle error

        } else { // sucess!!!!!

        }
      }
    );
  }
}
