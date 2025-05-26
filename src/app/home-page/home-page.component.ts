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

// import { CommonModule } from '@angular/common';
// import { Component } from '@angular/core';
// import { RouterModule } from '@angular/router';
// import { HotelsComponent } from '../hotels/hotels.component';
// import { FlightsComponent } from '../flights/flights.component';
// import { LoginComponent } from '../auth/auth/login/login.component';

// @Component({
//   selector: 'app-home-page',
//   standalone: true,
//   imports: [RouterModule,CommonModule,HotelsComponent,FlightsComponent],
//   templateUrl: './home-page.component.html',
//   styleUrls: ['./home-page.component.css'],
// // Add your components here if standalone
// })
// export class HomePageComponent {
//   selectedSection: 'flights' | 'hotels' | 'packages' | null = null;

//   showSection(section: 'flights' | 'hotels' | 'packages') {
//     this.selectedSection = section;
//   }
// }

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HotelsComponent } from '../hotels/hotels.component';
import { FlightsComponent } from '../flights/flights.component';
import { jwtDecode } from 'jwt-decode';
import { PackageSelectorComponent } from '../package/package.selector.component';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';


interface DecodedToken {
  sub: string;
  role: string;
  exp: number;
}

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterModule, CommonModule, HotelsComponent, FlightsComponent,PackageSelectorComponent,FormsModule,HttpClientModule],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  selectedSection: 'flights' | 'hotels' | 'packages' | null = null;
  showPackageComponent = false;
  isLoggedIn = false;
  username = '';

  ngOnInit() {
    // Check login status whenever component initializes
    this.checkLoginStatus();
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

  showSection(section: 'flights' | 'hotels' | 'packages') {
    this.selectedSection = section;
  }

  logout() {
    localStorage.removeItem('token');
    this.isLoggedIn = false;
    this.username = '';
    window.location.reload(); // Refresh page to reset all states
  }
}