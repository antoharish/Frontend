// src/app/app.routes.ts
// import { Routes } from '@angular/router';
// import { ReviewListComponent } from './review/components/review-list/review-list.component';

// export const routes: Routes = [
//   { path: '', redirectTo: 'reviews', pathMatch: 'full' },   
// //   { path: '', component: ReviewListComponent },
//   { path: '**', redirectTo: 'reviews' }
// ];
// import { Routes } from '@angular/router';
// import { reviewRoutes } from './review/review-routing.module';
// import { homeroutes } from './home-page/home-routing-model';
// import { HotelsComponent } from './hotels/hotels.component';
// import { hotelroutes } from './hotels/hotel-routing.model';

// export const routes: Routes = [
//   { path: 'reviews', redirectTo: 'reviews', pathMatch: 'full' },
//   ...reviewRoutes, // Spread the review routes here
//   { path: '**', redirectTo: 'Home' },
//   { path: 'Home', redirectTo: 'Home',pathMatch: 'full' },
//   ...homeroutes,
//   { path: 'hotels', component: HotelsComponent },
//   { path: 'hotels', redirectTo: 'hotels', pathMatch: 'full' },
//   ...hotelroutes
// ]; 
import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { ReviewListComponent } from './review/components/review-list/review-list.component';
import { ReviewFormComponent } from './review/components/review-form/review-form.component';
import { ReviewDetailComponent } from './review/components/review-detail/review-detail.component';
import { HotelsComponent } from './hotels/hotels.component';
import { LoginComponent } from './auth/auth/login/login.component';
import { SignupComponent } from './auth/auth/signup/signup.component';
import { AdminDashboardComponent } from './dashboards/admin-dashboard/admin-dashboard.component';
import { ManagerDashboardComponent } from './dashboards/manager-dashboard/manager-dashboard.component';
import { AgentDashboardComponent } from './dashboards/agent-dashboard/agent-dashboard.component';

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

    //auth routes
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
   
    //dashboards routes
    { path: 'admin-dashboard', component: AdminDashboardComponent},
    { path: 'manager-dashboard', component: ManagerDashboardComponent },
    { path: 'agent-dashboard', component: AgentDashboardComponent },
   
   

  // Wildcard: any unknown URL redirects to Home
  { path: '**', redirectTo: 'Home' }

];
