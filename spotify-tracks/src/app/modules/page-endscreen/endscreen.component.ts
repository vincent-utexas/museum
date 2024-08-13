import { Component, OnInit } from '@angular/core';
import { ItemListComponent } from './modules/item-list/item-list.component';
import { GameService } from '../../shared/services/game/game.service';
import { SpotifyTrack } from '../../shared/models/spotify-api-response.model';

@Component({
  selector: 'app-endscreen',
  standalone: true,
  imports: [ItemListComponent],
  templateUrl: './endscreen.component.html',
  styleUrl: './endscreen.component.css'
})
export class EndscreenComponent implements OnInit {
  rankedTracks: SpotifyTrack[] = [];

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.rankedTracks = this.gameService.endBridge;
  }

}
