<<<<<<< HEAD
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
=======

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HotelService } from '../services/hotel.service';
import { Hotel } from '../models/hotel.model';
import { CommonModule } from '@angular/common';
import { HotelAvailability } from '../models/hotelAvailability.model';
import { ReviewService } from '../services/review.service';
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class HotelsComponent implements OnInit {
  searchForm: FormGroup;
  allHotels: Hotel[] = [];
  filteredHotels: HotelAvailability[] | null = null;
  isLoading = false;
  errorMessage = '';
  hotelRatings: { [hotelId: number]: number } = {}; // Store ratings for each hotel
  minDate: string;
  minCheckoutDate: string;
  constructor(
    private fb: FormBuilder,
    private hotelService: HotelService,
    private reviewService: ReviewService, // Inject ReviewService
    private router: Router
  ) {
    this.minDate = new Date().toISOString().split('T')[0];
    this.minCheckoutDate = this.minDate;
    this.searchForm = this.fb.group({
      location: [''],
      checkIn: [''],
      checkOut: [''],
      guestsRooms: ['']
    });

   
  }

  ngOnInit(): void {
    this.loadAllHotels();
  }

  onCheckInChange(): void {
    const checkInDate = this.searchForm.get('checkIn')?.value;
    if (checkInDate) {
      // Set minimum checkout date to the day after check-in
      const nextDay = new Date(checkInDate);
      nextDay.setDate(nextDay.getDate() + 1);
      this.minCheckoutDate = nextDay.toISOString().split('T')[0];
      
      // Reset checkout date if it's before new minimum
      const checkOutDate = this.searchForm.get('checkOut')?.value;
      if (checkOutDate && checkOutDate < this.minCheckoutDate) {
        this.searchForm.patchValue({ checkOut: '' });
      }
    }
  }

  private loadAllHotels(): void {
    this.isLoading = true;
    this.hotelService.getAllHotels().subscribe({
      next: (hotels) => {
        this.allHotels = hotels;
        this.loadHotelRatings(); // Fetch ratings for all hotels
        this.isLoading = false;
      },
      error: (err) => {
        this.allHotels = [];
        this.errorMessage = 'Failed to load hotels';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  private loadHotelRatings(): void {
    this.allHotels.forEach((hotel) => {
      this.reviewService.getReviewsByHotelId(hotel.hotelId).subscribe({
        next: (reviews) => {
          const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
          const averageRating = reviews.length > 0 ? totalRating / reviews.length : 0;
          this.hotelRatings[hotel.hotelId] = averageRating; // Store the average rating
        },
        error: (err) => {
          console.error(`Failed to load reviews for hotel ID ${hotel.hotelId}`, err);
          this.hotelRatings[hotel.hotelId] = 0; // Default to 0 if reviews fail to load
        }
      });
    });
  }

  onSearch(): void {
    const location = this.searchForm.value.location;
    const checkIn = this.searchForm.value.checkIn;
 
    if (!location || !checkIn) {
      this.filteredHotels = null;
      return;
    }
 
    this.isLoading = true;
    this.hotelService.getAvailableHotels(location, checkIn).subscribe({
      next: (availabilities) => {
        this.filteredHotels = availabilities;
        this.isLoading = false;
      },
      error: (err) => {
        this.filteredHotels = [];
        this.errorMessage = 'Failed to find available hotels';
        this.isLoading = false;
        console.error(err);
      }
    });
  }
  onBookNow(hotelId: number): void {
    const queryParams = {
      checkIn: this.searchForm.get('checkIn')?.value || '',
      checkOut: this.searchForm.get('checkOut')?.value || '',
      guestsRooms: this.searchForm.get('guestsRooms')?.value || '1|1'
    };

    this.router.navigate(['/hotel-booking', hotelId], {
      queryParams,
      queryParamsHandling: 'merge'
    });
  }

  getHotelRating(hotelId: number): number {
    return this.hotelRatings[hotelId] || 0; // Return the rating or 0 if not available
  }
  
}
>>>>>>> 44e5a34 (add final)
