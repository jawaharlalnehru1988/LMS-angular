import { Injectable, signal, WritableSignal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';

interface AuthResponse{
  token: string;
  username: string;
  userId:string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState:WritableSignal<boolean> = signal(false)
  
  constructor(private http: HttpClient, private userService: UserService) {

   }
  
  getUserRole(): string {
    const userDetailsString = sessionStorage.getItem('user');
    if (userDetailsString) {
      const userDetails = JSON.parse(userDetailsString);
      return userDetails.role || "Member";
    } else {
      console.log('No user details found in sessionStorage.');
      return "Member";
    }
  }

  isLoggedIn():boolean{
    return !!sessionStorage.getItem('user');
  }
login(credentials:{email: string, password: string}):Observable<AuthResponse>{
return this.http.post<AuthResponse>(`${this.userService.authBaseURL}login`,credentials).pipe(
  tap((response:AuthResponse) => {
    localStorage.setItem('token', response.token);
    localStorage.setItem('username', response.username);
    this.authState.set(true);
  })
);
}

}
