import { Component, Input, OnChanges, output, SimpleChanges } from '@angular/core';
import { SpotifyTrack } from '../../../../shared/models/spotify-api-response.model';

@Component({
  selector: 'app-play-card',
  standalone: true,
  imports: [],
  templateUrl: './play-card.component.html',
  styleUrl: './play-card.component.css'
})
export class PlayCardComponent implements OnChanges {
  onSelectTrack = output<number>();
  onHideTrack = output<number>();

  @Input({ required: true }) track!: SpotifyTrack;
  @Input({ required: true }) cardId!: number;
  imgSrc!: string;
  audio!: HTMLAudioElement | null;
  playing: boolean = false;
  title!: string;
  artist!: string;

  ngOnChanges(changes: SimpleChanges): void { // ?? maybe move this to a service using rxjs Subject?
      if (this.playing) {
        this.muteAudio();
      }
      
      this.track = changes['track'].currentValue;
      this.imgSrc = this.track.album.images[0].url;
      this.audio = this.track.preview_url ? new Audio(this.track.preview_url) : null;
      this.title = this.track.name;
      this.artist = this.track.artists[0].name;
  }

  handleSelectTrack() : void {
    this.onSelectTrack.emit(this.cardId);
    this.muteAudio();
  }

  handlePlayAudio() : void {
    // todo alert user of no audio
    // todo maybe change display from play to stop
    if (this.audio === null) {
      alert('no audio found');
      return;
    }

    if (!this.playing) {
      this.audio.play();
      this.playing = true;
    } else {
      this.muteAudio();
    }
  }

  muteAudio() : void {
    if (this.audio) {
      this.audio.pause();
      this.playing = false;
    }
  }

  handleHideTrack() : void { 
    this.onHideTrack.emit(this.cardId);
    this.muteAudio();
  }

}
