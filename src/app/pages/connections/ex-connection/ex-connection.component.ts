import { Component, OnInit } from "@angular/core";
import { LocalDataSource } from "../../../../../node_modules/ng2-smart-table";
import { ConnectionsService } from "../../../@core/data/connections.service";
import { CustomersService } from "../../../@core/data/customers.service";
import { PackagesService } from "../../../@core/data/packages.service";
import { UserService } from "../../../@core/data/appuser.service";
import { async } from "../../../../../node_modules/@angular/core/testing";
import { PermissionsService } from "../../../@core/data/permission.service";

@Component({
  selector: "ex-connection",
  templateUrl: "./ex-connection.component.html",
  styleUrls: ["./ex-connection.component.scss"]
})
export class ExConnectionComponent implements OnInit {
  delete: boolean;
  conn_data: any = [];
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
      delete: this.delete
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true
    }
  };

  source: LocalDataSource = new LocalDataSource();
  constructor(
    private connectionsService: ConnectionsService,
    private customerService: CustomersService,
    private packageService: PackagesService,
    private userService: UserService,
    private role: PermissionsService
  ) {}

  ngOnInit() {
    if (this.role.role.Admin) {
      this.delete = true;
      this.settings.actions.delete = this.delete;
    } else if (this.role.role.Dealer) {
      this.delete = false;
      this.settings.actions.delete = this.delete;
    }
    this.connectionsService.getAllConnRenewal().subscribe((result: any) => {
      if (result.dataArray) {
        console.log(result.dataArray);
        this.source.load(result.dataArray);
      }
    });
  }
}
