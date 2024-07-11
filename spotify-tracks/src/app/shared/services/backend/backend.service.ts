import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { LoginResponse } from '../../models/login-response.model';
import { AccessTokenResponse } from '../../models/access-token-response.model';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private baseUrl: string = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  login(): Observable<LoginResponse> {
    const url = `${this.baseUrl}/api/users/login`;
    return this.http.get(url) as Observable<LoginResponse>;
  }
  
  getAccessToken(): Observable<AccessTokenResponse> {
    const params = new URLSearchParams(window.location.search);
    const requestArgs = new URLSearchParams({
      code: params.get('code')!,
      state: params.get('state')!, });

    const url = `${this.baseUrl}/api/tokens/access?${requestArgs.toString()}`;
    return this.http.get(url) as Observable<AccessTokenResponse>;
  }

  refreshAccessToken(): Observable<any> {
    const url = `${this.baseUrl}/api/tokens/refresh?`;
    return this.http.get(url);
  }
}
