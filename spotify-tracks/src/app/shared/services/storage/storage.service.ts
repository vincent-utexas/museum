import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  setAccessToken(token: string, expiresInSecs: number = 3600) {
    const expiry: number = Date.now() + (expiresInSecs * 1000);
    localStorage.setItem("access_token", token);
    localStorage.setItem("expiry", expiry.toString());
  }

  setRefreshToken(token: string) {
    localStorage.setItem("refresh_token", token);
  }

  setCodeVerifer(token: string) {
    localStorage.setItem("code_verifier", token);
  }

  consumeCodeVerifier(): string {
    const token = localStorage.getItem("code_verifier")!;
    localStorage.removeItem("code_verifier");
    return token;
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
      "expiry": Number(localStorage.getItem("expiry")) as number,
    }
  }

  clear() {
    localStorage.clear();
  }
}
