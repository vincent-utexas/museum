import { Injectable } from '@angular/core';
import { BackendService } from '../backend/backend.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private backend: BackendService) { }

  login() {
    this.backend.login().subscribe(
      (response: any) => {
        localStorage.setItem('access_token', '');
        window.location.href = response['redirect'];
      },
    );
  }
}
