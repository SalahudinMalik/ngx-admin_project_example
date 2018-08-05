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
import { Connections } from "../../models/connections.model";
import { TokenAuthService } from "./token-auth.service";

@Injectable({
  providedIn: "root"
})
export class ConnectionsService {
  fullurl: any = "";
  constructor(
    private global: Globals,
    private http: HttpClient,
    private tokenAuthService: TokenAuthService
  ) {}

  getAllConnections(): Observable<any> {
    this.fullurl = "";
    this.fullurl = this.global.weburl + "/connection/find";
    return this.http
      .get<any>(this.fullurl, this.tokenAuthService._options)
      .map((result: any) => result)
      .catch(this.errorHandler);
  }
  saveConnection(data: any): Observable<any> {
    this.fullurl = "";
    this.fullurl = this.global.weburl + "/connection/create";
    return this.http
      .post(this.fullurl, data, this.tokenAuthService._options)
      .map((result: any) => result)
      .catch(this.errorHandler);
  }
  updateConnection(data: any): Observable<any> {
    this.fullurl = "";
    this.fullurl = this.global.weburl + "/connection/update";
    return this.http
      .post(this.fullurl, data, this.tokenAuthService._options)
      .map((result: any) => result)
      .catch(this.errorHandler);
  }
  deleteConnection(data: any): Observable<any> {
    this.fullurl = "";
    let options = {
      headers: this.tokenAuthService._options.headers,
      body: { id: data }
    };
    this.fullurl = this.global.weburl + "/connection/delete";
    return this.http
      .delete(this.fullurl, options)
      .map((result: any) => result)
      .catch(this.errorHandler);
  }
  getOneConnection(data: any): Observable<Connections> {
    this.fullurl = "";
    this.fullurl = this.global.weburl + "/connection/findOne/" + data;
    return this.http
      .get<Connections>(this.fullurl, this.tokenAuthService._options)
      .map((result: any) => result)
      .catch(this.errorHandler);
  }
  getAllConnRenewal(dealer_id?: any): Observable<any> {
    this.fullurl = "";
    // this.fullurl = this.global.weburl + '/connection/find';
    this.fullurl =
      dealer_id === undefined
        ? this.global.weburl + "/connrenewal/finddata"
        : (this.fullurl =
            this.global.weburl + "/connrenewal/finddata/" + dealer_id);

    return this.http
      .get<any>(this.fullurl, this.tokenAuthService._options)
      .map((result: any) => result)
      .catch(this.errorHandler);
  }

  getTimeline(id: number): Observable<any> {
    const data = {
      id: id
    };
    this.fullurl = "";
    this.fullurl = this.global.weburl + "/connection/connectionTimeline";
    return this.http
      .post(this.fullurl, data, this.tokenAuthService._options)
      .map((result: any) => result)
      .catch(this.errorHandler);
  }

  renewConnection(data: any): Observable<any> {
    this.fullurl = "";
    this.fullurl = this.global.weburl + "/connrenewal/create";
    return this.http
      .post(this.fullurl, data, this.tokenAuthService._options)
      .map((result: any) => result)
      .catch(this.errorHandler);
  }
  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || "Server Error");
  }
}
