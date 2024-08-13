import { Component, Input } from '@angular/core';
import { SpotifyTrack } from '../../../../shared/models/spotify-api-response.model';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.css'
})
export class ItemListComponent {
  @Input() tracks!: SpotifyTrack[];
}
