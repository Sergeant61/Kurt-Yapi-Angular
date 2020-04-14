import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiResponse } from '../models/ApiResponse';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Mode } from '../enums/mode.enum';
import { GidenYakitFormu } from '../models/GidenYakitFormu';

@Injectable({
  providedIn: 'root'
})
export class GidenYakitFormuService {

  path = environment.path;
  baseUrl = '/api/gidenYakit';
  headers: HttpHeaders;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.headers = new HttpHeaders({ 'x-access-token': authService.token });
  }

  post(data: GidenYakitFormu): Observable<ApiResponse<GidenYakitFormu>> {
    return this.http.post<ApiResponse<GidenYakitFormu>>(this.path + this.baseUrl, data, { headers: this.headers });
  }

  getAll(): Observable<ApiResponse<GidenYakitFormu[]>> {
    return this.http.get<ApiResponse<GidenYakitFormu[]>>(this.path + this.baseUrl, { headers: this.headers });
  }

  getLength(): Observable<ApiResponse<number>> {
    return this.http.put<ApiResponse<number>>(this.path + this.baseUrl, {}, { headers: this.headers });
  }

  getSkipAndLimit(start: string, end: string): Observable<ApiResponse<GidenYakitFormu[]>> {
    return this.http.get<ApiResponse<GidenYakitFormu[]>>(
      this.path + this.baseUrl + '/' + start + '/' + end, { headers: this.headers });
  }

  get(id: string): Observable<ApiResponse<GidenYakitFormu>> {
    return this.http.get<ApiResponse<GidenYakitFormu>>(this.path + this.baseUrl + '/' + id, { headers: this.headers });
  }

  getDetail(id: string, mode: Mode): Observable<ApiResponse<GidenYakitFormu>> {
    return this.http
    .get<ApiResponse<GidenYakitFormu>>(this.path + this.baseUrl + '/detail/' + id + '/' + mode, { headers: this.headers });
  }

  put(id: string, data: any): Observable<ApiResponse<GidenYakitFormu>> {
    return this.http.put<ApiResponse<GidenYakitFormu>>(this.path + this.baseUrl + '/' + id, data, { headers: this.headers });
  }

  delete(id: string): Observable<ApiResponse<GidenYakitFormu>> {
    return this.http.delete<ApiResponse<GidenYakitFormu>>(this.path + this.baseUrl + '/' + id, { headers: this.headers });
  }

}
