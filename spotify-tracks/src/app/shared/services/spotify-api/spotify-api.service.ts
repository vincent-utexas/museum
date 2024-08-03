import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { BackendService } from '../backend/backend.service';
import { SpotifyTracklist, SpotifyTracklistMetadata } from '../../models/spotify-api-response.model';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root'
})
export class SpotifyApiService {

  constructor( private backend: BackendService, private tokenService: TokenService ) { }

  // todo fill out dummy variables
  generateDummyTracklist() : SpotifyTracklistMetadata & SpotifyTracklist {
    return {
      id: "",
      images: [],
      name: "No tracklist found",
      type: "playlist",
      uri: "",
      items: [], }
  }

  //todo handle refresh token expiry (maybe 24 hrs)
  async getTracklist(identifier: string) : Promise<SpotifyTracklistMetadata> {
    this.tokenService.refreshAsNeeded();
    const response = await firstValueFrom(this.backend.getTracklist(identifier));

    if ('error' in response) {
      return this.generateDummyTracklist();
    }

    return response;
  }

  async getTracklistItems(identifier: string) : Promise<SpotifyTracklist> {
    this.tokenService.refreshAsNeeded();
    const response = await firstValueFrom(this.backend.getTracklistItems(identifier));

    if ('error' in response) {
      return this.generateDummyTracklist();
    }

    return response;
  }

}
