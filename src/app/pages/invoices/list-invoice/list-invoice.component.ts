import { Component, OnInit } from '@angular/core';
import { GenericStockService } from '../../../@core/data/generic-stock.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'list-invoice',
  templateUrl: './list-invoice.component.html',
  styleUrls: ['./list-invoice.component.scss']
})
export class ListInvoiceComponent implements OnInit {
  loader: boolean = false;
  settings = {
    pager: {
      display: true,
      perPage: '10',
    },
    mode: "external",
    columns: {
      id: {
        title: "Invoice number"
      },
      customer_name: {
        title: "Customer Name",
      },

      customer_mobile: {
        title: "Customer Mobile",
      },

      invoice_price: {
        title: "Invoice Price",

      },
      invoice_date: {
        title: "Invoice Date",
      },
      paid: {
        title: "Invoice Status",
      },

    },
    actions: {
      add: false,
      delete: true,
      edit: false,
    },

    edit: {
      position: "right",
      editButtonContent: '<i class="nb-loop"></i>'
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true
    }
  };
  source: LocalDataSource = new LocalDataSource();
  constructor(public genericService: GenericStockService,
    private toaster: ToastrService, private datePipe: DatePipe,
    private modalService: NgbModal,
    private router: Router, ) { }

  ngOnInit() {
    this.getList();
  }
  getList() {
    this.loader = true;
    this.genericService.find('/invoices/find').subscribe(data => { this.loader = false; this.source = data.invoices },
      err => {
        this.source.refresh(); this.loader = false; this.toaster.error(err.error.err || err.error)
      });
  }
  public onDeleteConfirm(event): void {
    console.log('delete')
    if (window.confirm('Are you sure you want to delete?')) {
      this.genericService.deleteOne('/invoices/delete', event.data.id).subscribe(data => {
        this.toaster.success('Deleted');
        this.getList();
      }, err => { this.toaster.error(err.error.err || err.error) });
    }
  }
  public onUserRowSelect(event): void {
    this.router.navigate(["/pages/invoices/showInvoice", event.data.id]);
  }
}
