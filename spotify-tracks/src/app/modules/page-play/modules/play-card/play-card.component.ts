import { Component, Input, OnChanges, OnDestroy, output, SimpleChanges } from '@angular/core';
import { SpotifyTrack } from '../../../../shared/models/spotify-api-response.model';
import { GameService } from '../../../../shared/services/game/game.service';


@Component({
  selector: 'app-play-card',
  standalone: true,
  imports: [],
  templateUrl: './play-card.component.html',
  styleUrl: './play-card.component.css'
})
export class PlayCardComponent implements OnChanges, OnDestroy {
  onSelectTrack = output<number>();
  onHideTrack = output<number>();
  onTrackHover = output<number>(); // aesthetic test

  @Input({ required: true }) track!: SpotifyTrack;
  @Input({ required: true }) cardId!: number;
  imgSrc!: string;
  audio!: HTMLAudioElement | null;
  playing: boolean = false;
  title!: string;
  artist!: string;

  constructor(private gameService: GameService) {
    this.gameService.childBridge.subscribe((msg: number) => {
      if (msg != this.cardId) {
        this.muteAudio(); }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.playing) {
      this.muteAudio();
    }
    
    this.track = changes['track'].currentValue;
    this.imgSrc = this.track.album.images[0].url;
    this.audio = this.track.preview_url ? new Audio(this.track.preview_url) : null;
    this.title = this.track.name;
    this.artist = this.track.artists[0].name;

    if (this.title.length + this.artist.length >= 35) {
      this.title = this.title.slice(0, 21) + '...';
    }
  }

  ngOnDestroy(): void {
    this.gameService.childBridge.unsubscribe();
  }

  handleSelectTrack() : void {
    this.onSelectTrack.emit(this.cardId);
    this.muteAudio();
  }

  handlePlayAudio() : void {
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

    // notify other child component to mute
    this.gameService.childBridge.next(this.cardId);
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

  handleTrackHover() : void {
    this.onTrackHover.emit(this.cardId);
  }
}
