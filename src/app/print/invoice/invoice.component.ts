import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GenericStockService } from '../../@core/data/generic-stock.service';
import { ShareDataService } from '../../@core/data/share-data.service';
@Component({
  selector: 'invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {

  id: any;
  customerdetails: any;
  constructor(
    private shareDataService:ShareDataService,

  ) {
    this.customerdetails = this.shareDataService.getObj;
    // console.log(JSON.stringify(localStorage.getItem('printInvoice')));
    // this.customerdetails = JSON.parse(localStorage.getItem('printInvoice'));
    console.log('shared Obj' , this.customerdetails)
    setTimeout(() => {
      window.print()
    }, 1000);
    localStorage.removeItem('printInvoice');
  }
  ngOnInit() {

  }
}
