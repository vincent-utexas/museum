import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';

import { IdentifierFormComponent } from './modules/identifier-form/identifier-form.component';
import { SpotifyApiService } from '../../shared/services/spotify-api/spotify-api.service';

@Component({
  selector: 'app-tracklist-select',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, IdentifierFormComponent],
  templateUrl: './tracklist-select.component.html',
  styleUrl: './tracklist-select.component.css',
})
export class TracklistSelectComponent {

  constructor (private spotifyApiService: SpotifyApiService ) { }
  

}
