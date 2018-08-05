import { Component, OnInit } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";
import { Router } from "@angular/router";
import { DatePipe } from "@angular/common";
import { Http } from "@angular/http";
import { NbAuthService } from "@nebular/auth";
import { ConnectionsService } from "../../../@core/data/connections.service";
import { Connections } from "../../../models/connections.model";
import { Globals } from "../../../../Globals";
import { ToastrService } from "ngx-toastr";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { RenewComponent } from "../modal/renew-modal/renew.component";
import { PermissionsService } from "../../../@core/data/permission.service";

@Component({
  selector: "ngx-list-connections",
  templateUrl: "./list-connections.component.html",
  styleUrls: ["./list-connections.component.scss"]
})
export class ListConnectionsComponent implements OnInit {
  data: Connections[] = [];
  delete: any;
  settings = {
    // pager : {
    //   display : true,
    //   perPage: '10',
    // },
    mode: "external",
    columns: {
      id: {
        title: "ID"
      },
      address: {
        title: "Address"
      },
      is_wireless: {
        title: "Wireless?"
      },
      status_id: {
        title: "Status"
      },
      customer_id: {
        title: "Customer ID"
      }
    },
    actions: {
      add: false,
      delete: this.delete
    },

    edit: {
      position: "right",
      editButtonContent: '<i class="nb-loop"></i>'
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>'
    }
  };

  source: LocalDataSource;
  token: any;

  constructor(
    private service: ConnectionsService,
    private router: Router,
    private datePipe: DatePipe,
    private http: Http,
    private globals: Globals,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private authService: NbAuthService,
    private role: PermissionsService
  ) {
    this.token = authService.getToken();
    this.token = this.token.value.token;
    this.source = new LocalDataSource();

    // this.source = new ServerDataSource(http,
    //   {
    //     endPoint: this.globals.weburl + '/connection/find',
    //   },
    // );
  }

  ngOnInit() {
    if (this.role.role.Admin) {
      this.delete = true;
      this.settings.actions.delete = this.delete;
    } else if (this.role.role.Dealer) {
      this.delete = false;
      this.settings.actions.delete = this.delete;
    }
    this.service.getAllConnections().subscribe(data => {
      this.source.load(data.connection);
    });
  }

  refresh(): any {
    this.ngOnInit();
  }
  deleteConnection(event): void {
    if (window.confirm("Are you sure you want to delete?")) {
      this.service.deleteConnection(event.data.id).subscribe(
        data => {
          this.toastr.success("Deleted Successfully");
        },
        error => {
          this.toastr.error("Deletion Error");
        }
      );
    } else {
    }
  }

  renewModal(event): void {
    const activeModal = this.modalService.open(RenewComponent, {
      size: "lg",
      container: "nb-layout"
    });

    activeModal.componentInstance.modalHeader = "Renew";
    activeModal.componentInstance.modalContent = event.data;
    activeModal.result.then(
      () => {
        this.refresh();
      },
      () => {
        console.log("Backdrop click");
      }
    );
  }

  public onUserRowSelect(event): void {
    console.log(event);
    this.router.navigate(["/pages/connections/showConnection", event.data.id]);
  }
}
