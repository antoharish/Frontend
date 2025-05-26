import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PaymentResponse } from '../models/paymentResponse.model'; // Adjust the import path as necessary

@Injectable({
    providedIn: 'root'
})
export class PaymentService {
    private baseUrl = 'http://localhost:8081/api/payments'; // Base URL for the payment API

    constructor(private http: HttpClient) {}
    bookHotel(
        userId: number,
        email: string,
        hotelId: number,
        bookingDate: string,
        quantity: number
    ): Observable<PaymentResponse> {
        const params = { userId, email, hotelId, bookingDate, quantity };
        return this.http.post<PaymentResponse>(`${this.baseUrl}/hotels`, null, { params })
            .pipe(catchError(this.handleError));
    }

    private handleError(error: HttpErrorResponse): Observable<never> {
        let errorMessage = 'An error occurred';
        if (error.error instanceof ErrorEvent) {
            // Client-side error
            errorMessage = `Error: ${error.error.message}`;
        } else {
            // Server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.error?.message || error.message}`;
        }
        console.error(errorMessage);
        return throwError(() => new Error(errorMessage));
    }
}