import { Injectable } from '@angular/core';
import { BackendService } from '../backend/backend.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private backend: BackendService) { }

  getAccessToken() {
    this.backend.getAccessToken().subscribe(
      (response: any) => {
        localStorage.setItem('access_token', '123');
        localStorage.setItem('refresh_token', '456');
        console.log(response);
      }
    );
  }
}
