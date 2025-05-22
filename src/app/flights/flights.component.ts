import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FlightService } from '../services/flight.service';
import { Flight } from '../models/flight.model';
import { FlightAvailability } from '../models/flightAvailability.model';


@Component({
    selector: 'app-flights',
    templateUrl: './flights.component.html',
    styleUrls: ['./flights.component.css'],
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule]
})
export class FlightsComponent implements OnInit {
    searchForm: FormGroup;
    allFlights: Flight[] = [];
    filteredFlights: FlightAvailability[] | null = null;

    constructor(private fb: FormBuilder, private flightService: FlightService) {
        this.searchForm = this.fb.group({
            from: [''],
            to: [''],
            departureDate: [''],
            travelers: ['1 Adult']
        });
    }

    ngOnInit(): void {
        this.flightService.getAllFlights().subscribe({
            next: (flights) => this.allFlights = flights,
            error: err => {
                this.allFlights = [];
                console.error(err);
            }
        });
    }

    onSearch(): void {
        const from = this.searchForm.value.from;
        const to = this.searchForm.value.to;
        const date = this.searchForm.value.departureDate;

        if (!from || !to || !date) {
            this.filteredFlights = null;
            return;
        }

        this.flightService.searchFlights(from, to, date).subscribe({
            next: (availabilities) => this.filteredFlights = availabilities,
            error: err => {
                this.filteredFlights = [];
                console.error(err);
            }
        });
    }
}
