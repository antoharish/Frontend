import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Review } from '../models/review.model';

@Injectable({
  providedIn: 'root'
})

export class ReviewService {
  private baseUrl: string = 'http://localhost:8081/api/review';

  constructor(private http: HttpClient) { }

  getReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(this.baseUrl);
  }

  getReviewById(id: number): Observable<Review> {
    return this.http.get<Review>(`${this.baseUrl}/${id}`);
  }

  getReviewsByHotelId(hotelId: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.baseUrl}/hotel/${hotelId}`);
  }

  getReviewsByUserId(userId: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.baseUrl}/user/${userId}`);
  }

  getReviewsWithRatingAbove(rating: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.baseUrl}/rating/above/${rating}`);
  }

  addReview(review: Review): Observable<Review> {
    return this.http.post<Review>(`${this.baseUrl}/user/postReview`, review);
  }

  updateReview(id: number, review: Review): Observable<Review> {
    return this.http.put<Review>(`${this.baseUrl}/user/update/${id}`, review);
  }

  deleteReview(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/user/delete/${id}`);
  }
}
