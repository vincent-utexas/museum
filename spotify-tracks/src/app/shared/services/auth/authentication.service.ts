import { Injectable } from '@angular/core';
import { BackendService } from '../backend/backend.service';
import { LoginResponse } from '../../models/login-response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private backend: BackendService) { }

  login() {
    this.backend.login().subscribe(
      (response: LoginResponse) => {
        localStorage.setItem('access_token', '');
        window.location.href = response['redirect'];
      },
    );
  }
}
