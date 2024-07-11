import { Routes } from '@angular/router';
import { TracklistSelectComponent } from './modules/tracklist-select/tracklist-select.component';
import { AuthRedirectComponent } from './modules/auth-redirect/auth-redirect.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
    {path: 'redirect', component: AuthRedirectComponent},
    {path: 'start', component: TracklistSelectComponent},
];
