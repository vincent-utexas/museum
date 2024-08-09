import { Injectable } from '@angular/core';

import { StorageService } from '../storage/storage.service';
import { SpotifyApiRequest, SpotifyTracklist, SpotifyTracklistResponse, SpotifyTracklistMetadata, SpotifyTracklistMetadataResponse } from '../../models/spotify-api-response.model';

@Injectable({
  providedIn: 'root'
})
export class SpotifyApiService {
  BASE_URL = "https://api.spotify.com/v1";

  constructor( private storage: StorageService ) { }

  generateDummyTracklist(): SpotifyTracklistMetadata {
    return {
      id: '',
      images: [],
      name: 'No tracklist selected',
      uri: '',
    }
  }

  async getTracklistMetadata(identifier: string): Promise<SpotifyTracklistMetadata> {
    const payload = this.getPayload();

    const response = await fetch(this.BASE_URL + `/playlists/${identifier}`, payload);
    let body: SpotifyTracklistMetadataResponse = await response.json();

    if ('error' in body) {
      // todo handle playlist does not exist errors
    }

    return body as SpotifyTracklistMetadata;
  }

  async getTracklist(identifier: string): Promise<SpotifyTracklist> {
    const payload = this.getPayload();

    const response = await fetch(this.BASE_URL + `/playlists/${identifier}/tracks`, payload);
    let body: SpotifyTracklistResponse = await response.json();

    if ('error' in body) {
      // todo handle playlist does not exist errors
    }

    return body as SpotifyTracklist;
  }

  async getAlbumMetadata(identifier: string): Promise<SpotifyTracklistMetadata> {
    const payload = this.getPayload();

    const response = await fetch(this.BASE_URL + `/albums/${identifier}`, payload);
    let body: SpotifyTracklistMetadataResponse = await response.json();

    if ('error' in body) {
      // todo handle playlist does not exist errors
    }

    return body as SpotifyTracklistMetadata;
  }

  async getAlbum(identifier: string): Promise<SpotifyTracklist> {
    const payload = this.getPayload();

    const response = await fetch(this.BASE_URL + `/albums/${identifier}/tracks`, payload);
    let body: SpotifyTracklistResponse = await response.json();

    if ('error' in body) {
      // todo handle playlist does not exist errors
    }

    return body as SpotifyTracklist;
  }

  private getPayload(): SpotifyApiRequest {
    const { access_token } = this.storage.getItems();
    return {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${access_token}`,
      }
    }
  }

}
