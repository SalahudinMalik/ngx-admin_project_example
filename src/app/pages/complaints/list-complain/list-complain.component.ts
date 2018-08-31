import { Component, OnInit } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";
import { Router } from "@angular/router";
import { GenericStockService } from "../../../@core/data/generic-stock.service";
import { ToastrService } from "../../../../../node_modules/ngx-toastr";

@Component({
  selector: "ngx-list-complain",
  templateUrl: "./list-complain.component.html",
  styleUrls: ["./list-complain.component.scss"]
})
export class ListComplainComponent implements OnInit {
  settings = {
    pager: {
      display: true,
      perPage: '10',
    },
    columns: {
      id: {
        title: "ID",
        filter: true
      },
      subject: {
        title: "Complaint Subject",
        filter: true
      },
      description: {
        title: "Complaint Description"
      }
    },
    actions: {
      add: false,
      edit: false,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true
    }
  };
  source: LocalDataSource = new LocalDataSource();
  constructor(
    private router: Router,
    public genericService: GenericStockService,
    private toaster: ToastrService
  ) { }
  ngOnInit() {
    this.getList();
  }
  getList() {
    this.genericService.find('/complaints/find').subscribe(data => {
      if (data.complaints) { this.source = data.complaints } else { this.toaster.error(data.msg); }
    }, err => { this.toaster.error(err) });
  }
  onDeleteConfirm(event): void {
    this.genericService.deleteOne('/complaints/delete', event.data.id).subscribe(data => {
      if (data.name == 'Custom Error') { this.toaster.error(data.message) } else {
        this.toaster.success('Deleted');
        this.getList();
      }
    }, err => { this.toaster.error(err) });
  }
  public onUserRowSelect(event): void {
    this.router.navigate(["/pages/complaints/showComplain", event.data.id]);
  }

}