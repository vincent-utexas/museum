import { Injectable } from '@angular/core';
import { SpotifyTracklist, SpotifyTrack } from '../../models/spotify-api-response.model';
import { StorageService } from '../storage/storage.service';

import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  childBridge: Subject<number> = new Subject<number>(); // let play card components communicate
  endBridge: SpotifyTrack[] = [];

  constructor( private storage: StorageService ) { }

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
      spotifyTracklist.items.map( spotifyTrack => ({
        ...spotifyTrack.track,
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
