import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "../../../../node_modules/@angular/common/http";
import { Globals } from "../../../Globals";
import { TokenAuthService } from "./token-auth.service";
import { ToastrService } from "../../../../node_modules/ngx-toastr";

@Injectable({
    providedIn: "root"
})
export class FileUploadService {
    constructor(private http: HttpClient, private globals: Globals, public tokenAuthService: TokenAuthService, public toaster: ToastrService) { }
    postFile(url: string, fileToUpload: any, frbk: string, customerId) {
        const endpoint = url + '?id=' + customerId + '&file_name=' + frbk;
        const formData: FormData = new FormData();
        formData.append('image', fileToUpload, fileToUpload.name);
        const options = { headers: new HttpHeaders({ 'authorization': 'Bearer ' + this.tokenAuthService.token }) };
        return this.http
            .post(this.globals.weburl + endpoint, formData, options)
            .map(() => { return true; });
    }
}