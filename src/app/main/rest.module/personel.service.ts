import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiResponse } from '../models/ApiResponse';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Personel } from '../models/Personel';
import { map } from 'rxjs/operators';
import { ErrorService } from '../services/error.service';

@Injectable({
  providedIn: 'root'
})
export class PersonelService {

  path = environment.path;
  baseUrl = '/api/personel';

  constructor(private http: HttpClient, private authService: AuthService, private errorService: ErrorService) {
  }

  post(data: Personel): Observable<ApiResponse<Personel>> {
    return this.http.post<ApiResponse<Personel>>(this.path + this.baseUrl, data, { headers: this.authService.getHeaders() })
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

  getAll(): Observable<ApiResponse<Personel[]>> {
    return this.http.get<ApiResponse<Personel[]>>(this.path + this.baseUrl, { headers: this.authService.getHeaders() })
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

  get(id: string): Observable<ApiResponse<Personel>> {
    return this.http.get<ApiResponse<Personel>>(this.path + this.baseUrl + '/' + id, { headers: this.authService.getHeaders() })
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

  put(id: string, data: Personel): Observable<ApiResponse<Personel>> {
    return this.http.put<ApiResponse<Personel>>(this.path + this.baseUrl + '/' + id, data, { headers: this.authService.getHeaders() })
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

  delete(id: string): Observable<ApiResponse<Personel>> {
    return this.http.delete<ApiResponse<Personel>>(this.path + this.baseUrl + '/' + id, { headers: this.authService.getHeaders() })
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
