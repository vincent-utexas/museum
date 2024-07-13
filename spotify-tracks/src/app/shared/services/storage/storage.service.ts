import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  setAccessToken(token: string) {
    localStorage.setItem("access_token", token);
  }

  setRefreshToken(token: string) {
    localStorage.setItem("refresh_token", token);
  }

  setIdentifier(identifier: string) {
    localStorage.setItem("identifier", identifier);
  }

  setMode(mode: string) {
    localStorage.setItem("mode", mode);
  }

  getTokens() {
    return {
      "access_token": localStorage.getItem("access_token") as string,
      "refresh_token": localStorage.getItem("refresh_token") as string,
    }
  }

  getItems() {
    return {
      "access_token": localStorage.getItem("access_token") as string,
      "refresh_token": localStorage.getItem("refresh_token") as string,
      "identifier": localStorage.getItem("identifier") as string,
    }
  }

  clear() {
    localStorage.clear();
  }

  checkTokenExpiry() { // todo handle expiry and refresh, make changes to `app.component.ts`

  }

}
