import { Injectable, OnInit } from "@angular/core";
import { GenericStockService } from "./generic-stock.service";
@Injectable({
    providedIn: "root"
})
export class ChartofAccountsService implements OnInit{
public chartOfAcounts:any;
    constructor( public genericService:GenericStockService){}
ngOnInit(){ 
    // this.genericService.find('account');

}
}