import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page.component';
import { HotelsComponent } from '../hotels/hotels.component';

export const homeroutes: Routes = [
  
  { path: 'Home',component: HomePageComponent },
  { path: '**', redirectTo: 'Home' },


];
