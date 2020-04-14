import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiResponse } from '../models/ApiResponse';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Personel } from '../models/Personel';

@Injectable({
  providedIn: 'root'
})
export class PersonelService {

  path = environment.path;
  baseUrl = '/api/personel';
  headers: HttpHeaders;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.headers = new HttpHeaders({ 'x-access-token': authService.token });
  }

  post(data: Personel): Observable<ApiResponse<Personel>> {
    return this.http.post<ApiResponse<Personel>>(this.path + this.baseUrl, data, { headers: this.headers });
  }

  getAll(): Observable<ApiResponse<Personel[]>> {
    return this.http.get<ApiResponse<Personel[]>>(this.path + this.baseUrl, { headers: this.headers });
  }

  get(id: string): Observable<ApiResponse<Personel>> {
    return this.http.get<ApiResponse<Personel>>(this.path + this.baseUrl + '/' + id, { headers: this.headers });
  }

  put(id: string, data: Personel): Observable<ApiResponse<Personel>> {
    return this.http.put<ApiResponse<Personel>>(this.path + this.baseUrl + '/' + id, data, { headers: this.headers });
  }

  delete(id: string): Observable<ApiResponse<Personel>> {
    return this.http.delete<ApiResponse<Personel>>(this.path + this.baseUrl + '/' + id, { headers: this.headers });
  }

}
