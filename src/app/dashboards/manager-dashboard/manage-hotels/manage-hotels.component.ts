import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HotelService } from '../../../services/hotel.service';
import { Hotel } from '../../../models/hotel.model';
import { EditHotelComponent } from '../edit-hotel/edit-hotel.component';
import { DeleteHotelComponent } from '../delete-hotel/delete-hotel/delete-hotel.component';

@Component({
  selector: 'app-manage-hotels',
  standalone: true,
  imports: [CommonModule, EditHotelComponent,DeleteHotelComponent],
  templateUrl: './manage-hotels.component.html',
  styleUrls: ['./manage-hotels.component.css']
})
export class ManageHotelsComponent implements OnInit {
  hotels: Hotel[] = [];
  selectedHotel: Hotel | null = null;
  showEditModal = false;
  showDeleteModal = false;

  constructor(private hotelService: HotelService) {}

  ngOnInit(): void {
    this.loadHotels();
  }

  loadHotels(): void {
    this.hotelService.getAllHotels().subscribe({
      next: (hotels) => this.hotels = hotels,
      error: (error) => console.error('Error loading hotels:', error)
    });
  }

  onEditClick(hotel: Hotel): void {
    this.selectedHotel = hotel;
    this.showEditModal = true;
  }

  onDeleteClick(hotel: Hotel): void {
    this.selectedHotel = hotel;
    this.showDeleteModal = true;
  }

  onHotelUpdated(): void {
    this.loadHotels();
    this.showEditModal = false;
    this.selectedHotel = null;
  }

  onHotelDeleted(): void {
    this.loadHotels();
    this.showDeleteModal = false;
    this.selectedHotel = null;
  }
}