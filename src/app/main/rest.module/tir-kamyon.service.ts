import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiResponse } from '../models/ApiResponse';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { TirKamyon } from '../models/TirKamyon';
import { map } from 'rxjs/operators';
import { ErrorService } from '../services/error.service';

@Injectable({
  providedIn: 'root'
})
export class TirKamyonService {

  path = environment.path;
  baseUrl = '/api/kamyon';
  headers: HttpHeaders;

  constructor(private http: HttpClient, private authService: AuthService, private errorService: ErrorService) {
    this.headers = new HttpHeaders({ 'x-access-token': authService.token });
  }

  post(data: TirKamyon): Observable<ApiResponse<TirKamyon>> {
    return this.http.post<ApiResponse<TirKamyon>>(this.path + this.baseUrl, data, { headers: this.headers })
    .pipe(map(res => {
      if (!res.success) {
        this.errorService.getErrorParse(res);
      } else {
        return res;
      }
    }));
  }

  getAll(): Observable<ApiResponse<TirKamyon[]>> {
    return this.http.get<ApiResponse<TirKamyon[]>>(this.path + this.baseUrl, { headers: this.headers })
    .pipe(map(res => {
      if (!res.success) {
        this.errorService.getErrorParse(res);
      } else {
        return res;
      }
    }));
  }

  get(id: string): Observable<ApiResponse<TirKamyon>> {
    return this.http.get<ApiResponse<TirKamyon>>(this.path + this.baseUrl + '/' + id, { headers: this.headers })
    .pipe(map(res => {
      if (!res.success) {
        this.errorService.getErrorParse(res);
      } else {
        return res;
      }
    }));
  }

  put(id: string, data: TirKamyon): Observable<ApiResponse<TirKamyon>> {
    return this.http.put<ApiResponse<TirKamyon>>(this.path + this.baseUrl + '/' + id, data, { headers: this.headers })
    .pipe(map(res => {
      if (!res.success) {
        this.errorService.getErrorParse(res);
      } else {
        return res;
      }
    }));
  }

  delete(id: string): Observable<ApiResponse<TirKamyon>> {
    return this.http.delete<ApiResponse<TirKamyon>>(this.path + this.baseUrl + '/' + id, { headers: this.headers })
    .pipe(map(res => {
      if (!res.success) {
        this.errorService.getErrorParse(res);
      } else {
        return res;
      }
    }));
  }

}
