import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { BackendService } from '../backend/backend.service';
import { SpotifyApiTracklistItemsResponse, SpotifyApiTracklistResponse } from '../../models/spotify-api-response.model';

@Injectable({
  providedIn: 'root'
})
export class SpotifyApiService {

  constructor( private backend: BackendService ) { }

  getTracklist() : Promise<SpotifyApiTracklistResponse> { // todo error checking and validation
    return firstValueFrom(this.backend.getTracklist());
  }

  getTracklistItems() : Promise<SpotifyApiTracklistItemsResponse> {
    return firstValueFrom(this.backend.getTracklistItems());
  }
}
