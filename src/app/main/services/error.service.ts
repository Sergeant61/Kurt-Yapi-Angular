import { Injectable } from '@angular/core';
import { ApiResponse } from '../models/ApiResponse';
import { AlertifyService } from './alertify.service';
import { Router } from '@angular/router';
import { AuthService } from '../rest.module/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private alertifyService: AlertifyService, private authService: AuthService) { }

  getErrorParse(apiResponse: ApiResponse<any>): boolean {

    switch (apiResponse.statusCode) {
      case 5: // Failed to authenticate token.
        this.alertifyService.error('Giriş sağlanamadı. Oturumunuzun süresi dolmuş. Lütfen tekrar giriş yapın.');
        this.authService.logout();
        return false;
      case 1: // Your ip address has changed, please login again.
        this.alertifyService.error('Farklı bir ip algılandı. Lütfen tekrar giriş yapın.');
        this.authService.logout();
        return false;
      case 15: // Authenticate failed, user not found.
        this.alertifyService.error('Kullanıcı bulunamadı.');
        this.authService.logout();
        return false;
      case 99: // Critical level request error, please don't try this again.
        this.alertifyService.error('Yetkisiz erişim denemesi. İp adresi kara listeye eklendi.');
        this.authService.logout();
        return false;
      default:
        console.log(apiResponse);
        return true;

    }

  }


}
