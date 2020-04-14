import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiResponse } from '../models/ApiResponse';
import { Token } from '../models/Token';
import { User } from '../models/User';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { OzelBinekArac } from '../models/OzelBinekArac';

@Injectable({
  providedIn: 'root'
})
export class OzelBinekAracService {

  path = environment.path;
  baseUrl = '/api/binek';
  headers: HttpHeaders;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.headers = new HttpHeaders({ 'x-access-token': authService.token });
  }

  post(data: OzelBinekArac): Observable<ApiResponse<OzelBinekArac>> {
    return this.http.post<ApiResponse<OzelBinekArac>>(this.path + this.baseUrl, data, { headers: this.headers });
  }

  getAll(): Observable<ApiResponse<OzelBinekArac[]>> {
    return this.http.get<ApiResponse<OzelBinekArac[]>>(this.path + this.baseUrl, { headers: this.headers });
  }

  get(id: string): Observable<ApiResponse<OzelBinekArac>> {
    return this.http.get<ApiResponse<OzelBinekArac>>(this.path + this.baseUrl + '/' + id, { headers: this.headers });
  }

  put(id: string, data: OzelBinekArac): Observable<ApiResponse<OzelBinekArac>> {
    return this.http.put<ApiResponse<OzelBinekArac>>(this.path + this.baseUrl + '/' + id, data, { headers: this.headers });
  }

  delete(id: string): Observable<ApiResponse<OzelBinekArac>> {
    return this.http.delete<ApiResponse<OzelBinekArac>>(this.path + this.baseUrl + '/' + id, { headers: this.headers });
  }

}
