import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from '../../../../../node_modules/ng2-smart-table';
import { NgbModal } from '../../../../../node_modules/@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '../../../../../node_modules/@angular/common';
import { GenericStockService } from '../../../@core/data/generic-stock.service';
import { AddStockOut } from './add-stock-out.component';

@Component({
  selector: 'stock-out',
  templateUrl: './stock-out.component.html',
  styleUrls: ['./stock-out.component.scss']
})
export class StockOutComponent implements OnInit {
  source: LocalDataSource = new LocalDataSource();
  settings = {
    columns: {
      sale_price: {
        title: "Price",
        filter: true
      },
      sale_date: {
        title: "Sales Date",
        filter: true,
        valuePrepareFunction: (purchase_date) => {
          var raw = new Date(purchase_date);
          var formatted = this.datePipe.transform(raw, 'dd MMM yyyy');
          return formatted;
        }
      },
      quantity: {
        title: "Quantity",
        filter: true
      },
      area: {
        title: "Area",
        filter: true
      },
      description: {
        title: "Description",
        filter: true
      },
      items: {
        title: "Item",
        filter: true
      },
      warehouse: {
        title: "Ware House",
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
    this.genericStockService.find('/stockout/find').subscribe(data => {
      this.source.load(data.stockIn);
    }, err => {
    });
  }

  public addWareHouse() {
    const activeModal = this.modalService.open(AddStockOut, {
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
      this.genericStockService.deleteOne('/stockout/delete', $event.data.id).subscribe(data => {
      });
    } else {
      $event.confirm.reject();
    }
  }
}