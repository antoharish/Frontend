import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 

@Injectable({
  providedIn: 'root'
})
export class PackageService {
  errorMessage: string | undefined;
  isLoading: boolean | undefined;
  packages: any[] | undefined;
  formData: any;
  constructor(private http: HttpClient) {}

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
}