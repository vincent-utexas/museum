import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Subject, Observable, take } from 'rxjs';

import { DataService } from '../data/data.service';
import { SpotifyTrack } from '../../models/spotify-api-response.model';
import { RecommendedTracksResponse } from '../../models/backend-response.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BackendService implements OnDestroy {

  private BASE_URL: string = environment.apiUrl;
  private destroy$ = new Subject<void>();

  constructor( private http: HttpClient, private dataService: DataService ) { }

  ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
  }
  
  getRecommendations(songId: string) : Observable<RecommendedTracksResponse> {
    const { userId } = this.dataService.getItems();
    const url = `${this.BASE_URL}/suggestions/${userId}/${songId}`;
    return this.http.get(url) as Observable<RecommendedTracksResponse>;
  }

  createUser(userId: string) : void {
    const url = `${this.BASE_URL}/users/${userId}`;
    this.http.post(url, { }).pipe(take(1)).subscribe();
  }

  // Handles artist creation, song creation, ranking creation
  addToDatabase(tracks: SpotifyTrack[]) : void {  
    const { userId } = this.dataService.getItems();
    this.createSongBatch(tracks);
    this.createRankingBatch(userId, tracks);
  }

  private createArtist(artistId: string, artistName: string) : void {
    const url = `${this.BASE_URL}/artists/${artistId}`;
    this.http.post(url, { artist_name: artistName }).pipe(take(1)).subscribe();
  }

  private createSong(track: SpotifyTrack) : void {
    const url = `${this.BASE_URL}/songs/${track.id}`;
    const body = {
      song_title: track.name,
      artist_id: track.artist_id,
      song_playlist_id: track.album_id,
      song_spotify_url: track.href,
      song_image_url: track.image_url,
      song_popularity: track.album_popularity,
      artist_name: track.artist_name
    }

    this.http.post(url, body).pipe(take(1)).subscribe();
  }

  private createSongBatch(tracks: SpotifyTrack[]) : void {
    const url = `${this.BASE_URL}/songs/batch/`;
    let ids = [];
    let items = [];
    for (const track of tracks) {
      ids.push(track.id);
      items.push({
        song_title: track.name,
        artist_id: track.artist_id,
        song_playlist_id: track.album_id,
        song_spotify_url: track.href,
        song_image_url: track.image_url,
        song_popularity: track.album_popularity,
        artist_name: track.artist_name
      });
    }
    const body = { ids: ids, items: items };
    this.http.post(url, body).pipe(take(1)).subscribe();
  }

  private createRankingBatch(userId: string, tracks: SpotifyTrack[]) : void {
    const url = `${this.BASE_URL}/ranking/batch/${userId}`;
    let items = [];
    for (let i = 0; i < tracks.length; i++) {
      items.push({
        song_id: tracks[i].id,
        percentile: Math.floor(100 * (i + 1) / tracks.length),
        rank_position: i,
        playlist_id: tracks[i].album_id
      })
    }

    const body = { items: items };
    this.http.put(url, body).pipe(take(1)).subscribe();
  }
}
