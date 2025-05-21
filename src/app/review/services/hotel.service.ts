import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hotel } from '../models/hotel.model';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  // Adjust the baseUrl as needed (must match your backend endpoint)
  private baseUrl: string = 'http://localhost:8081/hotels';

  constructor(private http: HttpClient) {}

  getAllHotels(): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(this.baseUrl);
  }
}
