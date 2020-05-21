import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiResponse } from '../models/ApiResponse';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { TirKamyon } from '../models/TirKamyon';
import { map } from 'rxjs/operators';
import { ErrorService } from '../services/error.service';
import { IsBirimi } from '../models/IsBirimi';

@Injectable({
  providedIn: 'root'
})
export class IsBirimiService {

  path = environment.path;
  baseUrl = '/api/isbirimi';

  constructor(private http: HttpClient, private authService: AuthService, private errorService: ErrorService) {
  }

  post(data: IsBirimi): Observable<ApiResponse<TirKamyon>> {
    return this.http.post<ApiResponse<TirKamyon>>(this.path + this.baseUrl, data, { headers: this.authService.getHeaders() })
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

  getAll(): Observable<ApiResponse<IsBirimi[]>> {
    return this.http.get<ApiResponse<IsBirimi[]>>(this.path + this.baseUrl, { headers: this.authService.getHeaders() })
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

  get(id: string): Observable<ApiResponse<IsBirimi>> {
    return this.http.get<ApiResponse<IsBirimi>>(this.path + this.baseUrl + '/' + id, { headers: this.authService.getHeaders() })
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

  put(id: string, data: IsBirimi): Observable<ApiResponse<IsBirimi>> {
    return this.http.put<ApiResponse<IsBirimi>>(this.path + this.baseUrl + '/' + id, data, { headers: this.authService.getHeaders() })
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

  delete(id: string): Observable<ApiResponse<IsBirimi>> {
    return this.http.delete<ApiResponse<IsBirimi>>(this.path + this.baseUrl + '/' + id, { headers: this.authService.getHeaders() })
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
