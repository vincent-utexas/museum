import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { BackendService } from '../backend/backend.service';
import { SpotifyTracklist, SpotifyTracklistItems } from '../../models/spotify-api-response.model';

@Injectable({
  providedIn: 'root'
})
export class SpotifyApiService {

  constructor( private backend: BackendService ) { }

  // todo fill out dummy variables
  generateDummyTracklist() : SpotifyTracklist & SpotifyTracklistItems {
    return {
      id: "",
      images: [],
      name: "No tracklist found",
      type: "playlist",
      uri: "",
      items: [], }
  }

  async getTracklist(identifier: string) : Promise<SpotifyTracklist> { 
    const response = await firstValueFrom(this.backend.getTracklist(identifier));

    if ('error' in response) {
      return this.generateDummyTracklist();
    }

    return response;
  }

  async getTracklistItems(identifier: string) : Promise<SpotifyTracklistItems> {
    const response = await firstValueFrom(this.backend.getTracklistItems(identifier));

    if ('error' in response) {
      return this.generateDummyTracklist();
    }

    return response;
  }

}
