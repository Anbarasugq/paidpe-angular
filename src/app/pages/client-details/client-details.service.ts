import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClientDetailsService {
  private API_URL = environment.API_URL;
  constructor(private http: HttpClient) {}

  createKYC(value: any): Observable<any> {
    return this.http.post(`${this.API_URL}posts`, {
      ...value,
    });
  }
  getKYC(): Observable<any> {
    return this.http.get(`${this.API_URL}posts`).pipe(
      first(),
      map((data: any) => data)
    );
  }
  deleteKYC(id: any): Observable<any> {
    return this.http.delete(`${this.API_URL}posts/` + id).pipe(
      first(),
      map((data: any) => data.data)
    );
  }
  editKYC(id: any) {
    return this.http.get(`${this.API_URL}posts/` + id).pipe(
      first(),
      map((data: any) => data)
    );
  }
  editSave(id: any, value:any) {
    return this.http
      .put(`${this.API_URL}posts/` + id, {
        ...value,
      })
      .pipe(
        first(),
        map((data: any) => data)
      );
  }
}
