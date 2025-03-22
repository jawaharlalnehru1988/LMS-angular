import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NavbarCComponent } from "../components/navbar-c/navbar-c.component";
import { BookService } from '../allservices/book.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarCComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  showNavbar = true;

  constructor(private router: Router, private bookService: BookService) {}
  ngOnInit(): void {
    // this.bookService.getUserDetails().subscribe({
    //   next:(res:any)=>{
    //   console.log('res :', res);

    //   }
    // })
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.showNavbar = !['/login', '/page-not-found'].includes(event.urlAfterRedirects);
    });
  }
}
