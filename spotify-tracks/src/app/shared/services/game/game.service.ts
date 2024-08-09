import { Injectable } from '@angular/core';
import { SpotifyTracklist, SpotifyTrack } from '../../models/spotify-api-response.model';
import { StorageService } from '../storage/storage.service';

import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  childBridge: Subject<number> = new Subject<number>(); // let play card components communicate

  constructor( private storage: StorageService ) { }

  private rng(max: number) : number { // [0, max)
    return Math.floor(Math.random() * max);
  }

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

    tracklist.splice(idx1, 1);
    tracklist.splice(idx2 - 1, 1);

    return [track1, track2];
  }
}
