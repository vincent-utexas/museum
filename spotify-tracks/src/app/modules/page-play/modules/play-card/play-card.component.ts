import { Component, Input, OnInit, output } from '@angular/core';
import { SpotifyTracklistItems, TrackObject } from '../../../../shared/models/spotify-api-response.model';

@Component({
  selector: 'app-play-card',
  standalone: true,
  imports: [],
  templateUrl: './play-card.component.html',
  styleUrl: './play-card.component.css'
})
export class PlayCardComponent implements OnInit {
  @Input({ required: true }) track!: TrackObject;
  imgSrc!: string;
  title!: string;
  artist!: string;

  ngOnInit(): void {
    console.log(this.track.name);
    this.imgSrc = this.track.album.images[0].url;
    this.title = this.track.name;
    this.artist = this.track.artists[0].name;
  }

  handleSelectTrack() : void { }

  handlePlayAudio() : void { }

  handleMuteAudio() : void { }

  handleHideTrack() : void { }

}
