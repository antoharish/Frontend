import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Flight } from '../models/flight.model';
import { FlightAvailability } from '../models/flightAvailability.model';


@Injectable({
    providedIn: 'root'
})
export class FlightService {
    private baseUrl = 'http://localhost:8081';

    constructor(private http: HttpClient) { }

    getAllFlights(): Observable<Flight[]> {
        return this.http.get<Flight[]>(`${this.baseUrl}/flights`);
    }

    searchFlights(departureCity: string, destinationCity: string, date: string): Observable<FlightAvailability[]> {
        return this.http.get<FlightAvailability[]>(
            `${this.baseUrl}/api/searchByDate?source=${departureCity}&destination=${destinationCity}&date=${date}`
        );
    }
}