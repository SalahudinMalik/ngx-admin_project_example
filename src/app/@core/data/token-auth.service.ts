import { Injectable } from "@angular/core";
import { NbAuthService, NbAuthToken, NbAuthJWTToken } from "@nebular/auth";
import { HttpHeaders } from "../../../../node_modules/@angular/common/http";

@Injectable({
    providedIn: 'root',
})
export class TokenAuthService {
    token: any;
    _options: any;
    user: any;
    userRole:number;

    constructor(private authService: NbAuthService) { }
    getToken() {
        this.token = this.authService.getToken();
        this.token = this.token.value.token;
        this.getPayload();
        this._options = { headers: new HttpHeaders({ 'content-type': 'application/json', 'authorization': 'Bearer ' + this.token }) };
    }
    getPayload() {
        this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
            if (token.isValid()) {
                this.user = token.getPayload();
            }
        });
    }
}