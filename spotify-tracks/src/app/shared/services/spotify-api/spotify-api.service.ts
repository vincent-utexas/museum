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
      id: null,
      images: [],
      name: "No tracklist found",
      type: "playlist",
      uri: null,
      items: null, }
  }

  async getTracklist() : Promise<SpotifyTracklist> { 
    const response = await firstValueFrom(this.backend.getTracklist());

    if ('error' in response) {
      return this.generateDummyTracklist();
    }

    return response;
  }

  async getTracklistItems() : Promise<SpotifyTracklistItems> {
    const response = await firstValueFrom(this.backend.getTracklistItems());

    if ('error' in response) {
      return this.generateDummyTracklist();
    }

    return response;
  }

}
