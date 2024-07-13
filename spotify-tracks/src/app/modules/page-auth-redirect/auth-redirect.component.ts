import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';

import { TokenService } from '../../shared/services/token/token.service';
import { StorageService } from '../../shared/services/storage/storage.service';

@Component({
  selector: 'app-auth-redirect',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <p>Redirecting...</p>
    <router-outlet />
  `,
  styleUrl: './auth-redirect.component.css'
})
export class AuthRedirectComponent implements OnInit {

  constructor ( 
    private tokenService: TokenService,
    private storage: StorageService,
    private router: Router ) { }

  ngOnInit(): void {
      this.tokenService.getAccessToken();
      if ('access_token' in this.storage.getItems()) {
        this.router.navigate(['/start']); // todo fix auth setting access token
      } else {
        this.router.navigate(['/error']); // todo make error page
      }
  }


}
