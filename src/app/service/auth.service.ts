// /* eslint-disable @typescript-eslint/naming-convention */
// /* eslint-disable @typescript-eslint/member-ordering */
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { JwtHelperService } from '@auth0/angular-jwt';

// // import * as _ from 'lodash';
// import { Observable } from 'rxjs';
// // import { Credentialspassword, Credentials, User } from '../models/index';
// // import { CoreService } from './core.service';
// // import { StorageService } from './storage.service';
// import { TokenService } from './token.service';

// const httpOptions = {
//   headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
// };

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   private tokenTimer: any;
//   isLoggedIn = false;
//   redirectUrl: any = '/';
//   autherisationcheck = false;
//   constructor(
//     private readonly router: Router,
//     private readonly http: HttpClient,
//     public jwtHelper: JwtHelperService,
//     private readonly tokenService: TokenService,
//     // private coreService: CoreService,

//     private activetedroute: ActivatedRoute,
//     // private storage: StorageService
//   ) {
//     if (this.router.url.search('resetpassword') === -1) {
//     }
//   }

//   setlogin(accessToken: string, refreshToken: string) {
//     this.tokenService.savetoken(accessToken);
//     this.tokenService.saverefreshtoken(refreshToken);
//   }

//   getuser(): any {
//     let usertemp = new any();
//     usertemp = this.jwtHelper.isTokenExpired()
//       ? (usertemp = {
//         id: '',
//         email: '',
//         userid: '',
//         roles: [],
//         subscriptions: [],
//         lastlogin: new Date(),
//       })
//       : this.jwtHelper.decodeToken(this.tokenService.gettoken());
//     this.isLoggedIn = true;
//     const userdata = this.getuserroles()


//     return usertemp;
//   }
//   async saveuserinfo(data: any) {

//     await this.storage.set(
//       'userinfo',
//       JSON.stringify(data)
//     );
//   }

//   checkSubscription(subscription: string): boolean {
//     try {
//       const tempuser = this.getuser().subscriptions.find(
//         (f) => f === subscription
//       );
//       if (tempuser) {
//         return true;
//       }
//       return false;
//     } catch {
//       return false;
//     }
//   }

//   checkRole(role: string): boolean {
//     try {
//       const tempuser = this.getuser().roles.find((f) => f === role);
//       if (tempuser) {
//         return true;
//       }
//       return false;
//     } catch {
//       return false;
//     }
//   }

//   async logout() {
//     await this.storage.clearstorage();
//     clearTimeout(this.tokenTimer);
//     this.tokenService.logout();
//     this.isLoggedIn = false;
//     this.router.navigate(['/login']);
//   }

//   login(credentials: Credentials): Observable<any> {
//     return this.http.post(
//       `${this.coreService.CORE_API()}auth/signin`,
//       {
//         ...credentials,
//       },
//       httpOptions
//     );
//   }

//   refreshtokens(data: any): Observable<any> {
//     return this.http.get(
//       `${this.coreService.CORE_API()}auth/${data.refreshtoken}`,
//       httpOptions
//     );
//   }

//   changepassword(credentialspassword: Credentialspassword) {
//     return this.http.post(
//       `${this.coreService.CORE_API()}auth/changepassword`,
//       {
//         ...credentialspassword,
//       },
//       httpOptions
//     );
//   }

//   activate(activatetoken: string) {
//     return this.http.put(
//       `${this.coreService.CORE_API()}auth/activate/:activatetoken?activatetoken=` +
//       activatetoken,
//       httpOptions
//     );
//   }
//   resetpassword(activatetoken: string, password: string) {
//     return this.http.post(
//       `${this.coreService.CORE_API()}auth/resetpassword?RESETPASSWORDTOKEN=${activatetoken}`,
//       { password },
//       httpOptions
//     );
//   }

//   verifyemal(verificationtoken: string) {
//     return this.http.get(
//       `${this.coreService.CORE_API()}auth/verifyemail?VERIFYEMAILTOKEN=${verificationtoken}`,
//       httpOptions
//     );
//   }

//   forgetpassword(forget: any) {
//     return this.http.post(
//       `${this.coreService.CORE_API()}auth/forgotpassword`,
//       {
//         ...forget,
//       },
//       httpOptions
//     );
//   }

//   isuserauthorized = (roles: Array<string>) => {
//     const userinfo = this.getuser();
//     return _.intersectionBy(userinfo.roles, roles).length > 0;
//   };

//   getuserroles = async () => {
//     const data = JSON.parse(await this.storage.getValue('userinfo'));
//     return data.roles[0];
//   };

//   getuserinfo = async () => {
//     const data = JSON.parse(await this.storage.getValue('userinfo'));
//     return data;
//   };
//   checkLogin(): boolean {
//     if (this.isLoggedIn) {
//       return true;
//     } else {
//       return false;
//     }
//   }
// }