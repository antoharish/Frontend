// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
// import { HotelService } from '../services/hotel.service';
// import { Hotel } from '../models/hotel.model';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-hotels',
//   templateUrl: './hotels.component.html',
//   styleUrls: ['./hotels.component.css'],
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule]
// })
// export class HotelsComponent implements OnInit {
//   searchForm: FormGroup;
//   allHotels: Hotel[] = [];
//   filteredHotels: Hotel[] | null = null; // null means no search yet

//   constructor(private fb: FormBuilder, private hotelService: HotelService) {
//     this.searchForm = this.fb.group({
//       location: [''],
//       checkIn: [''],
//       checkOut: [''],      
//       guestsRooms: ['']    // <-- Add this if you use guestsRooms in the form
//     });
//   }

//   ngOnInit(): void {
//     this.hotelService.getAllHotels().subscribe({
//       next: (hotels) => this.allHotels = hotels,
//       error: err => {
//         this.allHotels = [];
//         console.error(err);
//       }
//     });
//   }

//   onSearch(): void {
//     const location = this.searchForm.value.location;
//     const checkIn = this.searchForm.value.checkIn;
//     this.hotelService.getAvailableHotels(location, checkIn).subscribe({
//       next: (hotels) => this.filteredHotels = hotels,
//       error: err => {
//         this.filteredHotels = [];
//         console.error(err);
//       }
//     });
//   }
// }
// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
// import { HotelService } from '../services/hotel.service';
// import { Hotel } from '../models/hotel.model';

// import { CommonModule } from '@angular/common';
// import { HotelAvailability } from '../models/hotelAvailability.model';
// import { Router } from '@angular/router';

// @Component({
//     selector: 'app-hotels',
//     templateUrl: './hotels.component.html',
//     styleUrls: ['./hotels.component.css'],
//     standalone: true,
//     imports: [CommonModule, ReactiveFormsModule]
// })
// export class HotelsComponent implements OnInit {
//     searchForm: FormGroup;
//     allHotels: Hotel[] = [];
//     filteredHotels: HotelAvailability[] | null = null;

//     constructor(private fb: FormBuilder, private hotelService: HotelService ,private router : Router) {
//         this.searchForm = this.fb.group({
//             location: [''],
//             checkIn: [''],
//             checkOut: [''],
//             guestsRooms: ['']
//         });
//     }

//     ngOnInit(): void {
//         this.hotelService.getAllHotels().subscribe({
//             next: (hotels) => this.allHotels = hotels,
//             error: err => {
//                 this.allHotels = [];
//                 console.error(err);
//             }
//         });
//     }

//     onSearch(): void {
//         const location = this.searchForm.value.location;
//         const checkIn = this.searchForm.value.checkIn;
        
//         if (!location || !checkIn) {
//             this.filteredHotels = null;
//             return;
//         }

//         this.hotelService.getAvailableHotels(location, checkIn).subscribe({
//             next: (availabilities) => this.filteredHotels = availabilities,
//             error: err => {
//                 this.filteredHotels = [];
//                 console.error(err);
//             }
//         });
        
        



//     }
// }
// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
// import { Router, RouterModule } from '@angular/router';
// import { HotelService } from '../services/hotel.service';
// import { Hotel } from '../models/hotel.model';
// import { CommonModule } from '@angular/common';
// import { HotelAvailability } from '../models/hotelAvailability.model';

// @Component({
//     selector: 'app-hotels',
//     templateUrl: './hotels.component.html',
//     styleUrls: ['./hotels.component.css'],
//     standalone: true,
//     imports: [CommonModule, ReactiveFormsModule, RouterModule]
// })
// export class HotelsComponent implements OnInit {
//     searchForm: FormGroup;
//     allHotels: Hotel[] = [];
//     filteredHotels: HotelAvailability[] | null = null;
//     isLoading = false;
//     errorMessage = '';

//     constructor(
//         private fb: FormBuilder, 
//         private hotelService: HotelService,
//         private router: Router
//     ) {
//         this.searchForm = this.fb.group({
//             location: [''],
//             checkIn: [''],
//             checkOut: [''],
//             guestsRooms: ['']
//         });
//     }

//     ngOnInit(): void {
//         this.loadAllHotels();
//     }

//     private loadAllHotels(): void {
//         this.isLoading = true;
//         this.hotelService.getAllHotels().subscribe({
//             next: (hotels) => {
//                 this.allHotels = hotels;
//                 this.isLoading = false;
//             },
//             error: err => {
//                 this.allHotels = [];
//                 this.errorMessage = 'Failed to load hotels';
//                 this.isLoading = false;
//                 console.error(err);
//             }
//         });
//     }

//     onSearch(): void {
//         const location = this.searchForm.value.location;
//         const checkIn = this.searchForm.value.checkIn;
        
//         if (!location || !checkIn) {
//             this.filteredHotels = null;
//             return;
//         }

//         this.isLoading = true;
//         this.hotelService.getAvailableHotels(location, checkIn).subscribe({
//             next: (availabilities) => {
//                 this.filteredHotels = availabilities;
//                 this.isLoading = false;
//             },
//             error: err => {
//                 this.filteredHotels = [];
//                 this.errorMessage = 'Failed to find available hotels';
//                 this.isLoading = false;
//                 console.error(err);
//             }
//         });
//     }

//     onBookNow(hotelId: number): void {
//         const queryParams = {
//             checkIn: this.searchForm.get('checkIn')?.value || '',
//             checkOut: this.searchForm.get('checkOut')?.value || '',
//             guestsRooms: this.searchForm.get('guestsRooms')?.value || '1|1'
//         };
    
//         this.router.navigate(['/hotel-booking', hotelId], {
//             queryParams,
//             queryParamsHandling: 'merge'
//         });
//     }
// }
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HotelService } from '../services/hotel.service';
import { Hotel } from '../models/hotel.model';
import { CommonModule } from '@angular/common';
import { HotelAvailability } from '../models/hotelAvailability.model';
import { ReviewService } from '../services/review.service';

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

  constructor(
    private fb: FormBuilder,
    private hotelService: HotelService,
    private reviewService: ReviewService, // Inject ReviewService
    private router: Router
  ) {
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