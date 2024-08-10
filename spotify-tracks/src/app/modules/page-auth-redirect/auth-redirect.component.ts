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
    <p (click)="reroute()">If you have not been redirected in 5 seconds, <u>click here</u></p>
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
    this.tokenService.getAccessToken().then(
      () => this.reroute()
    );
  }

  reroute(): void {
    if (this.storage.getItems().access_token !== null) {
      this.router.navigate(['/start']);
    } else {
      this.router.navigate(['/auth']);
    }
  }


}
