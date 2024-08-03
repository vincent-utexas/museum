import { Injectable } from '@angular/core';
import { SpotifyTracklist, SpotifyTrack } from '../../models/spotify-api-response.model';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor( private storage: StorageService ) { }

  private rng(max: number) : number { // [0, max)
    return Math.floor(Math.random() * max);
  }

  getNextTracks(tracklist: SpotifyTracklist) : SpotifyTrack[] {
    const n = tracklist.items.length;

    let idx1 = this.rng(n);
    let idx2 = this.rng(n);
    while (idx1 == idx2) {
      idx2 = this.rng(n);
    }

    const track1: SpotifyTrack = {...tracklist.items[idx1].track, rank: 0};
    const track2: SpotifyTrack = {...tracklist.items[idx2].track, rank: 0};

    return [track1, track2];
  }


  
}
