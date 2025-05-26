import { Component } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-package-selector',
  standalone: true,
  imports: [CommonModule, FormsModule],
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

    this.http.get<any[]>('http://localhost:8080/packages/searchPackage', { params }).subscribe(
      (response) => {
        this.packages = response;
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
