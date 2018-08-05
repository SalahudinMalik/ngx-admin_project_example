import { Injectable } from "@angular/core";
import { Globals } from "../../../Globals";
import { TokenAuthService } from "./token-auth.service";
import { Http } from "../../../../node_modules/@angular/http";
import { HttpErrorResponse } from "../../../../node_modules/@angular/common/http";
import { Observable } from "../../../../node_modules/rxjs";
import { Headers } from '@angular/http';
@Injectable({
    providedIn: 'root'
})
export class MapService {
    apiUrl: string;
    constructor(private globals: Globals,
        private tokenAuthService: TokenAuthService,
        private http: Http) {
    }
    public createMapOfDealer(data): Observable<any> {
        this.apiUrl = this.globals.weburl + '/dealermap/create';
        const token = this.tokenAuthService.token;
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer ' + token);
        return this.http.post(
            this.apiUrl, data, { headers: headers }).map((result: any) => result);
    }
    public findAll(): Observable<any> {
        this.apiUrl = this.globals.weburl + '/dealermap/find';
        const token = this.tokenAuthService.token;
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer ' + token);
        return this.http.get(
            this.apiUrl, { headers: headers }).map((result: any) => result);

        // return this.http.get(this.apiUrl, this.tokenAuthService._options)
        //     .map((result: any) => result);
    }
    public findOne(id): Observable<any> {
        this.apiUrl = this.globals.weburl + '/dealermap/findOne/' + id;
        const token = this.tokenAuthService.token;
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer ' + token);
        return this.http.get(
            this.apiUrl, { headers: headers }).map((result: any) => result);

        // return this.http.get(this.apiUrl, this.tokenAuthService._options)
        //     .map((result: any) => result);
    }
}