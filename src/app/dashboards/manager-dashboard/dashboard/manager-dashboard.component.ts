import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AddHotelComponent } from '../add-hotel/add-hotel.component';

@Component({
  selector: 'app-manager-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, AddHotelComponent],
  templateUrl: './manager-dashboard.component.html',
  styleUrls: ['./manager-dashboard.component.css']
})
export class ManagerDashboardComponent {
  selectedSection: 'addHotel' | 'viewHotels' | 'manageBookings' | null = null;

  showSection(section: 'addHotel' | 'viewHotels' | 'manageBookings') {
    this.selectedSection = section;
  }
}