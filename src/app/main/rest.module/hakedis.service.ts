import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiResponse } from '../models/ApiResponse';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { ErrorService } from '../services/error.service';
import { Hakedis } from '../models/Hakedis';

@Injectable({
  providedIn: 'root'
})
export class HakedisService {

  path = environment.path;
  baseUrl = '/api/hakedis';

  constructor(private http: HttpClient, private authService: AuthService, private errorService: ErrorService) {
  }

  post(data: Hakedis): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(this.path + this.baseUrl, data, { headers: this.authService.getHeaders() })
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

  getAll(): Observable<ApiResponse<Hakedis[]>> {
    return this.http.get<ApiResponse<Hakedis[]>>(this.path + this.baseUrl, { headers: this.authService.getHeaders() })
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

  getSkipAndLimit(start: string, end: string, data: Hakedis): Observable<ApiResponse<Hakedis[]>> {
    return this.http.post<ApiResponse<Hakedis[]>>(
      this.path + this.baseUrl + '/' + start + '/' + end, data, { headers: this.authService.getHeaders() })
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

  get(id: string): Observable<ApiResponse<Hakedis>> {
    return this.http.get<ApiResponse<Hakedis>>(this.path + this.baseUrl + '/' + id, { headers: this.authService.getHeaders() })
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

  put(id: string, data: any): Observable<ApiResponse<Hakedis>> {
    return this.http.put<ApiResponse<Hakedis>>(this.path + this.baseUrl + '/' + id, data, { headers: this.authService.getHeaders() })
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

  delete(id: string): Observable<ApiResponse<Hakedis>> {
    return this.http.delete<ApiResponse<Hakedis>>(this.path + this.baseUrl + '/' + id, { headers: this.authService.getHeaders() })
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
