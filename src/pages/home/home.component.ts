import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

sideBarTitles: string[] = ["Search Books", "Borrow Books", "Borrow", "Return", "History"];
}
