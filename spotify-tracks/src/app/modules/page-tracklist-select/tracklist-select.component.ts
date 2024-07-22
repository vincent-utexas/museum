import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { IdentifierFormComponent } from './modules/identifier-form/identifier-form.component';
import { SpotifyApiService } from '../../shared/services/spotify-api/spotify-api.service';
import { StorageService } from '../../shared/services/storage/storage.service';
import { SpotifyTracklist } from '../../shared/models/spotify-api-response.model';

@Component({
  selector: 'app-tracklist-select',
  standalone: true,
  imports: [IdentifierFormComponent],
  templateUrl: './tracklist-select.component.html',
  styleUrl: './tracklist-select.component.css',
})
export class TracklistSelectComponent {
  tracklistImgSrc: string | undefined = "https://i.scdn.co/image/ab67706f00000002578bdd86d879c9a9b3c8a299";
  tracklist: SpotifyTracklist = this.spotifyApiService.generateDummyTracklist();

  constructor ( 
    private spotifyApiService: SpotifyApiService,
    private storage: StorageService,
    private router: Router ) { }

  async populateInterface(identifier: string) : Promise<void> {
    this.tracklist = await this.spotifyApiService.getTracklist();
    console.log(this.tracklist.images);
    this.tracklistImgSrc = this.tracklist.images[0].url;
  }

  routeToRandom() : void {
    this.router.navigate(['/play' + this.storage.createGameParameters("random", this.tracklist.id!)]);
  }

  routeToAll() : void {
    this.router.navigate(['/play' + this.storage.createGameParameters("all", this.tracklist.id!)]);
  }

}
