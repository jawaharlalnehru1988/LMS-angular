import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

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
  
}
