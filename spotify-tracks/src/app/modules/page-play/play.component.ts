import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PlayCardComponent } from './modules/play-card/play-card.component';
import { GameService } from '../../shared/services/game/game.service';
import { SpotifyApiService } from '../../shared/services/spotify-api/spotify-api.service';
import { SpotifyTracklist, SpotifyTrack } from '../../shared/models/spotify-api-response.model';

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
  tracksRemaining: number = Infinity;
  tracklist!: SpotifyTracklist;
  activeTracks!: SpotifyTrack[];
  
  async ngOnInit(): Promise<void> {
    this.mode = this.route.snapshot.queryParamMap.get("mode") as string;
    this.identifier = this.route.snapshot.queryParamMap.get("identifier") as string;

    this.tracklist = (await (this.spotifyApiService.getTracklistItems(this.identifier)));
    this.tracksRemaining = this.tracklist.items.length;
    this.activeTracks = this.gameService.getNextTracks(this.tracklist);
  }

  constructor (
    private gameService: GameService, 
    private spotifyApiService: SpotifyApiService,
    private route: ActivatedRoute ) { }

  handleSelectTrack(idx: number) { 
    this.activeTracks = this.gameService.getNextTracks(this.tracklist);
  }

}
