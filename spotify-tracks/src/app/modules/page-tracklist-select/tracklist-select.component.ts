import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { IdentifierFormComponent } from './modules/identifier-form/identifier-form.component';
import { SpotifyApiService } from '../../shared/services/spotify-api/spotify-api.service';
import { SpotifyTracklistMetadata } from '../../shared/models/spotify-api-response.model';

@Component({
  selector: 'app-tracklist-select',
  standalone: true,
  imports: [IdentifierFormComponent],
  templateUrl: './tracklist-select.component.html',
  styleUrl: './tracklist-select.component.css',
})
export class TracklistSelectComponent {
  tracklist: SpotifyTracklistMetadata = this.spotifyApiService.generateDummyTracklist();
  tracklistImgSrc: string | undefined = "https://i.scdn.co/image/ab67706f00000002578bdd86d879c9a9b3c8a299";


  constructor ( 
    private spotifyApiService: SpotifyApiService,
    private router: Router ) { }

  async populateInterface(identifier: string) : Promise<void> { 
    // todo need error handling logic
    // todo prefer: frontend should receive perfect info or an error not dummy info

    this.tracklist = await this.spotifyApiService.getTracklist(identifier);
    this.tracklistImgSrc = this.tracklist.images[0].url;
  }

  routeToRandom() : void {
    this.router.navigate(['/play'], { queryParams: { mode: "random", identifier: this.tracklist.id }});
  }

  routeToAll() : void {
    this.router.navigate(['/play'], { queryParams: { mode: "all", identifier: this.tracklist.id }});
  }

}
