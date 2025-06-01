<<<<<<< HEAD
// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { Router, RouterModule } from '@angular/router';
// import { HotelsComponent } from '../hotels/hotels.component';

// @Component({
//   selector: 'app-home-page',
//   standalone: true,
//   imports: [CommonModule, RouterModule, HotelsComponent],
//   templateUrl: './home-page.component.html',
//   styleUrls: ['./home-page.component.css']
// })
// export class HomePageComponent { 
// constructor(private router:Router) { }

// navigateToHotels() {
//   this.router.navigate(['/hotels']);  
// }
// }

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HotelsComponent } from '../hotels/hotels.component';
=======


import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { HotelsComponent } from '../hotels/hotels.component';
import { FlightsComponent } from '../flights/flights.component';

import { jwtDecode } from 'jwt-decode';
import { PackageSelectorComponent } from '../package/package.selector.component';
import { ProfileComponent } from '../profile/profile.component';
import { FooterComponent } from "../footer/footer.component";


interface DecodedToken {
  sub: string;
  role: string;
  exp: number;
}
>>>>>>> 44e5a34 (add final)

@Component({
  selector: 'app-home-page',
  standalone: true,
<<<<<<< HEAD
  imports: [RouterModule,CommonModule,HotelsComponent],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  // imports: [HotelsComponent, FlightsComponent, PackagesComponent] // Add your components here if standalone
})
export class HomePageComponent {
  selectedSection: 'flights' | 'hotels' | 'packages' | null = null;
=======
  imports: [RouterModule, CommonModule, HotelsComponent, FlightsComponent, PackageSelectorComponent, ProfileComponent, FooterComponent],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  selectedSection: 'flights' | 'hotels' | 'packages' | null = null;
  isLoggedIn = false;
  username = '';
  isProfilePopupVisible = false;
  constructor(private router:Router) {}


  ngOnInit() {
    // Check login status whenever component initializes
    
    this.checkLoginStatus();
  }
  toggleProfilePopup(): void {
    this.isProfilePopupVisible = !this.isProfilePopupVisible;
  }

  checkLoginStatus() {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode<DecodedToken>(token);
        if (decoded.exp * 1000 > Date.now()) {
          this.isLoggedIn = true;
          this.username = decoded.sub;
        } else {
          this.logout(); // Token expired
        }
      } catch {
        this.logout(); // Invalid token
      }
    }
  }
>>>>>>> 44e5a34 (add final)

  showSection(section: 'flights' | 'hotels' | 'packages') {
    this.selectedSection = section;
  }
<<<<<<< HEAD
=======

  goToProfile() {
    this.router.navigate(['/profile']);
  }

  logout() {
    localStorage.removeItem('token');
    this.isLoggedIn = false;
    this.username = '';
    window.location.reload(); // Refresh page to reset all states
  }
>>>>>>> 44e5a34 (add final)
}