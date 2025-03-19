import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarCComponent } from "../components/navbar-c/navbar-c.component";
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarCComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'LMS-Angular';
  showNavbar = true;

  constructor(private router: Router) {}
  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.showNavbar = !['/login', '/page-not-found'].includes(event.urlAfterRedirects);
    });
  }
}
