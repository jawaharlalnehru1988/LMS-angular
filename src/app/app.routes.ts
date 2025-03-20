import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: "", redirectTo: "login", pathMatch: "full" },
    { path: "login", loadComponent: () => import('../pages/register/register.component').then(c => c.RegisterComponent) },
    { path: "home", loadComponent: () => import('../pages/home/home.component').then(c => c.HomeComponent) },
    { path: "search", loadComponent: () => import("../pages/search/search.component").then(c => c.SearchComponent) },
    { path: "borrow", loadComponent: () => import("../pages/borrow/borrow.component").then(c => c.BorrowComponent) },
    { path: "return", loadComponent: () => import("../pages/return/return.component").then(c => c.ReturnComponent) },
    { path: "history", loadComponent: () => import("../pages/history/history.component").then(c => c.HistoryComponent) },
    { path: "page-not-found", loadComponent: () => import('../pages/page-not-found/page-not-found.component').then(c => c.PageNotFoundComponent) },
    { path: "**", redirectTo: "page-not-found", pathMatch: "prefix" },
  ];
