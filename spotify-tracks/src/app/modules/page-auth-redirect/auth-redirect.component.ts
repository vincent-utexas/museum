import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { TokenService } from '../../shared/services/token/token.service';

@Component({
  selector: 'app-auth-redirect',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <p>Redirecting...</p>
    <router-outlet />
  `,
  styles: ``
})
export class AuthRedirectComponent {

  constructor (private tokenService: TokenService) { 
    this.tokenService.getAccessToken();
  }


}
