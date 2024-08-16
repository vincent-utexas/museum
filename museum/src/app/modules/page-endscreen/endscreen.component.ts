import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { ItemListComponent } from './modules/item-list/item-list.component';
import { SpotifyTrackLike } from '../../shared/models/spotify-api-response.model';

import { BackendService } from '../../shared/services/backend/backend.service';
import { DataService } from '../../shared/services/data/data.service';
import { SpotifyApiService } from '../../shared/services/spotify-api/spotify-api.service';

@Component({
  selector: 'app-endscreen',
  standalone: true,
  imports: [ItemListComponent],
  templateUrl: './endscreen.component.html',
  styleUrl: './endscreen.component.css'
})
export class EndscreenComponent implements OnInit, OnDestroy {
  rankedTracks: SpotifyTrackLike[] = [];
  recommendedTracks: SpotifyTrackLike[] = [];
  destroy$ = new Subject<void>();

  constructor(
    private dataService: DataService,
    private spotifyApiService: SpotifyApiService,
    private backendService: BackendService) {}

  ngOnInit(): void {
    const tracks = this.dataService.getRankedTracks().reverse();
    this.backendService.addToDatabase(tracks);

    this.rankedTracks = tracks.map<SpotifyTrackLike>(track => this.stripTrack(track));
    this.backendService.getRecommendations(this.rankedTracks[0].id)
    .pipe(takeUntil(this.destroy$))
    .subscribe(recs => this.recommendedTracks = recs.items);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  stripTrack(track: SpotifyTrackLike): SpotifyTrackLike {
    return {...track};
  }

  async getRecommendations() : Promise<void> {
    // sample the top 5 tracks and unique artists
    let seedArtists: string[] = [];
    let seedTracks: string[] = [];
    for (let i = 0; i < 4; i++) {
      seedTracks.push(this.rankedTracks[i].id);
    }

    const recommendations = await this.spotifyApiService.getRecommendations(seedArtists, seedTracks);
    for (const track of recommendations.tracks) {
      const temp: SpotifyTrackLike = {
        id: track.id,
        image_url: track.album.images[0].url,
        name: track.name,
        spotify_url: track.external_urls.spotify
      }

      this.recommendedTracks.push(temp);
    }

  }

}
