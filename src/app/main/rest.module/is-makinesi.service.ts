import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiResponse } from '../models/ApiResponse';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IsMakinesi } from '../models/IsMakinesi';
import { AuthService } from './auth.service';
import { ErrorService } from '../services/error.service';

@Injectable({
  providedIn: 'root'
})
export class IsMakinesiService {

  path = environment.path;
  baseUrl = '/api/makine';
  headers: HttpHeaders;

  constructor(private http: HttpClient, private authService: AuthService, private errorService: ErrorService) {
    this.headers = new HttpHeaders({ 'x-access-token': authService.token });
  }

  post(data: IsMakinesi): Observable<ApiResponse<IsMakinesi>> {
    return this.http.post<ApiResponse<IsMakinesi>>(this.path + this.baseUrl, data, { headers: this.headers })
    .pipe(map(res => {
      if (!res.success) {
        this.errorService.getErrorParse(res);
      } else {
        return res;
      }
    }));
  }

  getAll(): Observable<ApiResponse<IsMakinesi[]>> {
    return this.http.get<ApiResponse<IsMakinesi[]>>(this.path + this.baseUrl, { headers: this.headers })
    .pipe(map(res => {
      if (!res.success) {
        this.errorService.getErrorParse(res);
      } else {
        return res;
      }
    }));
  }

  get(id: string): Observable<ApiResponse<IsMakinesi>> {
    return this.http.get<ApiResponse<IsMakinesi>>(this.path + this.baseUrl + '/' + id, { headers: this.headers })
    .pipe(map(res => {
      if (!res.success) {
        this.errorService.getErrorParse(res);
      } else {
        return res;
      }
    }));
  }

  put(id: string, data: IsMakinesi): Observable<ApiResponse<IsMakinesi>> {
    return this.http.put<ApiResponse<IsMakinesi>>(this.path + this.baseUrl + '/' + id, data, { headers: this.headers })
    .pipe(map(res => {
      if (!res.success) {
        this.errorService.getErrorParse(res);
      } else {
        return res;
      }
    }));
  }

  delete(id: string): Observable<ApiResponse<IsMakinesi>> {
    return this.http.delete<ApiResponse<IsMakinesi>>(this.path + this.baseUrl + '/' + id, { headers: this.headers })
    .pipe(map(res => {
      if (!res.success) {
        this.errorService.getErrorParse(res);
      } else {
        return res;
      }
    }));
  }

}
