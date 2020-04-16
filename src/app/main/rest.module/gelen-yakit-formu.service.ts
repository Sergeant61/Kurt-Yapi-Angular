import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiResponse } from '../models/ApiResponse';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Mode } from '../enums/mode.enum';
import { GelenYakitFormu } from '../models/GelenYakitFormu';
import { map } from 'rxjs/operators';
import { ErrorService } from '../services/error.service';

@Injectable({
  providedIn: 'root'
})
export class GelenYakitFormuService {

  path = environment.path;
  baseUrl = '/api/gelenYakit';
  headers: HttpHeaders;

  constructor(private http: HttpClient, private authService: AuthService, private errorService: ErrorService) {
    this.headers = new HttpHeaders({ 'x-access-token': authService.token });
  }

  post(data: GelenYakitFormu): Observable<ApiResponse<GelenYakitFormu>> {
    return this.http.post<ApiResponse<GelenYakitFormu>>(this.path + this.baseUrl, data, { headers: this.headers })
    .pipe(map(res => {
      if (!res.success) {
        this.errorService.getErrorParse(res);
      } else {
        return res;
      }
    }));
  }

  getAll(): Observable<ApiResponse<GelenYakitFormu[]>> {
    return this.http.get<ApiResponse<GelenYakitFormu[]>>(this.path + this.baseUrl, { headers: this.headers })
    .pipe(map(res => {
      if (!res.success) {
        this.errorService.getErrorParse(res);
      } else {
        return res;
      }
    }));
  }

  getLength(): Observable<ApiResponse<number>> {
    return this.http.put<ApiResponse<number>>(this.path + this.baseUrl, {}, { headers: this.headers })
    .pipe(map(res => {
      if (!res.success) {
        this.errorService.getErrorParse(res);
      } else {
        return res;
      }
    }));
  }

  getSkipAndLimit(start: string, end: string): Observable<ApiResponse<GelenYakitFormu[]>> {
    return this.http.get<ApiResponse<GelenYakitFormu[]>>(
      this.path + this.baseUrl + '/' + start + '/' + end, { headers: this.headers })
      .pipe(map(res => {
        if (!res.success) {
          this.errorService.getErrorParse(res);
        } else {
          return res;
        }
      }));
  }

  get(id: string): Observable<ApiResponse<GelenYakitFormu>> {
    return this.http.get<ApiResponse<GelenYakitFormu>>(this.path + this.baseUrl + '/' + id, { headers: this.headers })
    .pipe(map(res => {
      if (!res.success) {
        this.errorService.getErrorParse(res);
      } else {
        return res;
      }
    }));
  }

  getDetail(id: string, mode: Mode): Observable<ApiResponse<GelenYakitFormu>> {
    return this.http
    .get<ApiResponse<GelenYakitFormu>>(this.path + this.baseUrl + '/detail/' + id + '/' + mode, { headers: this.headers })
    .pipe(map(res => {
      if (!res.success) {
        this.errorService.getErrorParse(res);
      } else {
        return res;
      }
    }));
  }

  put(id: string, data: any): Observable<ApiResponse<GelenYakitFormu>> {
    return this.http.put<ApiResponse<GelenYakitFormu>>(this.path + this.baseUrl + '/' + id, data, { headers: this.headers })
    .pipe(map(res => {
      if (!res.success) {
        this.errorService.getErrorParse(res);
      } else {
        return res;
      }
    }));
  }

  delete(id: string): Observable<ApiResponse<GelenYakitFormu>> {
    return this.http.delete<ApiResponse<GelenYakitFormu>>(this.path + this.baseUrl + '/' + id, { headers: this.headers })
    .pipe(map(res => {
      if (!res.success) {
        this.errorService.getErrorParse(res);
      } else {
        return res;
      }
    }));
  }

}
