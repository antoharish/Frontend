import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ActivitySelectorComponent } from '../activity-selector/activity-selector.component';
import { PaymentCardComponent } from '../payment-card/payment-card.component';

@Component({
  selector: 'app-itinerary',
  templateUrl: './itinerary.component.html',
  styleUrls: ['./itinerary.component.css'],
  imports: [CommonModule, ActivitySelectorComponent, PaymentCardComponent]
})
export class ItineraryComponent implements OnInit {
  packageId: number = 0;
  itinerary: any = null;
  days: any[] = [];
  selectedDay: number | undefined;
  totalPrice: number = 0; // Total price of the itinerary
  customizedActivities: any[] = []; // List of customized activities

  @ViewChild(ActivitySelectorComponent) activitySelector!: ActivitySelectorComponent;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.packageId = +params['packageId'];
      this.loadItinerary();
    });
  }

  // Load the itinerary for the selected package
  loadItinerary(): void {
    const requestBody = { userId: 1, packageId: this.packageId };
    this.http.post<any>('http://localhost:8080/itineraries', requestBody).subscribe(
      (response) => {
        this.itinerary = response;
        this.totalPrice = response.totalPrice; // Initialize total price
        this.generateDays();
        this.updateCustomizedActivities(); // Initialize customized activities
      },
      (error) => {
        console.error('Error loading itinerary:', error);
      }
    );
  }

  // Generate days for the itinerary based on the package duration
  generateDays(): void {
    const duration = this.itinerary?.travelPackage?.noOfDays || 0;
    const includedActivities = this.itinerary?.travelPackage?.activities || [];

    this.days = Array.from({ length: duration }, (_, i) => ({
      day: i + 1,
      hotel: i === 0 ? this.itinerary?.travelPackage?.includedHotels[0] || null : null,
      activities: []
    }));

    includedActivities.forEach((activity: any, index: number) => {
      const dayIndex = index % duration;
      this.days[dayIndex].activities.push(activity);
    });
  }

  // Open the activity selector for the selected day
  openActivitySelector(day: number): void {
    this.selectedDay = day;
    this.activitySelector.open();
  }

  // Add an activity to the itinerary
  addActivity(activity: any): void {
    if (this.selectedDay === undefined) return;

    const day = this.days.find(d => d.day === this.selectedDay);
    if (day) {
      day.activities.push(activity);
    }

    this.http.post<any>(`http://localhost:8080/itineraries/${this.itinerary.itinerary_id}/addActivity?activityId=${activity.activityId}`, {}).subscribe(
      (response) => {
        this.itinerary = response;
        this.totalPrice = response.totalPrice; // Update total price
        this.updateCustomizedActivities(); // Update customized activities
        console.log(`Activity added to Day ${this.selectedDay}:`, activity);
      },
      (error) => {
        console.error('Error adding activity:', error);
      }
    );
  }

  // Remove an activity from the itinerary
  removeActivity(activityId: number, dayNumber: number): void {
    const day = this.days.find(d => d.day === dayNumber);
    if (day) {
      day.activities = day.activities.filter((activity: { activityId: number }) => activity.activityId !== activityId);
    }

    this.http.delete<any>(`http://localhost:8080/itineraries/${this.itinerary.itinerary_id}/removeActivity?activityId=${activityId}`).subscribe(
      (response) => {
        this.itinerary = response;
        this.totalPrice = response.totalPrice; // Update total price
        this.updateCustomizedActivities(); // Update customized activities
        console.log(`Activity removed from Day ${dayNumber}:`, activityId);
      },
      (error) => {
        console.error('Error removing activity:', error);
      }
    );
  }

  // Update the list of customized activities
  updateCustomizedActivities(): void {
    this.customizedActivities = this.days.flatMap(day => day.activities);
  }

  // Proceed to payment
  proceedToPayment(): void {
    console.log('Proceeding to payment...');
    // Add payment logic here
  }
}
