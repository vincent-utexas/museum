import { Component, numberAttribute, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PlayCardComponent } from './modules/play-card/play-card.component';
import { GameService } from '../../shared/services/game/game.service';
import { SpotifyApiService } from '../../shared/services/spotify-api/spotify-api.service';
import { SpotifyTrack } from '../../shared/models/spotify-api-response.model';

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

  constructor (
    private gameService: GameService, 
    private spotifyApiService: SpotifyApiService,
    private router: Router,
    private route: ActivatedRoute ) {}
  
  async ngOnInit(): Promise<void> {
    this.mode = this.route.snapshot.queryParamMap.get("mode") as string;
    this.identifier = this.route.snapshot.queryParamMap.get("identifier") as string;
    this.kind = this.route.snapshot.queryParamMap.get("kind") as "tracklist" | "album";

    if (this.kind === "tracklist") {
      this.tracklist = this.gameService.gameifyTracks(await this.spotifyApiService.getTracklist(this.identifier));
    } else {
      this.tracklist = this.gameService.gameifyTracks(await this.spotifyApiService.getAlbum(this.identifier));
    }

    this.tracksRemaining = this.tracklist.length;
    this.activeTracks = this.gameService.getNextTracks(this.tracklist);
  }

  handleSelectTrack(idx: number) {
    const other = idx === 0 ? 1 : 0;

    this.tracklist.push(this.activeTracks[idx]);
    this.rankedTracks.push(this.activeTracks[other]);

    this.activeTracks[idx].rank++;
    this.tracksRemaining = this.tracklist.length;
    
    if (this.tracksRemaining < 2) {
      this.rankedTracks.push(this.activeTracks[idx]);
      this.router.navigate(['/end']);
    } else {
      this.activeTracks = this.gameService.getNextTracks(this.tracklist);
    }
  }

}
