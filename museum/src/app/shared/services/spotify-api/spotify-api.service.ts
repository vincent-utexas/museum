import { Injectable } from '@angular/core';

import { DataService } from '../data/data.service';
import { SpotifyApiRequest, SpotifyTracklist, SpotifyTracklistResponse, SpotifyTracklistMetadata, SpotifyTracklistMetadataResponse, SpotifyRecommendations } from '../../models/spotify-api-response.model';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root'
})
export class SpotifyApiService {
  BASE_URL = "https://api.spotify.com/v1";

  constructor( private dataService: DataService, private tokenService: TokenService ) { }

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
    this.tokenService.refreshAsNeeded();

    const response = await fetch(this.BASE_URL + `/playlists/${identifier}`, payload);
    let body: SpotifyTracklistMetadataResponse = await response.json();

    if ('error' in body) {
      // todo handle playlist does not exist errors
    }

    return body as SpotifyTracklistMetadata;
  }

  async getTracklist(identifier: string): Promise<SpotifyTracklist> {
    const payload = this.getPayload();
    this.tokenService.refreshAsNeeded();

    const response = await fetch(this.BASE_URL + `/playlists/${identifier}/tracks`, payload);
    let body: SpotifyTracklistResponse = await response.json();

    if ('error' in body) {
      // todo handle playlist does not exist errors
    }

    return body as SpotifyTracklist;
  }

  async getAlbumMetadata(identifier: string): Promise<SpotifyTracklistMetadata> {
    const payload = this.getPayload();
    this.tokenService.refreshAsNeeded();

    const response = await fetch(this.BASE_URL + `/albums/${identifier}`, payload);
    let body: SpotifyTracklistMetadataResponse = await response.json();

    if ('error' in body) {
      // todo handle playlist does not exist errors
    }

    return body as SpotifyTracklistMetadata;
  }

  async getAlbum(identifier: string): Promise<SpotifyTracklist> {
    const payload = this.getPayload();
    this.tokenService.refreshAsNeeded();

    const response = await fetch(this.BASE_URL + `/albums/${identifier}/tracks`, payload);
    let body: SpotifyTracklistResponse = await response.json();

    if ('error' in body) {
      // todo handle playlist does not exist errors
    }

    return body as SpotifyTracklist;
  }

  async getUserId() : Promise<string> {
    const payload = this.getPayload();
    this.tokenService.refreshAsNeeded();

    const response = await fetch(this.BASE_URL + `/me`, payload);
    let body = await response.json();

    if ('error' in body) {
      // todo handle unknown error, reroute to error page
    }

    this.dataService.setUserId(body.id);
    return body.id;
  }

  async getRecommendations(seedArtists: string[], seedTracks: string[]): Promise<SpotifyRecommendations> {
    const payload = this.getPayload();
    this.tokenService.refreshAsNeeded();
    const artistQuery = seedArtists.join(",");
    const tracksQuery = seedTracks.join(",");
    
    const response = await fetch(this.BASE_URL + `/recommendations?seed_artists=${artistQuery}&seed_tracks=${tracksQuery}`, payload);
    const body: SpotifyRecommendations = await response.json();

    return body as SpotifyRecommendations;
  }

  private getPayload(): SpotifyApiRequest {
    const { access_token } = this.dataService.getItems();
    return {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${access_token}`,
      }
    }
  }

}
