import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiResponse } from '../models/ApiResponse';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { TirKamyonGunlukCalisma } from '../models/TirKamyonGunlukCalisma';
import { Mode } from '../enums/mode.enum';

@Injectable({
  providedIn: 'root'
})
export class TirKamyonGunlukCalismaFormuService {

  path = environment.path;
  baseUrl = '/api/tirKamyonGunluk';
  headers: HttpHeaders;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.headers = new HttpHeaders({ 'x-access-token': authService.token });
  }

  post(data: TirKamyonGunlukCalisma): Observable<ApiResponse<TirKamyonGunlukCalisma>> {
    return this.http.post<ApiResponse<TirKamyonGunlukCalisma>>(this.path + this.baseUrl, data, { headers: this.headers });
  }

  getAll(): Observable<ApiResponse<TirKamyonGunlukCalisma[]>> {
    return this.http.get<ApiResponse<TirKamyonGunlukCalisma[]>>(this.path + this.baseUrl, { headers: this.headers });
  }

  getLength(): Observable<ApiResponse<number>> {
    return this.http.put<ApiResponse<number>>(this.path + this.baseUrl, {}, { headers: this.headers });
  }

  getSkipAndLimit(start: string, end: string): Observable<ApiResponse<TirKamyonGunlukCalisma[]>> {
    return this.http.get<ApiResponse<TirKamyonGunlukCalisma[]>>(
      this.path + this.baseUrl + '/' + start + '/' + end, { headers: this.headers });
  }

  get(id: string): Observable<ApiResponse<TirKamyonGunlukCalisma>> {
    return this.http.get<ApiResponse<TirKamyonGunlukCalisma>>(this.path + this.baseUrl + '/' + id, { headers: this.headers });
  }

  getDetail(id: string, mode: Mode): Observable<ApiResponse<TirKamyonGunlukCalisma>> {
    return this.http
    .get<ApiResponse<TirKamyonGunlukCalisma>>(this.path + this.baseUrl + '/detail/' + id + '/' + mode, { headers: this.headers });
  }

  put(id: string, data: any): Observable<ApiResponse<TirKamyonGunlukCalisma>> {
    return this.http.put<ApiResponse<TirKamyonGunlukCalisma>>(this.path + this.baseUrl + '/' + id, data, { headers: this.headers });
  }

  delete(id: string): Observable<ApiResponse<TirKamyonGunlukCalisma>> {
    return this.http.delete<ApiResponse<TirKamyonGunlukCalisma>>(this.path + this.baseUrl + '/' + id, { headers: this.headers });
  }

}
