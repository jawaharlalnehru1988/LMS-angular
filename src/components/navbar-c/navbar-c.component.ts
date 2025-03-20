import { Component } from '@angular/core';
import { Navigations, UserWithRole } from '../../shared/interfaces';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { BookService } from '../../allservices/book.service';

@Component({
  selector: 'app-navbar-c',
  imports: [MatToolbarModule, RouterModule, MatButtonModule, MatIconModule],
  templateUrl: './navbar-c.component.html',
  styleUrl: './navbar-c.component.scss'
})
export class NavbarCComponent {
  navTitle:Navigations[] = [
    {title: "Home", route: "/home"}, 
    {title: "Books' Dashboard", route: "/search"}, 
    {title: "Borrow", route: "/borrow"}, 
    {title: "Return", route: "/return"}, 
    {title: "History", route: "/history"}
    ];
  // userData: any;
  userData: UserWithRole = {
    "role": "Librarian",
    "username": "",
    "password": "",
    "email": "",
    "phone": ""
};
    constructor(private router: Router, private bookService: BookService){}

    ngOnInit():void{
      this.userData= this.bookService.userDataSignal();
      console.log('userData :', this.userData);
    }
    logOut():void{
      this.router.navigate(["/login"]);
    }
}
