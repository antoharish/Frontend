import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PackageService {
  constructor(private http: HttpClient) {}

  getPackages(startDate: string, endDate: string, location: string, people: number): Observable<any[]> {
    const params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate)
      .set('location', location)
      .set('noOfPeople', people.toString());

    return this.http.get<any[]>('http://localhost:8080/packages/searchPackage', { params });
  }
}