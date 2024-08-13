import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private baseUrl: string = 'http://127.0.0.1:8000';

  constructor( private http: HttpClient, private storage: StorageService ) { }
  
  getSuggestionsTEST() : Observable<any> {
    const params = new HttpParams().set('user_id', '12345').set('ranking', JSON.stringify([1,2,3,4]));

    const url = `${this.baseUrl}/suggested`;
    return this.http.get(url, { params }) as Observable<any>;
  }

}
