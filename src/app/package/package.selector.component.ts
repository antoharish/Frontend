import { Component } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-package-selector',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './package.selector.component.html',
  styleUrls: ['./package.selector.component.css']
})
export class PackageSelectorComponent {
  formData = { startDate: '', endDate: '', people: 1, location: '' };
  packages: any[] = [];
  isLoading = false;
  errorMessage = '';

  constructor(private http: HttpClient, private router: Router) {}

  fetchPackages() {
    const params = new HttpParams()
      .set('startDate', this.formData.startDate)
      .set('endDate', this.formData.endDate)
      .set('location', this.formData.location)
      .set('noOfPeople', this.formData.people.toString());
  
    this.isLoading = true; // Start loading
    this.errorMessage = ''; // Clear previous error messages
  
    this.http.get<any[]>('http://localhost:9070/packages/searchPackage', { params }).subscribe(
      (response) => {
        if (response.length > 0 && response[0].packagesCreated === 0) {
          // No packages created
          this.packages = [];
        } else {
          // Packages are available
          this.packages = response;
        }
        this.isLoading = false; // Stop loading
      },
      (error) => {
        console.error('Error fetching packages', error);
        this.errorMessage = "Failed to fetch Packages. Please try again.";
        this.isLoading = false; // Stop loading
      }
    );
  }

  bookNow(packageId: number): void {
    // Navigate to the itinerary page with the packageId as a route parameter
    console.log('Navigating to itinerary with packageId:', packageId);
    this.router.navigate(['/itinerary', packageId]);
  }
}
