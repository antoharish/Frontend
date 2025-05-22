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
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HotelService } from '../services/hotel.service';
import { Hotel } from '../models/hotel.model';

import { CommonModule } from '@angular/common';
import { HotelAvailability } from '../models/hotelAvailability.model';

@Component({
    selector: 'app-hotels',
    templateUrl: './hotels.component.html',
    styleUrls: ['./hotels.component.css'],
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule]
})
export class HotelsComponent implements OnInit {
    searchForm: FormGroup;
    allHotels: Hotel[] = [];
    filteredHotels: HotelAvailability[] | null = null;

    constructor(private fb: FormBuilder, private hotelService: HotelService) {
        this.searchForm = this.fb.group({
            location: [''],
            checkIn: [''],
            checkOut: [''],
            guestsRooms: ['']
        });
    }

    ngOnInit(): void {
        this.hotelService.getAllHotels().subscribe({
            next: (hotels) => this.allHotels = hotels,
            error: err => {
                this.allHotels = [];
                console.error(err);
            }
        });
    }

    onSearch(): void {
        const location = this.searchForm.value.location;
        const checkIn = this.searchForm.value.checkIn;
        
        if (!location || !checkIn) {
            this.filteredHotels = null;
            return;
        }

        this.hotelService.getAvailableHotels(location, checkIn).subscribe({
            next: (availabilities) => this.filteredHotels = availabilities,
            error: err => {
                this.filteredHotels = [];
                console.error(err);
            }
        });
    }
}