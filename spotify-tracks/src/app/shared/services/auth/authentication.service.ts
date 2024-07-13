import { Injectable } from '@angular/core';

import { BackendService } from '../backend/backend.service';
import { LoginResponse } from '../../models/login-response.model';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor( private backend: BackendService, private storage: StorageService ) { }

  login() : void {
    this.backend.login().subscribe(
      (response: LoginResponse) => {
        this.storage.setAccessToken("undefined");
        window.location.href = response['redirect'];
      },
    );
  }
}
