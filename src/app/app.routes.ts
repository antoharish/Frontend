
import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { ReviewListComponent } from './review/components/review-list/review-list.component';
import { ReviewFormComponent } from './review/components/review-form/review-form.component';
import { ReviewDetailComponent } from './review/components/review-detail/review-detail.component';
import { HotelsComponent } from './hotels/hotels.component';
import { LoginComponent } from './auth/auth/login/login.component';
import { SignupComponent } from './auth/auth/signup/signup.component';
import { AdminDashboardComponent } from './dashboards/admin-dashboard/admin-dashboard.component';
import { AgentDashboardComponent } from './dashboards/agent-dashboard/agent-dashboard.component';
import { ManagerDashboardComponent } from './dashboards/manager-dashboard/dashboard/manager-dashboard.component';
import { ReviewByHotelComponent } from './review/components/review-by-hotel/review-by-hotel.component';
import { HotelBookingComponent } from './hotels/hotel-booking/hotel-booking.component';
import { PackageSelectorComponent } from './package/package.selector.component';
import { ItineraryComponent } from './itinerery/itinerary.component';

export const routes: Routes = [
  // When the URL is empty, redirect to Home
  { path: '', redirectTo: 'Home', pathMatch: 'full' },

  // Home route
  { path: 'Home', component: HomePageComponent },

  // Review routes
  { path: 'reviews', component: ReviewListComponent },
  { path: 'reviews/new', component: ReviewFormComponent },
  { path: 'reviews/:id', component: ReviewDetailComponent },
  { path: 'reviews/edit/:id', component: ReviewFormComponent },

  // Hotels route
  { path: 'hotels', component: HotelsComponent },
  { path: 'itinerary/:packageId', component: ItineraryComponent },
  {path:'packages',component:PackageSelectorComponent},

    //auth routes
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
   
    //dashboards routes
    { path: 'admin-dashboard', component: AdminDashboardComponent},
    { path: 'manager-dashboard', component: ManagerDashboardComponent },
    { path: 'agent-dashboard', component: AgentDashboardComponent },
   
    {
      path: 'hotels/:id/reviews',
      component: ReviewByHotelComponent
    },
    { path: 'hotel-booking/:id', component: HotelBookingComponent },

  // Wildcard: any unknown URL redirects to Home
  { path: '**', redirectTo: 'Home' }

];
