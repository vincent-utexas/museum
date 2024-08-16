import { Component, Input, OnDestroy, output, SimpleChanges } from '@angular/core';
import { takeUntil, Subject } from 'rxjs';

import { SpotifyTrack } from '../../../../shared/models/spotify-api-response.model';
import { DataService } from '../../../../shared/services/data/data.service';


@Component({
  selector: 'app-play-card',
  standalone: true,
  imports: [],
  templateUrl: './play-card.component.html',
  styleUrl: './play-card.component.css'
})
export class PlayCardComponent implements OnDestroy {
  onSelectTrack = output<number>();
  onHideTrack = output<number>();
  onTrackHover = output<number>(); // aesthetic test
  destroy$ = new Subject<void>();

  @Input({ required: true }) cardId!: number;
  imgSrc!: string;
  audio!: HTMLAudioElement | null;
  playing: boolean = false;
  title!: string;
  artist!: string;

  constructor(private dataService: DataService) {
    this.dataService.cardComponentBridge
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      (id: number) => {
        if (id != this.cardId) {
          this.muteAudio(); }
      }
    );

    this.dataService.cardParentBridge
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      (nextTrack: SpotifyTrack[]) => this.onChange(nextTrack[this.cardId])
    );
  }

  onChange(track: SpotifyTrack): void {
    if (this.playing) {
      this.muteAudio();
    }
    
    this.imgSrc = track.image_url;
    this.audio = track.preview_url ? new Audio(track.preview_url) : null;
    this.title = track.name;
    this.artist = track.artist_name;

    if (this.title.length + this.artist.length >= 35) {
      this.title = this.title.slice(0, 21) + '...';
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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
    this.dataService.cardComponentBridge.next(this.cardId);
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
