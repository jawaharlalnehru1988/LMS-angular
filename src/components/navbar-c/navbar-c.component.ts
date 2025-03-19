import { Component } from '@angular/core';
import { Navigations } from '../../shared/interfaces';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar-c',
  imports: [MatToolbarModule, RouterModule, MatButtonModule, MatIconModule],
  templateUrl: './navbar-c.component.html',
  styleUrl: './navbar-c.component.scss'
})
export class NavbarCComponent {
  navTitle:Navigations[] = [
    {title: "Home", route: "/home"}, 
    {title: "Search Books", route: "/search"}, 
    {title: "Borrow", route: "/borrow"}, 
    {title: "Return", route: "/return"}, 
    {title: "History", route: "/history"}
    ];
}
