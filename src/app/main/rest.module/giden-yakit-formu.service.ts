import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiResponse } from '../models/ApiResponse';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Mode } from '../enums/mode.enum';
import { GidenYakitFormu } from '../models/GidenYakitFormu';
import { map } from 'rxjs/operators';
import { ErrorService } from '../services/error.service';

@Injectable({
  providedIn: 'root'
})
export class GidenYakitFormuService {

  path = environment.path;
  baseUrl = '/api/gidenYakit';

  constructor(private http: HttpClient, private authService: AuthService, private errorService: ErrorService) {
  }

  post(data: GidenYakitFormu): Observable<ApiResponse<GidenYakitFormu>> {
    return this.http.post<ApiResponse<GidenYakitFormu>>(this.path + this.baseUrl, data, { headers: this.authService.getHeaders() })
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

  getAll(): Observable<ApiResponse<GidenYakitFormu[]>> {
    return this.http.get<ApiResponse<GidenYakitFormu[]>>(this.path + this.baseUrl, { headers: this.authService.getHeaders() })
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

  getLength(): Observable<ApiResponse<number>> {
    return this.http.put<ApiResponse<number>>(this.path + this.baseUrl, {}, { headers: this.authService.getHeaders() })
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

  getSkipAndLimit(start: string, end: string): Observable<ApiResponse<GidenYakitFormu[]>> {
    return this.http.get<ApiResponse<GidenYakitFormu[]>>(
      this.path + this.baseUrl + '/' + start + '/' + end, { headers: this.authService.getHeaders() });
  }

  get(id: string): Observable<ApiResponse<GidenYakitFormu>> {
    return this.http.get<ApiResponse<GidenYakitFormu>>(this.path + this.baseUrl + '/' + id, { headers: this.authService.getHeaders() })
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

  getDetail(id: string, mode: Mode): Observable<ApiResponse<GidenYakitFormu>> {
    return this.http
    .get<ApiResponse<GidenYakitFormu>>(this.path + this.baseUrl + '/detail/' + id + '/' + mode, { headers: this.authService.getHeaders() })
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

  put(id: string, data: any): Observable<ApiResponse<GidenYakitFormu>> {
    return this.http.put<ApiResponse<GidenYakitFormu>>(this.path + this.baseUrl + '/' + id, data,
     { headers: this.authService.getHeaders() })
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

  delete(id: string): Observable<ApiResponse<GidenYakitFormu>> {
    return this.http.delete<ApiResponse<GidenYakitFormu>>(this.path + this.baseUrl + '/' + id,
     { headers: this.authService.getHeaders() })
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
