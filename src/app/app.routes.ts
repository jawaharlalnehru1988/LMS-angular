import { Routes } from '@angular/router';
import { roleGuard } from '../Guards/role.guard';
import { RegisterComponent } from '../pages/register/register.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login', component: RegisterComponent
  },
  {
    path: 'home',
    loadComponent: () =>
      import('../pages/home/home.component').then((c) => c.HomeComponent),
  },
  {
    path: 'search',
    loadComponent: () =>
      import('../pages/search/search.component').then((c) => c.SearchComponent),
    canActivate: [roleGuard],
    data: { expectedRole: 'Librarian'}
  },

  {
    path: 'borrow',
    loadComponent: () =>
      import('../pages/borrow/borrow.component').then((c) => c.BorrowComponent),
  },
  {
    path: 'return',
    loadComponent: () =>
      import('../pages/return/return.component').then((c) => c.ReturnComponent),
  },
  {
    path: 'users',
    loadComponent: () =>
      import('../pages/users/users.component').then((c) => c.UsersComponent),
    canActivate: [roleGuard],
    data: { expectedRole: 'Librarian'}
  },
  {
    path: 'history',
    loadComponent: () =>
      import('../pages/history/history.component').then(
        (c) => c.HistoryComponent
      ),
  },
  {
    path: 'page-not-found',
    loadComponent: () =>
      import('../pages/page-not-found/page-not-found.component').then(
        (c) => c.PageNotFoundComponent
      ),
  },
  {
    path: 'unauthorised',
    loadComponent:()=>
        import('../pages/unauthorised/unauthorised.component').then(
            (c) => c.UnauthorisedComponent
        )
  },
  { path: '**', redirectTo: 'page-not-found', pathMatch: 'prefix' },
];
