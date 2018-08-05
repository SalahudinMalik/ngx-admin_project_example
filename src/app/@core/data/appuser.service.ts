import { Injectable } from "@angular/core";
import { Globals } from "../../../Globals";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { NbAuthService } from "@nebular/auth";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/toPromise";
import "rxjs/add/operator/catch";
import "rxjs/Rx";
import { User } from "../../models/user.model";
import { DealerPackageService } from "./dealerpackage.service";
import { TokenAuthService } from "./token-auth.service";

@Injectable({
  providedIn: "root"
})
export class UserService {
  fullurl: any = "";

  constructor(
    private global: Globals,
    private http: HttpClient,
    private tokenAuthService: TokenAuthService
  ) {}

  saveUser(data: any): Observable<any> {
    this.fullurl = "";
    this.fullurl = this.global.weburl + "/user/create";
    return this.http
      .post(this.fullurl, data, this.tokenAuthService._options)
      .map((result: any) => result)
      .catch(this.errorHandler);
  }

  updateUser(data: any): Observable<any> {
    this.fullurl = "";
    this.fullurl = this.global.weburl + "/user/update";
    return this.http
      .post(this.fullurl, data, this.tokenAuthService._options)
      .map((result: any) => result)
      .catch(this.errorHandler);
  }
  deleteUser(data: any): Observable<any> {
    this.fullurl = "";
    let options = {
      headers: this.tokenAuthService._options.headers,
      body: { id: data }
    };
    this.fullurl = this.global.weburl + "/user/delete";
    return this.http
      .delete(this.fullurl, options)
      .map((result: any) => result)
      .catch(this.errorHandler);
  }
  getOneUser(data: any): Observable<User> {
    this.fullurl = "";
    this.fullurl = this.global.weburl + "/user/findOne/" + data;
    return this.http
      .get<User>(this.fullurl, this.tokenAuthService._options)
      .map((result: any) => result)
      .catch(this.errorHandler);
  }
  getAllUser(role_id?: any): Observable<User> {
    this.fullurl = "";
    this.fullurl =
      role_id === undefined
        ? this.global.weburl + "/user/find"
        : (this.fullurl = this.global.weburl + "/user/find");
        let options = {
          headers: this.tokenAuthService._options.headers,
          body: { role_id: role_id },
        };
    return this.http
      .get<User>(this.fullurl,options)
      .map((result: any) => result)
      .catch(this.errorHandler);
  }
  getRoles(): Observable<any> {
    this.fullurl = "";
    this.fullurl = this.global.weburl + "/roles/find";
    return this.http
      .get<any>(this.fullurl, {
        headers: this.tokenAuthService._options.headers
      })
      .map((result: any) => result)
      .catch(this.errorHandler);
  }
  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || "Server Error");
  }
}
