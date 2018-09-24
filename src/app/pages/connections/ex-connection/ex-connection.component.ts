import { Component, OnInit } from "@angular/core";
import { LocalDataSource } from "../../../../../node_modules/ng2-smart-table";
import { PermissionsService } from "../../../@core/data/permission.service";
import { GenericStockService } from "../../../@core/data/generic-stock.service";
import { ToastrService } from "../../../../../node_modules/ngx-toastr";

@Component({
  selector: "ex-connection",
  templateUrl: "./ex-connection.component.html",
  styleUrls: ["./ex-connection.component.scss"]
})
export class ExConnectionComponent implements OnInit {
  delete: boolean;
  loader: boolean = false;
  settings = {
    pager: {
      display: true,
      perPage: "10"
    },
    columns: {
      client_name: {
        title: "Client Name"
      },
      area_dealer: {
        title: "Area Dealer"
      },
      activation_date: {
        title: "Activation Date"
      },
      expiration_date: {
        title: "Expiration Date"
      },
      contact: {
        title: "Contact"
      },
      package: {
        title: "Package"
      }
    },
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true
    }
  };
  source: LocalDataSource = new LocalDataSource();
  constructor(
    private genericService: GenericStockService,
    private role: PermissionsService,
    public toaster: ToastrService
  ) {

  }

  ngOnInit() {
    if (this.role['tokenAuthService'].user.user.role.name == 'Admin') {
      this.delete = true;
      this.settings.actions.delete = this.delete;
    } else if (this.role['tokenAuthService'].user.user.role.name == 'Dealer') {
      this.delete = false;
      this.settings.actions.delete = this.delete;
    }
    this.getList();
  }
  getList() {
    this.loader = true;
    this.genericService.find('/connrenewal/finddata').subscribe(data => {
      if (data.dataArray) { this.source = data.dataArray }
      else {
        this.toaster.error(data.msg);
        
      }
      this.loader = false;
    },
      err => { this.toaster.error(err.error.err || err.error); this.loader = false; });
  }
}
