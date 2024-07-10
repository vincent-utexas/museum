import { Component } from '@angular/core';
import { AuthenticationService } from '../services/auth/authentication.service';

@Component({
  selector: 'app-user-auth',
  standalone: true,
  imports: [],
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css'
})
export class UserAuthComponent {

  constructor (private authService: AuthenticationService) { }

  login(): void {
    this.authService.login();
  }

}
