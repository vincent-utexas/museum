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

  createGameParameters(mode: string, identifier: string): string {
    const parameters = new URLSearchParams({
      mode: mode,
      identifier: identifier, })
    
    return "?" + parameters.toString();
  }

  getGameParameters() {
    const parameters = new URLSearchParams(window.location.search);
    return {
      mode: parameters.get("mode"),
      identifier: parameters.get("identifier"),
    }
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
    }
  }

  clear() {
    localStorage.clear();
  }

  checkTokenExpiry() { // todo handle expiry and refresh, make changes to `app.component.ts`

  }

}
