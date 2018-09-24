import { Component, OnInit } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";
import { GenericStockService } from "../../../@core/data/generic-stock.service";
import { ToastrService } from "../../../../../node_modules/ngx-toastr";
import { RenewComponent } from "../modal/renew-modal/renew.component";
import { NgbModal } from "../../../../../node_modules/@ng-bootstrap/ng-bootstrap";
import { Router } from "@angular/router";

@Component({
  selector: "ngx-list-connections",
  templateUrl: "./list-connections.component.html",
  styleUrls: ["./list-connections.component.scss"]
})

export class ListConnectionsComponent implements OnInit {
  loader:boolean = false;
  settings = {
    pager: {
      display: true,
      perPage: '10',
    },
    // mode: "external",
    columns: {
      // id: {
      //   title: "ID"
      // },
      username: {
        title: "Username"
      },
      cnic: {
        title: "CNIC",
      },
      package: {
        title: "Package",
      },
      customer: {
        title: "Customer",
  
      },
      registration_date: {
        title: "Activation Date",
      },
      dealer: {
        title: "Dealer",
        
      },
      status_id: {
        type: "html",
        title: "Status",
        filter: false,
        valuePrepareFunction: (status_id) => {
          if (status_id == 1) {
            return `<span class="fa fa-caret-square-o-right m-0 p-0">Pending&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>`;
          }
          else if (status_id == 15) {
            return `<span class="fa fa-times-circle-o m-0 p-0">Rejected&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>`;
          } 
          else if (status_id == 22) {
            return `<span class="fa fa-refresh m-0 p-0">Package Change&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>`;
          }  
          else {
            return `<span class="fa fa-check m-0 p-0">Actived&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>`;
          }
        }
      },
    },
    actions: {
      add: false,
      delete:false,
      edit:false,
    },

    edit: {
      position: "right",
      editButtonContent: '<i class="nb-loop"></i>'
    },
    delete: {
      // deleteButtonContent: '<i class="nb-trash"></i>'
    }
  };
  source: LocalDataSource = new LocalDataSource();
  constructor(
    public genericService: GenericStockService,
    private toaster: ToastrService,
    private modalService: NgbModal,
    private router: Router,
  ) { }
  ngOnInit() {
    this.getList();
  }
  getList() {
    this.loader = true;
    this.genericService.find('/connection/connectionList').subscribe(data => { this.loader = false; this.source = data.connection },
       err => { this.source.refresh();  this.loader = false; this.toaster.error(err.error.err || err.error)
       });
  }
  onDeleteConfirm(event): void {
    this.genericService.deleteOne('/connection/delete', event.data.id).subscribe(data => {
      this.toaster.success('Deleted');
      this.getList();
    }, err => { this.toaster.error(err.error.err || err.error) });
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
        this.getList();
      },
    );
  }
  public onUserRowSelect(event): void {
    this.router.navigate(["/pages/connections/showConnection", event.data.id]);
  }
}