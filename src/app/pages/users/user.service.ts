import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})

export class UserService {
  private API_URL = environment.API_URL;
  constructor(private http: HttpClient) {}

  userService(value: any): Observable<any> {
    return this.http.post(`${this.API_URL}`, {
      ...value,
    },
    httpOptions).pipe(
      first(),
      map((data: any) => data)
    );
  }
  
}
