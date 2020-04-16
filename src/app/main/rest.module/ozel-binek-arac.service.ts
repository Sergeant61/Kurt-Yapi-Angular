import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiResponse } from '../models/ApiResponse';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { OzelBinekArac } from '../models/OzelBinekArac';
import { ErrorService } from '../services/error.service';

@Injectable({
  providedIn: 'root'
})
export class OzelBinekAracService {

  path = environment.path;
  baseUrl = '/api/binek';
  headers: HttpHeaders;

  constructor(private http: HttpClient, private authService: AuthService, private errorService: ErrorService) {
    this.headers = new HttpHeaders({ 'x-access-token': authService.token });
  }

  post(data: OzelBinekArac): Observable<ApiResponse<OzelBinekArac>> {
    return this.http.post<ApiResponse<OzelBinekArac>>(this.path + this.baseUrl, data, { headers: this.headers })
    .pipe(map(res => {
      if (!res.success) {
        this.errorService.getErrorParse(res);
      } else {
        return res;
      }
    }));
  }

  getAll(): Observable<ApiResponse<OzelBinekArac[]>> {
    return this.http.get<ApiResponse<OzelBinekArac[]>>(this.path + this.baseUrl, { headers: this.headers })
    .pipe(map(res => {
      if (!res.success) {
        this.errorService.getErrorParse(res);
      } else {
        return res;
      }
    }));
  }

  get(id: string): Observable<ApiResponse<OzelBinekArac>> {
    return this.http.get<ApiResponse<OzelBinekArac>>(this.path + this.baseUrl + '/' + id, { headers: this.headers })
    .pipe(map(res => {
      if (!res.success) {
        this.errorService.getErrorParse(res);
      } else {
        return res;
      }
    }));
  }

  put(id: string, data: OzelBinekArac): Observable<ApiResponse<OzelBinekArac>> {
    return this.http.put<ApiResponse<OzelBinekArac>>(this.path + this.baseUrl + '/' + id, data, { headers: this.headers })
    .pipe(map(res => {
      if (!res.success) {
        this.errorService.getErrorParse(res);
      } else {
        return res;
      }
    }));
  }

  delete(id: string): Observable<ApiResponse<OzelBinekArac>> {
    return this.http.delete<ApiResponse<OzelBinekArac>>(this.path + this.baseUrl + '/' + id, { headers: this.headers })
    .pipe(map(res => {
      if (!res.success) {
        this.errorService.getErrorParse(res);
      } else {
        return res;
      }
    }));
  }

}
