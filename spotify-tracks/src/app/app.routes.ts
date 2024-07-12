import { Routes } from '@angular/router';
import { TracklistSelectComponent } from './modules/page-tracklist-select/tracklist-select.component';
import { AuthRedirectComponent } from './modules/page-auth-redirect/auth-redirect.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
    {path: 'redirect', component: AuthRedirectComponent},
    {path: 'start', component: TracklistSelectComponent},
];
