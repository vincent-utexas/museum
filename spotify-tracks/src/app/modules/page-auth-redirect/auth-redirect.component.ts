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
  styles: ``
})
export class AuthRedirectComponent implements OnInit {

  constructor ( 
    private tokenService: TokenService,
    private storage: StorageService,
    private router: Router ) { }

  ngOnInit(): void {
      this.tokenService.getAccessToken();
      if (this.storage.getItems().access_token !== "") {
        this.router.navigate(['/start']);
      } else {
        this.router.navigate(['/auth']);
      }
  }


}
