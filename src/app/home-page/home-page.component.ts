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

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterModule,CommonModule,HotelsComponent],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  // imports: [HotelsComponent, FlightsComponent, PackagesComponent] // Add your components here if standalone
})
export class HomePageComponent {
  selectedSection: 'flights' | 'hotels' | 'packages' | null = null;

  showSection(section: 'flights' | 'hotels' | 'packages') {
    this.selectedSection = section;
  }
}