import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { TokenService } from './token.service';

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})

export class ApiService {
  private API_URL = environment.API_URL;
  constructor(private http: HttpClient, private readonly tokenService: TokenService,) {}

  allService(value: any): Observable<any> {
    return this.http.post(`${this.API_URL}`, {
      ...value,
    },
    httpOptions).pipe(
      first(),
      map((data: any) => data)
    );
  }
  login(credentials: any): Observable<any> {
    return this.http.post(
      `${this.API_URL}auth/signin`,
      {
        ...credentials,
      },
      httpOptions
    );
  }
  setlogin(userName: any, userId: any, userType:any ): void {
		this.tokenService.savetoken(userName, userId, userType);
	}
  // setlogin(accessToken: string, refreshToken: string) {
  //   this.tokenService.savetoken(accessToken);
  //   this.tokenService.saverefreshtoken(refreshToken);
  // }
  
}
