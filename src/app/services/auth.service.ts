import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8081/api';

  constructor(private http: HttpClient) {}

  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }

  registerAgent(agent: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register/tm`, agent, this.getAuthHeaders());
  }

  registerManager(manager: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register/hm`, manager, this.getAuthHeaders());
  }

  registerUser(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  // login(credentials: any): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/login`, credentials);
  // }
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
        }
      })
    );
  }
  // getCurrentUserId(): number | null {
  //   const token = localStorage.getItem('token');
  //   if (!token) return null;
    
  //   try {
  //     const decoded = jwtDecode<{ userId: number }>(token);
  //     return decoded.userId || null;
  //   } catch {
  //     return null;
  //   }
  // }
  // getCurrentUserId(): number | null {
  //   const token = localStorage.getItem('token');
  //   if (!token) return null;
  
  //   try {
  //     const decoded = jwtDecode<{ userId: number; exp: number }>(token);
  //     const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
  //     if (decoded.exp > currentTime) {
  //       return decoded.userId || null;
  //     } else {
  //       // Token is expired
  //       localStorage.removeItem('token'); // Optionally clear the expired token
  //       return null;
  //     }
  //   } catch {
  //     return null;
  //   }
  // }
  // getCurrentUserId(): number | null {
  //   const token = localStorage.getItem('token');
  //   if (!token) {
  //     console.log('No token found in localStorage');
  //     return null;
  //   }
  
  //   try {
  //     const decoded = jwtDecode<{ sub: string; exp: number }>(token);
  //     console.log('Decoded Token:', decoded);
  //     const currentTime = Math.floor(Date.now() / 1000);
  //     if (decoded.exp > currentTime) {
  //       // Extract numeric part from `sub` if it contains a string like "user2"
  //       const userId = parseInt(decoded.sub.replace(/\D/g, ''), 10);
  //       return isNaN(userId) ? null : userId;
  //     } else {
  //       console.log('Token is expired');
  //       localStorage.removeItem('token');
  //       return null;
  //     }
  //   } catch (error) {
  //     console.error('Failed to decode token:', error);
  //     return null;
  //   }
  // }
  getCurrentUserId(): number | null {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('No token found in localStorage');
      return null;
    }
  
    try {
      const decoded = jwtDecode<{ userId: number; exp: number }>(token);
      console.log('Decoded Token:', decoded);
      const currentTime = Math.floor(Date.now() / 1000);
      if (decoded.exp > currentTime) {
        return decoded.userId || null; // Extract `userId` directly
      } else {
        console.log('Token is expired');
        localStorage.removeItem('token');
        return null;
      }
    } catch (error) {
      console.error('Failed to decode token:', error);
      return null;
    }
  }
  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return false;
  
    try {
      const decoded = jwtDecode<{ exp: number }>(token);
      const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
      return decoded.exp > currentTime; // Check if the token is still valid
    } catch {
      return false;
    }
  }
  logout(): void {
    localStorage.removeItem('token');
  }
}