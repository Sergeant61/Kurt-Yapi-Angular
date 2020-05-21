import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiResponse } from '../models/ApiResponse';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { TirKamyon } from '../models/TirKamyon';
import { map } from 'rxjs/operators';
import { ErrorService } from '../services/error.service';
import { FormTuru } from '../models/FormTuru';

@Injectable({
  providedIn: 'root'
})
export class FormTuruService {

  path = environment.path;
  baseUrl = '/api/formturu';

  constructor(private http: HttpClient, private authService: AuthService, private errorService: ErrorService) {
  }

  post(data: FormTuru): Observable<ApiResponse<TirKamyon>> {
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

  getAll(): Observable<ApiResponse<FormTuru[]>> {
    return this.http.get<ApiResponse<FormTuru[]>>(this.path + this.baseUrl, { headers: this.authService.getHeaders() })
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

  get(id: string): Observable<ApiResponse<FormTuru>> {
    return this.http.get<ApiResponse<FormTuru>>(this.path + this.baseUrl + '/' + id, { headers: this.authService.getHeaders() })
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

  put(id: string, data: FormTuru): Observable<ApiResponse<FormTuru>> {
    return this.http.put<ApiResponse<FormTuru>>(this.path + this.baseUrl + '/' + id, data, { headers: this.authService.getHeaders() })
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

  delete(id: string): Observable<ApiResponse<FormTuru>> {
    return this.http.delete<ApiResponse<FormTuru>>(this.path + this.baseUrl + '/' + id, { headers: this.authService.getHeaders() })
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
