import { Injectable } from '@angular/core';
import { SpotifyTracklist, SpotifyTrack } from '../../models/spotify-api-response.model';
import { DataService } from '../data/data.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor( private data: DataService ) { }

  private rng(max: number) : number { // [0, max)
    return Math.floor(Math.random() * max);
  }

  /**
   * Convert the album or tracklist received by Spotify's API to
   * an object containing relevant data for the game.
   * @param spotifyTracklist 
   * @returns `SpotifyTrack[]` with `rank` attribute
   */
  gameifyTracks(spotifyTracklist: SpotifyTracklist) : SpotifyTrack[] {
    const gameifiedTracks: SpotifyTrack[] =
      spotifyTracklist.items.map( sp => ({
        name: sp.track.name,
        preview_url: sp.track.preview_url,
        artist_name: sp.track.artists[0].name,
        artist_id: sp.track.artists[0].id,
        album_name: sp.track.album.name,
        album_id: sp.track.album.id,
        album_popularity: sp.track.album.popularity,
        image_url: sp.track.album.images[0].url,
        spotify_url: sp.track.external_urls.spotify,
        href: sp.track.external_urls.spotify,
        id: sp.track.id,
        rank: 0
      })
    );

    return gameifiedTracks;
  }

  getNextTracks(tracklist: SpotifyTrack[]) : SpotifyTrack[] {
    const n = tracklist.length;

    let idx1 = this.rng(n);
    let idx2 = this.rng(n);
    while (idx1 == idx2) {
      idx2 = this.rng(n);
    }

    let track1: SpotifyTrack = tracklist[idx1];
    let track2: SpotifyTrack = tracklist[idx2];

    return [track1, track2];
  }
}
