import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { User } from '../models/User';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private router: Router, private authSevice: AuthService) {

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if (this.authSevice.isAuthenticated()) {
      if (this.authSevice.currentUser.isAdmin) {
        return true;
      }
      this.goLogin();
    }
    this.goLogin();
  }

  goLogin() {
    this.router.navigateByUrl('login');
    return false;
  }
}
