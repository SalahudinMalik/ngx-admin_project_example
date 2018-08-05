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
import { Complaints } from "../../models/complaints.model";
import { TokenAuthService } from "./token-auth.service";

@Injectable({
  providedIn: "root"
})
export class ComplaintsService {
  fullurl: any = "";
  token: any;
  private _options = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };
  constructor(
    private global: Globals,
    private http: HttpClient,
    private authService: NbAuthService,
    private tokenAuthService: TokenAuthService
  ) {
    this.token = authService.getToken();
    this.token = this.token.value.token;
  }
  // saveComplaint(data: any): Observable<any> {
  //   this.fullurl = "";
  //   this.fullurl =
  //     this.global.weburl + "/complaints/create" + "?access_token=" + this.token;
  //   // this.fullurl = this.global.weburl + "auth/login";
  //   return this.http
  //     .post(this.fullurl, data, this._options)
  //     .map((result: any) => result)
  //     .catch(this.errorHandler);
  // }

  saveComplaint(data: any): Observable<any> {
    this.fullurl = "";
    this.fullurl = this.global.weburl + "/complaints/create";
    return this.http
      .post(this.fullurl, data, this.tokenAuthService._options)
      .map((result: any) => result)
      .catch(this.errorHandler);
  }
  deleteComplaint(data: any): Observable<any> {
    this.fullurl = "";
    let options = {
      headers: this.tokenAuthService._options.headers,
      body: { id: data }
    };
    this.fullurl = this.global.weburl + "/complaints/delete";
    return this.http
      .delete(this.fullurl, options)
      .map((result: any) => result)
      .catch(this.errorHandler);
  }
  getOneComplaint(data: any): Observable<Complaints> {
    this.fullurl = "";
    this.fullurl =
      this.global.weburl +
      "/complaints/" +
      data +
      "?access_token=" +
      this.token;
    // this.fullurl = this.global.weburl + "auth/login";
    return this.http
      .get<Complaints>(this.fullurl, this._options)
      .map((result: any) => result)
      .catch(this.errorHandler);
  }

  getAllComplaints(): Observable<Complaints> {
    this.fullurl = "";
    this.fullurl = this.global.weburl + "/complaints/find";
    return this.http
      .get<Complaints>(this.fullurl, this.tokenAuthService._options)
      .map((result: any) => result)
      .catch(this.errorHandler);
  }
  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || "Server Error");
  }
}
