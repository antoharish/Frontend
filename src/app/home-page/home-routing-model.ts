import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page.component';
import { HotelsComponent } from '../hotels/hotels.component';

export const homeroutes: Routes = [
  
  { path: 'Home',component: HomePageComponent },
<<<<<<< HEAD
  { path: '**', redirectTo: 'Home' },


=======
  
  { path: '**', redirectTo: 'Home' },



>>>>>>> 44e5a34 (add final)
];
