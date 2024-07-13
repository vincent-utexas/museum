import { Routes } from '@angular/router';
import { TracklistSelectComponent } from './modules/page-tracklist-select/tracklist-select.component';
import { AuthRedirectComponent } from './modules/page-auth-redirect/auth-redirect.component';
import { PlayComponent } from './modules/page-play/play.component';

export const routes: Routes = [
    {path: 'redirect', component: AuthRedirectComponent, title: 'Redirects the user after auth'},
    {path: 'start', component: TracklistSelectComponent, title: 'User selects a tracklist'},
    {path: 'play', component: PlayComponent, title: 'Main gameplay page'},
    {path: '**'} // todo make 404 page
];
