import { Injectable } from "@angular/core";
import { Globals } from "../../../Globals";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { Http, Response, RequestOptions, Headers } from "@angular/http";
import { NbAuthService } from "@nebular/auth";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/toPromise";
import "rxjs/add/operator/catch";
import "rxjs/Rx";
import { TokenAuthService } from "./token-auth.service";
@Injectable({
  providedIn: "root"
})
export class PermissionsService {
  fullurl: any = "";
  role: any;

  constructor(
    private global: Globals,
    private http: HttpClient,
    private tokenAuthService: TokenAuthService
  ) {}

  getAllRolePermissions(): Observable<any> {
    this.fullurl = "";
    this.fullurl = this.global.weburl + "/rolesroutes/find";
    return this.http
      .get<any>(this.fullurl, this.tokenAuthService._options)
      .map((result: any) => result)
      .catch(this.errorHandler);
  }
  getAllUserPermissions(): Observable<any> {
    this.fullurl = "";
    this.fullurl = this.global.weburl + "/usersroutes/find";
    return this.http
      .get<any>(this.fullurl, this.tokenAuthService._options)
      .map((result: any) => result)
      .catch(this.errorHandler);
  }

  getRoles(): Observable<any> {
    this.fullurl = "";
    this.fullurl = this.global.weburl + "/roles/find";
    return this.http
      .get<any>(this.fullurl, this.tokenAuthService._options)
      .map((result: any) => result)
      .catch(this.errorHandler);
  }
  getRoutes(): Observable<any> {
    this.fullurl = "";
    this.fullurl = this.global.weburl + "/routes/find";
    return this.http
      .get<any>(this.fullurl, this.tokenAuthService._options)
      .map((result: any) => result)
      .catch(this.errorHandler);
  }
  updateRolePermission(data: any): Observable<any> {
    this.fullurl = "";
    this.fullurl = this.global.weburl + "/rolesroutes/update";
    return this.http
      .post(this.fullurl, data, this.tokenAuthService._options)
      .map((result: any) => result)
      .catch(this.errorHandler);
  }
  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || "Server Error");
  }
}
