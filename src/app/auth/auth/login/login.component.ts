// import { Component } from '@angular/core';
// import { RouterModule } from '@angular/router';

// @Component({
//   selector: 'app-login',
//   imports: [RouterModule],
//   templateUrl: './login.component.html',
//   styleUrl: './login.component.css'
// })
// export class LoginComponent {

// }
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { jwtDecode } from 'jwt-decode';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,RouterModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // <-- should be styleUrls (array)
})

export class LoginComponent {
  username = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    const credentials = { username: this.username, password: this.password };
    this.authService.login(credentials).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);

        // Decode token to get role
        const decoded: any = jwtDecode(res.token);
        const role = decoded.role || decoded.roles || decoded.authorities;

        // Redirect based on role
        if (role === 'ADMIN') {
          this.router.navigate(['/admin-dashboard']);
        } else if (role === 'HOTELMANAGER') {
          this.router.navigate(['/manager-dashboard']);
        } else if (role === 'TRAVELAGENT') {
          this.router.navigate(['/agent-dashboard']);
        } else if (role === 'USER') {
          this.router.navigate(['/Home']);
        } else {
          alert('Unknown role!');
        }
      },
      error: () => {
        alert('Login failed!');
      }
    });
  }
}