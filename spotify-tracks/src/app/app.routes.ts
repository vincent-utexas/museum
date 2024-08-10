import { Routes } from '@angular/router';
import { TracklistSelectComponent } from './modules/page-tracklist-select/tracklist-select.component';
import { AuthRedirectComponent } from './modules/page-auth-redirect/auth-redirect.component';
import { PlayComponent } from './modules/page-play/play.component';
import { NotFoundComponent } from './modules/page-not-found/not-found.component';
import { EndscreenComponent } from './modules/page-endscreen/endscreen.component';
import { UserAuthComponent } from './modules/page-user-auth/user-auth.component';

export const routes: Routes = [
    {path: '', redirectTo: '/redirect', pathMatch: 'full'},
    {path: 'auth', component: UserAuthComponent},
    {path: 'redirect', component: AuthRedirectComponent},
    {path: 'start', component: TracklistSelectComponent},
    {path: 'play', component: PlayComponent},
    {path: 'results', component: EndscreenComponent},
    // {path: '**', component: NotFoundComponent, title: '404 page'},
];
