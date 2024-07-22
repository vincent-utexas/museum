import { Component, Input, output } from '@angular/core';
import { SpotifyTracklistItems } from '../../../../shared/models/spotify-api-response.model';

@Component({
  selector: 'app-play-card',
  standalone: true,
  imports: [],
  templateUrl: './play-card.component.html',
  styleUrl: './play-card.component.css'
})
export class PlayCardComponent {
  @Input() track: SpotifyTracklistItems | null = null;

  handleSelectTrack() : void { }

  handlePlayAudio() : void { }

  handleMuteAudio() : void { }

  handleHideTrack() : void { }

}
