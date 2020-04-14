import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiResponse } from '../models/ApiResponse';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { IsMakinesiGunlukCalisma } from '../models/IsMakinesiGunlukCalisma';
import { Mode } from '../enums/mode.enum';

@Injectable({
  providedIn: 'root'
})
export class IsMakinesiGunlukCalismaFormuService {

  path = environment.path;
  baseUrl = '/api/isMakinesiGunluk';
  headers: HttpHeaders;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.headers = new HttpHeaders({ 'x-access-token': authService.token });
  }

  post(data: IsMakinesiGunlukCalisma): Observable<ApiResponse<IsMakinesiGunlukCalisma>> {
    return this.http.post<ApiResponse<IsMakinesiGunlukCalisma>>(this.path + this.baseUrl, data, { headers: this.headers });
  }

  getAll(): Observable<ApiResponse<IsMakinesiGunlukCalisma[]>> {
    return this.http.get<ApiResponse<IsMakinesiGunlukCalisma[]>>(this.path + this.baseUrl, { headers: this.headers });
  }

  getLength(): Observable<ApiResponse<number>> {
    return this.http.put<ApiResponse<number>>(this.path + this.baseUrl, {}, { headers: this.headers });
  }

  getSkipAndLimit(start: string, end: string): Observable<ApiResponse<IsMakinesiGunlukCalisma[]>> {
    return this.http.get<ApiResponse<IsMakinesiGunlukCalisma[]>>(
      this.path + this.baseUrl + '/' + start + '/' + end, { headers: this.headers });
  }

  get(id: string): Observable<ApiResponse<IsMakinesiGunlukCalisma>> {
    return this.http.get<ApiResponse<IsMakinesiGunlukCalisma>>(this.path + this.baseUrl + '/' + id, { headers: this.headers });
  }

  getDetail(id: string, mode: Mode): Observable<ApiResponse<IsMakinesiGunlukCalisma>> {
    return this.http
    .get<ApiResponse<IsMakinesiGunlukCalisma>>(this.path + this.baseUrl + '/detail/' + id + '/' + mode, { headers: this.headers });
  }

  put(id: string, data: any): Observable<ApiResponse<IsMakinesiGunlukCalisma>> {
    return this.http.put<ApiResponse<IsMakinesiGunlukCalisma>>(this.path + this.baseUrl + '/' + id, data, { headers: this.headers });
  }

  delete(id: string): Observable<ApiResponse<IsMakinesiGunlukCalisma>> {
    return this.http.delete<ApiResponse<IsMakinesiGunlukCalisma>>(this.path + this.baseUrl + '/' + id, { headers: this.headers });
  }

}
