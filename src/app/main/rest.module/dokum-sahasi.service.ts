import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiResponse } from '../models/ApiResponse';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { DokumSahasi } from '../models/DokumSahasi';

@Injectable({
  providedIn: 'root'
})
export class DokumSahasiService {

  path = environment.path;
  baseUrl = '/api/dokumSahasi';
  headers: HttpHeaders;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.headers = new HttpHeaders({ 'x-access-token': authService.token });
  }

  post(data: DokumSahasi): Observable<ApiResponse<DokumSahasi>> {
    return this.http.post<ApiResponse<DokumSahasi>>(this.path + this.baseUrl, data, { headers: this.headers });
  }

  getAll(): Observable<ApiResponse<DokumSahasi[]>> {
    return this.http.get<ApiResponse<DokumSahasi[]>>(this.path + this.baseUrl, { headers: this.headers });
  }

  get(id: string): Observable<ApiResponse<DokumSahasi>> {
    return this.http.get<ApiResponse<DokumSahasi>>(this.path + this.baseUrl + '/' + id, { headers: this.headers });
  }

  put(id: string, data: DokumSahasi): Observable<ApiResponse<DokumSahasi>> {
    return this.http.put<ApiResponse<DokumSahasi>>(this.path + this.baseUrl + '/' + id, data, { headers: this.headers });
  }

  delete(id: string): Observable<ApiResponse<DokumSahasi>> {
    return this.http.delete<ApiResponse<DokumSahasi>>(this.path + this.baseUrl + '/' + id, { headers: this.headers });
  }

}
