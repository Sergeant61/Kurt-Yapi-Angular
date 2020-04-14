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

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  path = environment.path;
  token: string = null;
  currentUser: User = new User();
  isTokenValid: boolean = false;

  constructor(private http: HttpClient, private router: Router, public jwtHelper: JwtHelperService) {
    //this.isAuthenticated();
  }

  async isAuthenticated(): Promise<boolean> {

    this.token = localStorage.getItem('token');
    if (this.token != null) {
      try {
        this.isTokenValid = !this.jwtHelper.isTokenExpired(this.token);
      } catch (error) {
        this.logout();
      }
      if (this.isTokenValid) {
        await this.getUser();
      } else {
        this.logout();
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
          this.getUser();
          return response.success;
        } else {
          console.log(response);
        }

      }));
  }

  logout() {
    localStorage.removeItem('token');
    this.token = null;
    this.currentUser = new User();
    this.isTokenValid = false;
    this.router.navigateByUrl('/login');
  }

  getUser() {
    return this.http.get<ApiResponse<User>>(this.path + '/api/users',
      { headers: new HttpHeaders({ 'x-access-token': this.token }) }).toPromise().then(res => {
        if (res.success) {
          this.currentUser = res.data;
          this.isTokenValid = res.success;
        } else {
          this.logout();
        }
      }).catch(err => {

      });

  }

  getUserSingle(): Observable<ApiResponse<User>> {
    return this.http.get<ApiResponse<User>>(this.path + '/api/users',
      { headers: new HttpHeaders({ 'x-access-token': this.token }) });
  }

  register(body: User): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(this.path + '/register', body);
  }

  sendCaptchaToken(token): Observable<any> {
    return this.http.post<any>(this.path + '/captchaToken', { recaptcha: token });
  }

}
