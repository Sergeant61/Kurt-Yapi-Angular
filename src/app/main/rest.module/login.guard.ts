import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { User } from '../models/User';

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(private router: Router, private authSevice: AuthService) {

  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    await this.authSevice.isAuthenticated();

    if (this.authSevice.isTokenValid) {
      this.router.navigateByUrl('user');
      return false;
    }
    return true;
  }



}
