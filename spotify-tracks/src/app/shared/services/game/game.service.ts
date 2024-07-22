import { Injectable } from '@angular/core';
import { SpotifyTracklistItems } from '../../models/spotify-api-response.model';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor( private storage: StorageService ) { }

  private rng(max: number) : number { // [0, max)
    return Math.floor(Math.random() * max);
  }

  getNextTracks(tracklist: SpotifyTracklistItems[]) : SpotifyTracklistItems[] {
    const n = tracklist.length;
    if (n <= 1) {
      return tracklist;
    }

    let idx1 = this.rng(n);
    let idx2 = this.rng(n);
    while (idx1 == idx2) {
      idx2 = this.rng(n);
    }

    return [tracklist[idx1], tracklist[idx2]];
  }


  
}
