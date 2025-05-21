import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Hotel } from '../review/models/hotel.model';
import { HotelService } from '../review/services/hotel.service';

@Component({
  selector: 'app-hotels',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css']
})
export class HotelsComponent implements OnInit {
  
  // Array to store all hotels fetched from the backend.
  hotels: Hotel[] = [];
  // Array to store filtered hotels according to search criteria.
  filteredHotels: Hotel[] = [];

  // The reactive search form.
  searchForm: FormGroup;

  constructor(
    private hotelService: HotelService,
    private fb: FormBuilder
  ) {
    // Initialize the form with an empty location.
    this.searchForm = this.fb.group({
      location: ['']
    });
  }
  
  ngOnInit(): void {
    this.loadHotels();
  }
  
  // Load all hotels from the backend.
  loadHotels(): void {
    this.hotelService.getAllHotels().subscribe({
      next: (data: Hotel[]) => {
        this.hotels = data;
        // Initially, show all hotels.
        this.filteredHotels = data;
      },
      error: (err) => console.error(err)
    });
  }
  
  // Called when the search form is submitted.
  onSearch(): void {
    const location = this.searchForm.get('location')?.value?.toLowerCase();
    if (location) {
      // Filter hotels based on location (case insensitive).
      this.filteredHotels = this.hotels.filter(
        hotel => hotel.location && hotel.location.toLowerCase().includes(location)
      );
    } else {
      // If no location is entered, reset the list to show all hotels.
      this.filteredHotels = this.hotels;
    }
  }
}
