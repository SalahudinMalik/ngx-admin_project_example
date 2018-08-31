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
  settings = {
    pager: {
      display: true,
      perPage: '10',
    },
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
        type: "html",
        title: "Status",
        filter: false,
        valuePrepareFunction: (status_id) => {
          if (status_id == 1) {
            return `<span>Pending&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>`;
          }
          else if (status_id == 15) {
            return `<span>Rejected&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>`;
          } 
          else if (status_id == 22) {
            return `<span>Package Change&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>`;
          }  
          else {
            return `<span>Actived&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>`;
          }
        }
      },
      customers: {
        title: "Customer ID",
        type: "html",
        filter: false,
        valuePrepareFunction: (customers) => {
            return `<span>`+customers.id+`&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>`;
        }
      }
    },
    actions: {
      add: false,
      delete:false,
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
    this.genericService.find('/connection/find').subscribe(data => { this.source = data.connection },
       err => { this.source.refresh(); this.toaster.error(err.error.err || err.error)
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