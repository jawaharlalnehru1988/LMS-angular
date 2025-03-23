import { Component, OnInit } from '@angular/core';
import { Navigations, UserWithRole } from '../../shared/interfaces';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import {MatBadgeModule} from '@angular/material/badge';
import { BookService } from '../../allservices/book.service';

@Component({
  selector: 'app-navbar-c',
  imports: [MatToolbarModule, MatBadgeModule, RouterModule, MatButtonModule, MatIconModule],
  templateUrl: './navbar-c.component.html',
  styleUrl: './navbar-c.component.scss',
})
export class NavbarCComponent implements OnInit {
  hidden = false;

  userData: UserWithRole = {
    _id:'',
    id: "",
    role: 'Librarian',
    username: '',
    password: '',
    email: '',
    phone: '',
  };
  navTitle: Navigations[] = [
    { title: 'Books Gallary', route: '/home' },
    { title: "Books' Ledger", route: '/search' },
    { title: "Users' List", route: '/users' },
    { title: 'Borrow', route: '/borrow' },
    { title: 'Return', route: '/return' },
    { title: 'History', route: '/history' },
  ];
  itemCount: any;
  constructor(private router: Router, private bookService: BookService) {
    this.itemCount = this.bookService.itemCount;
  }
  
  ngOnInit(): void {
    this.getUserDetails();
    this.filterUnautorisedTabs(this.userData.role);
  }
  
  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }
  getUserDetails(): void {
    if (!this.userData.username) {
      const userFromSessionString = sessionStorage.getItem('user');
      if (userFromSessionString)
        this.userData = JSON.parse(userFromSessionString);
    } else {
      console.log('No user data found in session storage.');
    }
  }

  logOut(): void {
    this.router.navigate(['/login']);
    sessionStorage.removeItem('user');
  }

  filterUnautorisedTabs(role: string) {
    if (role === 'Member') {
      this.navTitle = this.navTitle.filter(
        (tab) =>
          tab.title !== "Books' Dashboard" && tab.title !== "Users' Dashboard"
      );
    } else if (role === 'Librarian') {
      this.navTitle = [...this.navTitle];
    }
  }
}
