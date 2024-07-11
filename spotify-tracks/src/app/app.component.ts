import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { UserAuthComponent } from './modules/user-auth/user-auth.component';
import { TokenService } from './shared/services/token/token.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UserAuthComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'spotify-tracks';
  userAuthenticated: boolean = false;

  constructor ( private tokenService: TokenService ) { }

  ngOnInit(): void {
      this.userAuthenticated = this.tokenService.hasAccessToken();

      //todo fix: authentication -> redirect -> start -> root page
      //todo should redirect to start with access token, currently shows empty page
  }
  

}
