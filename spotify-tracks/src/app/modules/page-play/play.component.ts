import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PlayCardComponent } from './modules/play-card/play-card.component';
import { GameService } from '../../shared/services/game/game.service';
import { SpotifyApiService } from '../../shared/services/spotify-api/spotify-api.service';
import { PlaylistTrackObject, TrackObject } from '../../shared/models/spotify-api-response.model';

@Component({
  selector: 'app-play',
  standalone: true,
  imports: [PlayCardComponent],
  templateUrl: './play.component.html',
  styleUrl: './play.component.css'
})
export class PlayComponent implements OnInit {
  @Input() mode!: string;
  @Input() identifier!: string;
  tracksRemaining = 80085;
  tracklistItems!: PlaylistTrackObject[];
  track1!: TrackObject;
  track2!: TrackObject;
  
  async ngOnInit(): Promise<void> {
      this.mode = this.route.snapshot.queryParamMap.get("mode") as string;
      this.identifier = this.route.snapshot.queryParamMap.get("identifier") as string;
      this.tracklistItems = (await this.spotifyApiService.getTracklistItems(this.identifier)).items;

      this.track1 = this.tracklistItems[0].track;
      this.track2 = this.tracklistItems[1].track;
  }

  constructor (
    private gameService: GameService, 
    private spotifyApiService: SpotifyApiService,
    private route: ActivatedRoute ) { }


}
