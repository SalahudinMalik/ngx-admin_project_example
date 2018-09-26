import { Injectable } from '@angular/core'

@Injectable({
    providedIn: 'root'
})
export class ShareDataService {
    public sharedObj:any;
    constructor(){
        
    }
    
    public set setObj(v : any) {
        this.sharedObj = v;
    }
    
    public get getObj() : any {
        return this.sharedObj;
    }
    
    
}
