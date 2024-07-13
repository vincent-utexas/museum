import { Component } from '@angular/core';

import { PlayCardComponent } from './modules/play-card/play-card.component';

@Component({
  selector: 'app-play',
  standalone: true,
  imports: [PlayCardComponent],
  templateUrl: './play.component.html',
  styleUrl: './play.component.css'
})
export class PlayComponent {

}
