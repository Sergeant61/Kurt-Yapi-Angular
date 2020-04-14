import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiResponse } from '../models/ApiResponse';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Firma } from '../models/Firma';

@Injectable({
  providedIn: 'root'
})
export class FirmaService {

  path = environment.path;
  baseUrl = '/api/firma';
  headers: HttpHeaders;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.headers = new HttpHeaders({ 'x-access-token': authService.token });
  }

  post(data: Firma): Observable<ApiResponse<Firma>> {
    return this.http.post<ApiResponse<Firma>>(this.path + this.baseUrl, data, { headers: this.headers });
  }

  getAll(): Observable<ApiResponse<Firma[]>> {
    return this.http.get<ApiResponse<Firma[]>>(this.path + this.baseUrl, { headers: this.headers });
  }

  get(id: string): Observable<ApiResponse<Firma>> {
    return this.http.get<ApiResponse<Firma>>(this.path + this.baseUrl + '/' + id, { headers: this.headers });
  }

  put(id: string, data: Firma): Observable<ApiResponse<Firma>> {
    return this.http.put<ApiResponse<Firma>>(this.path + this.baseUrl + '/' + id, data, { headers: this.headers });
  }

  delete(id: string): Observable<ApiResponse<Firma>> {
    return this.http.delete<ApiResponse<Firma>>(this.path + this.baseUrl + '/' + id, { headers: this.headers });
  }

}
