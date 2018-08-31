import { Component, OnInit } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";
import { Router } from "@angular/router";
import { ToastrService } from "../../../../../node_modules/ngx-toastr";
import { GenericStockService } from "../../../@core/data/generic-stock.service";

@Component({
  selector: "ngx-customers-list",
  templateUrl: "./customers-list.component.html",
  styleUrls: ["./customers-list.component.scss"]
})
export class CustomersListComponent implements OnInit {
  delete: any;
  source: LocalDataSource = new LocalDataSource();
  constructor(
    private router: Router,
    public genericService: GenericStockService,
    private toaster: ToastrService
  ) {
  }
  settings = {
    pager: {
      display: true,
      perPage: "10"
    },
    columns: {
      id: {
        title: "Customer ID"
      },
      first_name: {
        title: "First Name"
      },
      last_name: {
        title: "Last Name"
      },
      cnic: {
        title: "CNIC No"
      },
      mobile: {
        title: "Mobile No"
      },
      email: {
        title: "Email"
      },
      customerverify: {
        title: "Verification",
        type: "html",
        filter: false,
        valuePrepareFunction: (customerverify) => {
          // if (customerverify) {

          // } else {
          //   return `<span>Submitted&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>`;
          // }
          let phone, card;
          if (customerverify.length > 1) {
            for (let c of customerverify) {
              if (c.doc_type == 1) {
                if (c.is_verified)
                  phone = '<span class="nb-phone float-left text-success"></span>'
                else
                  phone = '<span class="nb-phone float-left"></span>'
              }
              else if (c.doc_type == 2) {
                if (c.is_verified)
                  card = '<span class="ion-card float-right text-success"></span>'
                else
                  card = '<span class="ion-card float-right"></span>'
              }
            }
            // let result = '<span class="nb-phone float-left '+customerverify.cod+'></span> <span class="ion-card float-right"></span>';
            return card + phone;
          }
          else{
            return '<span class="nb-phone float-left"></span> <span class="ion-card float-right"></span>';
          }
        }
      },

    },
    actions: {
      add: false,
      edit: false,
      delete: this.delete
    },
    delete: {
      position: "right",
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true
    }
  };
  ngOnInit() {
    this.getList();
  }
  getList() {
    this.genericService.find('/customer/find').subscribe(data => {
      this.source = data.customers
    }, err => { this.toaster.error(err.error.err) });
  }
  onDeleteConfirm(event): void {
    this.genericService.deleteOne('/customer/delete', event.data.id).subscribe(data => {
      this.toaster.success('Deleted');
      this.getList();
    }, err => { this.toaster.error(err.error.err) });
  }
  public onUserRowSelect(event): void {
    this.router.navigate(["/pages/customers/showCustomer", event.data.id]);
  }
}
