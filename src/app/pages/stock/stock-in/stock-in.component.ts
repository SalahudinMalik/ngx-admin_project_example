import { Component, OnInit } from '@angular/core';
import { GenericStockService } from '../../../@core/data/generic-stock.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LocalDataSource } from 'ng2-smart-table';
import { AddStockIn } from './add-stock-in.component';
import { DatePipe } from '../../../../../node_modules/@angular/common';

@Component({
  selector: 'stock-in',
  templateUrl: './stock-in.component.html',
  styleUrls: ['./stock-in.component.scss']
})
export class StockInComponent implements OnInit {
  source: LocalDataSource = new LocalDataSource();
  settings = {
    columns: {
      purchase_date: {
        title: "Date",
        filter: true,
        valuePrepareFunction: (purchase_date) => { 
          var raw = new Date(purchase_date);
          var formatted = this.datePipe.transform(raw, 'dd MMM yyyy');
          return formatted; 
        }
      },
      cost_price: {
        title: "Price",
        filter: true
      },
      quantity: {
        title: "Quantity",
        filter: true
      },
      invoice_no: {
        title: "Invoice No",
        filter: true
      },
      cargo_service: {
        title: "Cargo Service",
        filter: true
      },
      bilty_no: {
        title: "Bilty No",
        filter: true
      },
      // status_id: {
      //   title: "Status Id",
      //   filter: true
      // },
      items: {
        title: "Items",
        filter: true
      },
      warehouse: {
        title: "Ware House",
        filter: true
      },
      supplier: {
        title: "Supplier",
        filter: true
      },
    },
    actions: {
      add: false,
      edit: false
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true
    }
  };
  constructor(private modalService: NgbModal, 
    private datePipe: DatePipe,
    public genericStockService: GenericStockService) { }

  public ngOnInit() {
    this.genericStockService.find('/stockin/find').subscribe(data => {
      this.source.load(data.stockIn);
    }, err => {
    });
  }

  public addWareHouse() {
    const activeModal = this.modalService.open(AddStockIn, {
      size: "lg",
      container: "nb-layout"
    });
    activeModal.result.then(
      (result1: any) => {
        this.ngOnInit();
      }
    );
  }
  public deleteWareHouse($event) {
    if (window.confirm("Are you sure you want to delete?")) {
      $event.confirm.resolve();
      this.genericStockService.deleteOne('/stockin/delete', $event.data.id).subscribe(data => {
      });
    } else {
      $event.confirm.reject();
    }
  }
}