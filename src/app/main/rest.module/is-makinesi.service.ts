import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiResponse } from '../models/ApiResponse';
import { Token } from '../models/Token';
import { User } from '../models/User';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { IsMakinesi } from '../models/IsMakinesi';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class IsMakinesiService {

  path = environment.path;
  baseUrl = '/api/makine';
  headers: HttpHeaders;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.headers = new HttpHeaders({ 'x-access-token': authService.token });
  }

  post(data: IsMakinesi): Observable<ApiResponse<IsMakinesi>> {
    return this.http.post<ApiResponse<IsMakinesi>>(this.path + this.baseUrl, data, { headers: this.headers });
  }

  getAll(): Observable<ApiResponse<IsMakinesi[]>> {
    return this.http.get<ApiResponse<IsMakinesi[]>>(this.path + this.baseUrl, { headers: this.headers });
  }

  get(id: string): Observable<ApiResponse<IsMakinesi>> {
    return this.http.get<ApiResponse<IsMakinesi>>(this.path + this.baseUrl + '/' + id, { headers: this.headers });
  }

  put(id: string, data: IsMakinesi): Observable<ApiResponse<IsMakinesi>> {
    return this.http.put<ApiResponse<IsMakinesi>>(this.path + this.baseUrl + '/' + id, data, { headers: this.headers });
  }

  delete(id: string): Observable<ApiResponse<IsMakinesi>> {
    return this.http.delete<ApiResponse<IsMakinesi>>(this.path + this.baseUrl + '/' + id, { headers: this.headers });
  }

}
