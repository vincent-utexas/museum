import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SpotifyTrack } from '../../models/spotify-api-response.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  cardParentBridge: Subject<SpotifyTrack[]> = new Subject<SpotifyTrack[]>();
  cardComponentBridge: Subject<number> = new Subject<number>(); // let play card components communicate

  constructor() { }

  setUserId(userId: string) {
    localStorage.setItem("user_id", userId);
  }

  setIdentifier(identifier: string) {
    localStorage.setItem("identifier", identifier);
  }

  setRankedTracks(tracks: SpotifyTrack[]) {
    localStorage.setItem("ranked_tracks", JSON.stringify(tracks));
  }

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
      "userId": localStorage.getItem("user_id") as string,
      "identifier": localStorage.getItem("identifier") as string,
    }
  }

  getRankedTracks() {
    const rankedTracks: SpotifyTrack[] = JSON.parse(localStorage.getItem("ranked_tracks") as string);
    return rankedTracks;
  }

  clear() {
    localStorage.clear();
  }
}
