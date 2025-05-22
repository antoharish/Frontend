import { Hotel } from "./hotel.model";

export interface HotelAvailability {
    id: number;
    date: string;
    capacity: number;
    hotel: Hotel;
  }