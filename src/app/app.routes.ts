import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: "", loadComponent: ()=> import('../pages/home/home.component').then(c => c.HomeComponent) },
    {path: "home", loadComponent: ()=> import('../pages/home/home.component').then(c => c.HomeComponent) },
    {path: "search", loadComponent: ()=> import("../pages/search/search.component").then(c => c.SearchComponent)},
    {path: "borrow", loadComponent: ()=> import("../pages/borrow/borrow.component").then(c => c.BorrowComponent)},
    {path: "return", loadComponent: ()=> import("../pages/return/return.component").then(c => c.ReturnComponent)},
    {path: "history", loadChildren: ()=> import("../pages/history/history.component").then(c => c.HistoryComponent)}
];
