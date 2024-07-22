import { Component, OnInit } from '@angular/core';

import { PlayCardComponent } from './modules/play-card/play-card.component';
import { GameService } from '../../shared/services/game/game.service';
import { SpotifyApiService } from '../../shared/services/spotify-api/spotify-api.service';

@Component({
  selector: 'app-play',
  standalone: true,
  imports: [PlayCardComponent],
  templateUrl: './play.component.html',
  styleUrl: './play.component.css'
})
export class PlayComponent implements OnInit {
  tracksRemaining = 80085;

  constructor (
    private gameService: GameService, 
    private spotifyApiService: SpotifyApiService ) { }

  ngOnInit(): void {
      
  }

}
