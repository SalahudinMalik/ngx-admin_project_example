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
import { DealerPackage } from "../../models/dealerPackage.model";
import { TokenAuthService } from "./token-auth.service";
@Injectable({
  providedIn: "root"
})
export class DealerPackageService {
  fullurl: any = "";
  constructor(
    private global: Globals,
    private http: HttpClient,
    private tokenAuthService: TokenAuthService
  ) {}
  saveDealerPackages(data: any): Observable<any> {
    this.fullurl = "";
    this.fullurl = this.global.weburl + "/dealerpackages/create";
    return this.http
      .post(this.fullurl, data, this.tokenAuthService._options)
      .map((result: any) => result)
      .catch(this.errorHandler);
  }
  deleteDealerPackages(data: any): Observable<any> {
    this.fullurl = "";
    let options = {
      headers: this.tokenAuthService._options.headers,
      body: { id: data }
    };
    this.fullurl = this.global.weburl + "/dealerpackages/delete";
    return this.http
      .delete(this.fullurl, options)
      .map((result: any) => result)
      .catch(this.errorHandler);
  }
  getAllDealerPackages(dealer_id?: any): Observable<DealerPackage> {
    this.fullurl = "";
    let options = {
      headers: this.tokenAuthService._options.headers,
      body: { dealer_id: dealer_id }
    };
    this.fullurl = this.global.weburl + "/dealerpackages/find";

    return this.http
      .get<DealerPackage>(this.fullurl, options)
      .map((result: any) => result)
      .catch(this.errorHandler);
  }
  getOneDealerPackages(data: any): Observable<DealerPackage> {
    this.fullurl = "";
    this.fullurl = this.global.weburl + "/dealerpackages/findOne/" + data;
    return this.http
      .get<DealerPackage>(this.fullurl, this.tokenAuthService._options)
      .map((result: any) => result)
      .catch(this.errorHandler);
  }
  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || "Server Error");
  }
}
