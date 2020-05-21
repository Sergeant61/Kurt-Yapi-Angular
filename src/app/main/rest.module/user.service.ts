import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiResponse } from '../models/ApiResponse';
import { User } from '../models/User';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ErrorService } from '../services/error.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  path = environment.path;
  baseUrl = '/api/users';

  constructor(private http: HttpClient, private authService: AuthService, private errorService: ErrorService) {
  }

  put(data: User): Observable<ApiResponse<User>> {
    return this.http.put<ApiResponse<User>>(this.path + this.baseUrl, data, { headers: this.authService.getHeaders() })
      .pipe(map(res => {
        if (!res.success) {
          if (this.errorService.getErrorParse(res)) {
            return res;
          }
        } else {
          return res;
        }
      }));
  }

  putPassword(data: any): Observable<ApiResponse<void>> {
    return this.http.put<ApiResponse<void>>(this.path + this.baseUrl + '/password', data, { headers: this.authService.getHeaders() })
      .pipe(map(res => {
        if (!res.success) {
          if (this.errorService.getErrorParse(res)) {
            return res;
          }
        } else {
          return res;
        }
      }));
  }

  putUsername(data: any): Observable<ApiResponse<void>> {
    return this.http.put<ApiResponse<void>>(this.path + this.baseUrl + '/username', data, { headers: this.authService.getHeaders() })
      .pipe(map(res => {
        if (!res.success) {
          if (this.errorService.getErrorParse(res)) {
            return res;
          }
        } else {
          return res;
        }
      }));
  }

  forgotPass(): Observable<ApiResponse<void>> {
    return this.http.get<ApiResponse<void>>(this.path + this.baseUrl + '/forgotPass', { headers: this.authService.getHeaders() })
      .pipe(map(res => {
        if (!res.success) {
          if (this.errorService.getErrorParse(res)) {
            return res;
          }
        } else {
          return res;
        }
      }));
  }

  get(): Observable<ApiResponse<User>> {
    return this.http.get<ApiResponse<User>>(this.path + this.baseUrl, { headers: this.authService.getHeaders() })
      .pipe(map(res => {
        if (!res.success) {
          if (this.errorService.getErrorParse(res)) {
            return res;
          }
        } else {
          return res;
        }
      }));
  }

  getAll(): Observable<ApiResponse<User[]>> {
    return this.http.get<ApiResponse<User[]>>(this.path + this.baseUrl + '/all', { headers: this.authService.getHeaders() })
      .pipe(map(res => {
        if (!res.success) {
          if (this.errorService.getErrorParse(res)) {
            return res;
          }
        } else {
          return res;
        }
      }));
  }

  delete(id): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(this.path + this.baseUrl + '/' + id, { headers: this.authService.getHeaders() })
      .pipe(map(res => {
        if (!res.success) {
          if (this.errorService.getErrorParse(res)) {
            return res;
          }
        } else {
          return res;
        }
      }));
  }

  register(data: User): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(this.path + '/api/register', data, { headers: this.authService.getHeaders() })
      .pipe(map(res => {
        if (!res.success) {
          if (this.errorService.getErrorParse(res)) {
            return res;
          }
        } else {
          return res;
        }
      }));
  }

}
