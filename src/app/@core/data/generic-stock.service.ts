import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
// import { any } from "../../models/stock.model";
import { Globals } from "../../../Globals";
import { TokenAuthService } from "./token-auth.service";
import { ToastrService } from "../../../../node_modules/ngx-toastr";

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