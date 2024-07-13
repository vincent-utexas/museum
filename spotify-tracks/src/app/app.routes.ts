import { Routes } from '@angular/router';
import { TracklistSelectComponent } from './modules/page-tracklist-select/tracklist-select.component';
import { AuthRedirectComponent } from './modules/page-auth-redirect/auth-redirect.component';
import { PlayComponent } from './modules/page-play/play.component';
import { NotFoundComponent } from './modules/page-not-found/not-found.component';

export const routes: Routes = [
    {path: '', component: AuthRedirectComponent},
    {path: 'redirect', component: AuthRedirectComponent},
    {path: 'start', component: TracklistSelectComponent},
    {path: 'play', component: PlayComponent},
    // {path: '**', component: NotFoundComponent, title: '404 page'},
];
