import { Injectable } from '@angular/core';

import { BackendService } from '../backend/backend.service';
import { LoginResponse } from '../../models/login-response.model';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private backend: BackendService, private tokenService: TokenService) { }

  login() {
    this.backend.login().subscribe(
      (response: LoginResponse) => {
        this.tokenService.setDummy();
        window.location.href = response['redirect'];
      },
    );
  }
}
