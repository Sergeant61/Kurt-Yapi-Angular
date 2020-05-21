import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiResponse } from '../models/ApiResponse';
import { Token } from '../models/Token';
import { User } from '../models/User';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AlertifyService } from '../services/alertify.service';
import { DeviceDetectorService } from 'ngx-device-detector';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  path = environment.path;
  token: string = null;
  browser: string = null;
  currentUser: User = new User();
  isTokenValid: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    public jwtHelper: JwtHelperService,
    private alertifyService: AlertifyService,
    private deviceService: DeviceDetectorService) {
    this.browser = JSON.stringify(this.epicFunction());
    console.log(this.browser);
  }

  epicFunction(): any {
    const deviceInfo = this.deviceService.getDeviceInfo();
    const isMobile = this.deviceService.isMobile();
    const isTablet = this.deviceService.isTablet();
    const isDesktopDevice = this.deviceService.isDesktop();

    let isWhat = 0;
    if (isMobile) { isWhat = 0; } else if (isTablet) { isWhat = 1; } else if (isDesktopDevice) { isWhat = 2; }
    return { deviceInfo, isWhat };
  }

  async isAuthenticated(): Promise<boolean> {

    this.token = localStorage.getItem('token');
    if (this.token != null) {
      try {
        this.isTokenValid = !this.jwtHelper.isTokenExpired(this.token);
      } catch (error) {
        this.logout();
        this.alertifyService.error('Geçersiz oturum anahtarı. Lütfen tekrar giriş yapın.');
      }
      if (this.isTokenValid) {
        await this.getUser();
      } else {
        this.logout();
        this.alertifyService.error('Oturum süresi doldu. Lütfen tekrar giriş yapın.');
      }
      return this.isTokenValid;
    } else {
      this.isTokenValid = false;
      return this.isTokenValid;
    }
  }

  login(body: any): Observable<boolean> {
    return this.http.post<ApiResponse<Token>>(this.path + '/login', body)
      .pipe(map(response => {
        this.token = null;
        if (response.success) {
          this.token = response.data.token;
          localStorage.setItem('token', this.token);
          this.alertifyService.success('Giriş Başarılı.');
          this.getUser();
          return response.success;
        }
      }));
  }

  logout() {
    this.http.post<ApiResponse<void>>(this.path + '/api/users/logout', {},
      { headers: this.getHeaders() })
      .subscribe(res => {
        localStorage.removeItem('token');
        this.token = null;
        this.currentUser = new User();
        this.isTokenValid = false;
        this.router.navigateByUrl('/main/login');
        this.alertifyService.error('Çıkış başarılı.');
      }, err => {

      });
  }

  getHeaders(): HttpHeaders {
    // console.log(this);
    return new HttpHeaders({ 'x-access-token': this.token, 'x-browser': this.browser });
  }

  getUser() {
    return this.http.get<ApiResponse<User>>(this.path + '/api/users',
      { headers: this.getHeaders() }).toPromise().then(res => {
        if (res.success) {
          this.currentUser = res.data;
          this.isTokenValid = res.success;

        } else {
          this.alertifyService.error('Geçersiz oturum anahtarı. Lütfen tekrar giriş yapın.');
          this.logout();
        }
      }).catch(err => {
      });
  }

  sendCaptchaToken(token): Observable<any> {
    return this.http.post<any>(this.path + '/captchaToken', { recaptcha: token });
  }

}
