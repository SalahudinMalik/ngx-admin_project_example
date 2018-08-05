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
import { Package } from "../../models/package.model";
import { TokenAuthService } from "./token-auth.service";

@Injectable({
  providedIn: "root"
})
export class PackagesService {
  fullurl: any = "";

  constructor(
    private global: Globals,
    private http: HttpClient,
    private tokenAuthService: TokenAuthService
  ) {}
  savePackage(data: any): Observable<any> {
    this.fullurl = "";
    this.fullurl = this.global.weburl + "/package/create";
    return this.http
      .post(this.fullurl, data, this.tokenAuthService._options)
      .map((result: any) => result)
      .catch(this.errorHandler);
  }
  deletePackage(data: any): Observable<any> {
    this.fullurl = "";
    let options = {
      headers: this.tokenAuthService._options.headers,
      body: { id: data }
    };
    this.fullurl = this.global.weburl + "/package/delete";
    return this.http
      .delete(this.fullurl, options)
      .map((result: any) => result)
      .catch(this.errorHandler);
  }
  updatePackage(data: any): Observable<any> {
    this.fullurl = "";
    this.fullurl = this.global.weburl + "/package/update";
    return this.http
      .post(this.fullurl, data, this.tokenAuthService._options)
      .map((result: any) => result)
      .catch(this.errorHandler);
  }
  getOnePackage(data: any): Observable<Package> {
    this.fullurl = "";
    this.fullurl = this.global.weburl + "/package/findOne/" + data;
    return this.http
      .get<Package>(this.fullurl, this.tokenAuthService._options)
      .map((result: any) => result)
      .catch(this.errorHandler);
  }
  getPackages(): Observable<Package> {
    this.fullurl = "";
    this.fullurl = this.global.weburl + "/package/find";
    return this.http
      .get<Package>(this.fullurl, this.tokenAuthService._options)
      .map((result: any) => result)
      .catch(this.errorHandler);
  }
  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || "Server Error");
  }
}
