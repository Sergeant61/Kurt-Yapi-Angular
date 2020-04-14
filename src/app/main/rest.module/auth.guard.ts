import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authSevice: AuthService) {

  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {



    await this.authSevice.isAuthenticated();

    if (this.authSevice.isTokenValid) {
      return true;
    }
    this.router.navigateByUrl('login');
    return false;
  }



}
