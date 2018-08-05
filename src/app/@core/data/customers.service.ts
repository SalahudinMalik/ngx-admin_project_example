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
export class CustomersService {
  fullurl: any = "";

  constructor(
    private global: Globals,
    private http: HttpClient,
    private tokenAuthService: TokenAuthService
  ) {}
  saveCustomer(data: any): Observable<any> {
    this.fullurl = "";
    this.fullurl = this.global.weburl + "/customer/create";
    return this.http
      .post(this.fullurl, data, this.tokenAuthService._options)
      .map((result: any) => result)
      .catch(this.errorHandler);
  }
  updateCustomer(data: any): Observable<any> {
    this.fullurl = "";
    this.fullurl = this.global.weburl + "/customer/update";
    return this.http
      .post(this.fullurl, data, this.tokenAuthService._options)
      .map((result: any) => result)
      .catch(this.errorHandler);
  }
  deleteCustomer(data: any): Observable<any> {
    this.fullurl = "";
    let options = {
      headers: this.tokenAuthService._options.headers,
      body: { id: data }
    };
    this.fullurl = this.global.weburl + "/customer/delete";
    return this.http
      .delete(this.fullurl, options)
      .map((result: any) => result)
      .catch(this.errorHandler);
  }
  getAllCustomers(): Observable<Customer> {
    this.fullurl = "";
    this.fullurl = this.global.weburl + "/customer/find";
    return this.http
      .get<Customer>(this.fullurl, this.tokenAuthService._options)
      .map((result: any) => result)
      .catch(this.errorHandler);
  }
  getOneCustomer(data: any): Observable<Customer> {
    this.fullurl = "";
    this.fullurl = this.global.weburl + "/customer/findOne/" + data;
    return this.http
      .get<Customer>(this.fullurl, this.tokenAuthService._options)
      .map((result: any) => result)
      .catch(this.errorHandler);
  }
  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || "Server Error");
  }
}
