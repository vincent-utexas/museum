import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { IdentifierFormComponent } from './modules/identifier-form/identifier-form.component';
import { SpotifyApiService } from '../../shared/services/spotify-api/spotify-api.service';
import { SpotifyTracklistMetadata } from '../../shared/models/spotify-api-response.model';
import { BackendService } from '../../shared/services/backend/backend.service';

@Component({
  selector: 'app-tracklist-select',
  standalone: true,
  imports: [IdentifierFormComponent],
  templateUrl: './tracklist-select.component.html',
  styleUrl: './tracklist-select.component.css',
})
export class TracklistSelectComponent implements OnInit {
  tracklist: SpotifyTracklistMetadata = this.spotifyApiService.generateDummyTracklist();
  tracklistImgSrc: string | undefined = "https://i.scdn.co/image/ab67706f00000002578bdd86d879c9a9b3c8a299";
  kind: "tracklist" | "album" | "" = "";


  constructor ( 
    private spotifyApiService: SpotifyApiService,
    private backendService: BackendService,
    private router: Router ) { }

  async ngOnInit(): Promise<void> {
      const userId = await this.spotifyApiService.getUserId(); // user is logged in
      this.backendService.createUser(userId);
  }

  async populateInterface(identifier: string) : Promise<void> {
    const extractID = () => {
      const regex = /https:\/\/open\.spotify\.com\/(album|playlist|track)\/([a-zA-Z0-9]{22})/;
      return identifier.match(regex)![2];
    }

    if (identifier.includes('album')) {
      this.tracklist = await this.spotifyApiService.getAlbumMetadata(extractID());
      this.kind = "album";
    } else if (identifier.includes('playlist')) {
      this.tracklist = await this.spotifyApiService.getTracklistMetadata(extractID());
      this.kind = "tracklist";
    }

    this.tracklistImgSrc = this.tracklist.images[0].url;
  }

  routeToRandom() : void {
    this.router.navigate(['/play'], { queryParams: { mode: "random", identifier: this.tracklist.id, kind: this.kind }});
  }

  routeToAll() : void {
    this.router.navigate(['/play'], { queryParams: { mode: "all", identifier: this.tracklist.id, kind: this.kind }});
  }

}
