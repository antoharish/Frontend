import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-package-add',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule], // Import ReactiveFormsModule for reactive forms
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddPackageComponent {
  packageForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    // Initialize the form with FormBuilder
    this.packageForm = this.fb.group({
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(1)]],
      noOfDays: [0, [Validators.required, Validators.min(1)]],
      noOfPeople: [0, [Validators.required, Validators.min(1)]],
      location: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
  }

  addPackage() {
    if (this.packageForm.valid) {
      this.http.post('http://localhost:9070/packages/createPackages', this.packageForm.value).subscribe({
        next: () => {
          alert('Package added successfully!');
          this.packageForm.reset(); // Reset the form after successful submission
        },
        error: (error) => {
          console.error('Error adding package:', error);
          alert('Failed to add package.');
        }
      });
    } else {
      alert('Please fill out all required fields.');
    }
  }
}