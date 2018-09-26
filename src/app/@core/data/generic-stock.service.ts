import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpRequest } from "@angular/common/http";
// import { any } from "../../models/stock.model";
import { Globals } from "../../../Globals";
import { TokenAuthService } from "./token-auth.service";
import { ToastrService } from "../../../../node_modules/ngx-toastr";
// import { request } from "https";

@Injectable({
    providedIn: "root"
})
export class GenericStockService {
    constructor(private http: HttpClient, private globals: Globals, public tokenAuthService: TokenAuthService, public toaster: ToastrService) { }
    create(url, data) {
        return this.http
            .post<any>(this.globals.weburl + url, data, this.tokenAuthService._options)
            .map((result: any) => result);
    }
    customerReport(url, data) {
        let options = {
            headers: new HttpHeaders({ 'content-type': 'application/json' }),
            body: {"template":{ "recipe" : "chrome-pdf","shortid":"HJfm6LPNQ"},"data":{"customer": [
                {
                    "createdAt": 1536566981492,
                    "updatedAt": 1536566981492,
                    "id": 5,
                    "first_name": "Saad",
                    "last_name": "Muhammad Khan",
                    "email": "",
                    "username": "3038687887",
                    "password": "8199791",
                    "mobile": "03038687887",
                    "customer_verified": true,
                    "manually_mobile_verified": true,
                    "cnic": "31303-8199791-3",
                    "status_id": 16,
                    "createdBy": 2
                }]}}
          };
          
        return this.http
            .post<any>(url,options.body ,options)
            .map((result: any) => result);

        // let options = {
        //     headers: new HttpHeaders({ 'content-type': 'application/json'}),
        //     body: { json: data }
        //   };
        // // var options:HttpRequest<any> = {
        // //     // uri: 'https://hl.jsreportonline.net/api/report'
        // //     uri: "http://localhost:5488/api/report",
        // //     method: 'POST',
        // //     json: data,
      
        // //   }
        // //   return this.http.request<any>(options).map((result: any) => result);
        // // return this.http
        // //     .post<any>(url, options ,options)
        // //         .map((result: any) => result);
        // return this.http.post(url, data , options).map(function (response) {
        //     return response;
        // });
    }
    update(url, data) {
        return this.http
            .post<any>(this.globals.weburl + url, data, this.tokenAuthService._options)
            .map((result: any) => result);
    }

    find(url) {
        return this.http
            .get<any>(this.globals.weburl + url, this.tokenAuthService._options)
            .map((result: any) => result)
    }

    findOne(url: string, id: number) {
        return this.http
            .get<any>(this.globals.weburl + url + '/' + id, this.tokenAuthService._options)
            .map((result: any) => result)
    }

    deleteOne(url, id) {
        let options = {
            headers: this.tokenAuthService._options.headers,
            body: { id: id }
        };
        return this.http
            .delete<any>(this.globals.weburl + url, options)
            .map((result: any) => result);
    }
}