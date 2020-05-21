import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { ErrorService } from '../services/error.service';
import { environment } from 'src/environments/environment';
import { SahaOlcumFormu } from '../models/SahaOlcumFormu';
import { ApiResponse } from '../models/ApiResponse';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Mode } from '../enums/mode.enum';

@Injectable({
  providedIn: 'root'
})
export class SahaOlcumFormuService {

  path = environment.path;
  baseUrl = '/api/sahaolcum';

  constructor(private http: HttpClient, private authService: AuthService, private errorService: ErrorService) {
  }


  post(data: SahaOlcumFormu): Observable<ApiResponse<SahaOlcumFormu>> {
    return this.http.post<ApiResponse<SahaOlcumFormu>>(this.path + this.baseUrl, data, { headers: this.authService.getHeaders() })
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

  getAll(): Observable<ApiResponse<SahaOlcumFormu[]>> {
    return this.http.get<ApiResponse<SahaOlcumFormu[]>>(this.path + this.baseUrl, { headers: this.authService.getHeaders() })
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

  getSkipAndLimit(start: string, end: string): Observable<ApiResponse<SahaOlcumFormu[]>> {
    return this.http.get<ApiResponse<SahaOlcumFormu[]>>(
      this.path + this.baseUrl + '/' + start + '/' + end, { headers: this.authService.getHeaders() })
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

  get(id: string): Observable<ApiResponse<SahaOlcumFormu>> {
    return this.http.get<ApiResponse<SahaOlcumFormu>>(this.path + this.baseUrl + '/' + id,
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

  getDetail(id: string, mode: Mode): Observable<ApiResponse<SahaOlcumFormu>> {
    return this.http
      .get<ApiResponse<SahaOlcumFormu>>(this.path + this.baseUrl + '/detail/' + id + '/' + mode,
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

  getRaporDetail(data: any): Observable<ApiResponse<Array<SahaOlcumFormu>>> {
    return this.http
      .post<ApiResponse<Array<SahaOlcumFormu>>>(this.path + this.baseUrl + '/detail', data,
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

  put(id: string, data: any): Observable<ApiResponse<SahaOlcumFormu>> {
    return this.http.put<ApiResponse<SahaOlcumFormu>>(this.path + this.baseUrl + '/' + id, data,
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

  delete(id: string): Observable<ApiResponse<SahaOlcumFormu>> {
    return this.http.delete<ApiResponse<SahaOlcumFormu>>(this.path + this.baseUrl + '/' + id,
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
