import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { UserAuthComponent } from './modules/page-user-auth/user-auth.component';
import { StorageService } from './shared/services/storage/storage.service';

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

  ngOnInit(): void {
      this.userAuthenticated = localStorage.getItem('access_token') != '';

      //todo fix: authentication -> redirect -> start -> root page
      //todo should redirect to start with access token, currently shows empty page
  }
  

}
