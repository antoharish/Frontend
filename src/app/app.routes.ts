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

  // Wildcard: any unknown URL redirects to Home
  { path: '**', redirectTo: 'Home' }
];
