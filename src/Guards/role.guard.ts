import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../allservices/auth.service';

export const roleGuard: CanActivateFn = (route) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const expectedRole = route.data['expectedRole'];
  const userRole = authService.getUserRole();
  if(expectedRole === userRole){
  return true;
  } else{
    router.navigate(['/unauthorised']);
    return false;
  }
};
