import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [CommonModule], // <-- include CommonModule here
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent implements OnChanges {
  @Input() rating: number = 0;
  @Input() maxRating: number = 5;
  @Output() ratingChange: EventEmitter<number> = new EventEmitter<number>();

  stars: number[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    this.stars = Array.from({ length: this.maxRating }, (_, i) => i + 1);
  }

  setRating(value: number): void {
    this.rating = value;
    this.ratingChange.emit(this.rating);
  }

  onKeydown(event: KeyboardEvent, star: number): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.setRating(star);
    }
  }
}
