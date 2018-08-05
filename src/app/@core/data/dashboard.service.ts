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
import { Customer } from "../../models/customer.model";
import { TokenAuthService } from "./token-auth.service";
@Injectable({
  providedIn: "root"
})
export class DashboardService {
  fullurl: any = "";

  constructor(
    private global: Globals,
    private http: HttpClient,
    private tokenAuthService: TokenAuthService
  ) {}

  getTotalCustomers(): Observable<any> {
    this.fullurl = "";
    this.fullurl = this.global.weburl + "/dashboard/totalCustomer";
    return this.http
      .get<any>(this.fullurl, this.tokenAuthService._options)
      .map((result: any) => result)
      .catch(this.errorHandler);
  }

  getDealerCustomers(): Observable<any> {
    this.fullurl = "";
    this.fullurl = this.global.weburl + "/dashboard/customerByDealer";
    return this.http
      .get<any>(this.fullurl, this.tokenAuthService._options)
      .map((result: any) => result)
      .catch(this.errorHandler);
  }
  getPercentageExpiring(days: number): Observable<any> {
    const data = {
      days: +days
    };
    this.fullurl = "";
    this.fullurl = this.global.weburl + "/dashboard/customerexp";
    return this.http
      .post(this.fullurl, data, this.tokenAuthService._options)
      .map((result: any) => result)
      .catch(this.errorHandler);
  }
  getTotalExpiring(days: any): Observable<any> {
    const data = {
      days: +days
    };
    this.fullurl = "";
    this.fullurl = this.global.weburl + "/dashboard/customerexpire";
    return this.http
      .post(this.fullurl, data, this.tokenAuthService._options)
      .map((result: any) => result)
      .catch(this.errorHandler);
  }

  getTotalMonth(months: number): Observable<any> {
    const data = {
      month: months
    };
    this.fullurl = "";
    this.fullurl = this.global.weburl + "/dashboard/monthTimeline";
    return this.http
      .post(this.fullurl, data, this.tokenAuthService._options)
      .map((result: any) => result)
      .catch(this.errorHandler);
  }
  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || "Server Error");
  }
}
