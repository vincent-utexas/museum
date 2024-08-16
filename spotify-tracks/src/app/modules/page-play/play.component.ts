import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PlayCardComponent } from './modules/play-card/play-card.component';
import { GameService } from '../../shared/services/game/game.service';
import { DataService } from '../../shared/services/data/data.service';
import { SpotifyApiService } from '../../shared/services/spotify-api/spotify-api.service';
import { SpotifyTrack, SpotifyTracklist } from '../../shared/models/spotify-api-response.model';

@Component({
  selector: 'app-play',
  standalone: true,
  imports: [PlayCardComponent],
  templateUrl: './play.component.html',
  styleUrl: './play.component.css'
})
export class PlayComponent implements OnInit {
  mode!: string;
  identifier!: string;
  kind!: "tracklist" | "album";
  tracksRemaining: number = Infinity;
  tracklist!: SpotifyTrack[];
  activeTracks!: SpotifyTrack[];
  rankedTracks: SpotifyTrack[] = []; // tracks in ranked order
  backgroundSrc: string | null = null;

  constructor (
    private gameService: GameService, 
    private dataService: DataService,
    private spotifyApiService: SpotifyApiService,
    private router: Router,
    private route: ActivatedRoute ) {}
  
  ngOnInit(): void {
    this.mode = this.route.snapshot.queryParamMap.get("mode") as string;
    this.identifier = this.route.snapshot.queryParamMap.get("identifier") as string;
    this.kind = this.route.snapshot.queryParamMap.get("kind") as "tracklist" | "album";

    const initState = (tempTracks: SpotifyTracklist) => {
      this.tracklist = this.gameService.gameifyTracks(tempTracks);
      this.tracksRemaining = this.tracklist.length - 1;
      this.activeTracks = this.gameService.getNextTracks(this.tracklist);
      this.dataService.cardParentBridge.next(this.activeTracks);
    }

    if (this.kind === "tracklist") {
      this.spotifyApiService.getTracklist(this.identifier).then(
        (tempTracks) => initState(tempTracks)
      );
    } else {
      this.spotifyApiService.getAlbum(this.identifier).then(
        (tempTracks) => initState(tempTracks)
      );
    }
  }

  handleSelectTrack(idx: number) {
    const other = idx === 0 ? 1 : 0;
    const otherIdx = this.tracklist.indexOf(this.activeTracks[other]);

    this.tracklist.splice(otherIdx, 1);
    this.rankedTracks.push(this.activeTracks[other]);

    this.activeTracks[idx].rank++;
    this.tracksRemaining = this.tracklist.length - 1;
    
    if (this.tracksRemaining >= 1) {
      this.activeTracks = this.gameService.getNextTracks(this.tracklist);
      this.dataService.cardParentBridge.next(this.activeTracks);
    } else {
      this.rankedTracks.push(this.activeTracks[idx]);
      this.dataService.setRankedTracks(this.rankedTracks);
      this.router.navigate(['/results']);
    }
  }

  updateBackground(idx: number) : void {
    this.backgroundSrc = `url(${this.activeTracks[idx].image_url})`;
  }

}
