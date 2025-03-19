import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarCComponent } from "../components/navbar-c/navbar-c.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarCComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'LMS-Angular';
}
