import { Component, OnInit } from '@angular/core';
import { TokenService } from '../services/token/token.service';

@Component({
  selector: 'app-auth-redirect',
  standalone: true,
  imports: [],
  templateUrl: './auth-redirect.component.html',
  styleUrl: './auth-redirect.component.css'
})
export class AuthRedirectComponent implements OnInit {

  constructor (private tokenService: TokenService) { }

  ngOnInit(): void {
      this.tokenService.getAccessToken();
  }

}
