// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { Hotel } from '../models/hotel.model';

// @Injectable({
//   providedIn: 'root'
// })

// export class HotelService {
//   private hotelsUrl = 'http://localhost:8081/hotels';
//   private availabilityUrl = 'http://localhost:8081/hotel-availability';

//   constructor(private http: HttpClient) {}

//   // Get all hotels
//   getAllHotels(): Observable<Hotel[]> {
//     return this.http.get<Hotel[]>(this.hotelsUrl);
//   }

//   // Get available hotels by location and date
//   getAvailableHotels(location: string, date: string): Observable<Hotel[]> {
//     return this.http.get<Hotel[]>(`${this.availabilityUrl}?location=${location}&date=${date}`);
//   }
// }
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hotel } from '../models/hotel.model';
import { HotelAvailability } from '../models/hotelAvailability.model';


@Injectable({
    providedIn: 'root'
})

export class HotelService {
    private baseUrl = 'http://localhost:8081';

    constructor(private http: HttpClient) {}

    getAllHotels(): Observable<Hotel[]> {
        return this.http.get<Hotel[]>(`${this.baseUrl}/hotels`);
    }

    getAvailableHotels(location: string, date: string): Observable<HotelAvailability[]> {
        return this.http.get<HotelAvailability[]>
        (`${this.baseUrl}/hotel-availability?location=${location}&date=${date}`);
    }
}