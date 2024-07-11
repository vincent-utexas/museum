import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserAuthComponent } from './modules/user-auth/user-auth.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UserAuthComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'spotify-tracks';
  userAuthenticated: boolean = localStorage.getItem('access_token') != '';
}
