import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private baseUrl: string = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  login(): Observable<any> {
    const url = `${this.baseUrl}/login`;
    return this.http.get(url);
  }
  
  getAccessToken(): Observable<any> {
    const params = new URLSearchParams(window.location.search);
    const url = `${this.baseUrl}/token?code=${params.get('code')}&state=${params.get('state')}`;
    return this.http.get(url);
  }

  refreshAccessToken(): Observable<any> {
    const url = `${this.baseUrl}/refresh`;
    return this.http.get(url);
  }
}
