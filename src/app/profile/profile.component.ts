import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userEmail: string | null = '';
  userRole: string | null = '';
  userId: number | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.userRole = this.authService.getCurrentUserRole();
    this.userId = this.authService.getCurrentUserId();

    if (this.userId) {
      this.authService.getUserById(this.userId).subscribe({
        next: (user) => {
          console.log('User API response:', user);
          this.userEmail = user?.email || user?.userEmail || user?.mail || 'Not available';
        },
        error: (err) => {
          console.error('User fetch error:', err);
          this.userEmail = 'Not available';
        }
      });
    }
  }
}