import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiResponse } from '../models/ApiResponse';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { MalzemeCinsi } from '../models/MalzemeCinsi';
import { map } from 'rxjs/operators';
import { ErrorService } from '../services/error.service';

@Injectable({
  providedIn: 'root'
})
export class MalzemeCinsiService {

  path = environment.path;
  baseUrl = '/api/malzemecinsi';

  constructor(private http: HttpClient, private authService: AuthService, private errorService: ErrorService) {
  }

  post(data: MalzemeCinsi): Observable<ApiResponse<MalzemeCinsi>> {
    return this.http.post<ApiResponse<MalzemeCinsi>>(this.path + this.baseUrl, data, { headers: this.authService.getHeaders() })
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

  getAll(): Observable<ApiResponse<MalzemeCinsi[]>> {
    return this.http.get<ApiResponse<MalzemeCinsi[]>>(this.path + this.baseUrl, { headers: this.authService.getHeaders() })
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

  get(id: string): Observable<ApiResponse<MalzemeCinsi>> {
    return this.http.get<ApiResponse<MalzemeCinsi>>(this.path + this.baseUrl + '/' + id, { headers: this.authService.getHeaders() })
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

  put(id: string, data: MalzemeCinsi): Observable<ApiResponse<MalzemeCinsi>> {
    return this.http.put<ApiResponse<MalzemeCinsi>>(this.path + this.baseUrl + '/' + id, data, { headers: this.authService.getHeaders() })
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

  delete(id: string): Observable<ApiResponse<MalzemeCinsi>> {
    return this.http.delete<ApiResponse<MalzemeCinsi>>(this.path + this.baseUrl + '/' + id, { headers: this.authService.getHeaders() })
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
