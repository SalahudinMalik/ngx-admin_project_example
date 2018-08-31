import { Component, OnInit } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";
import { Router } from "@angular/router";
import { GenericStockService } from "../../../@core/data/generic-stock.service";
import { ToastrService } from "../../../../../node_modules/ngx-toastr";

@Component({
  selector: 'ngx-list-basestation',
  templateUrl: './list-basestation.component.html',
  styleUrls: ['./list-basestation.component.scss']
})
export class ListBaseStationComponent implements OnInit {
  settings = {
    pager: {
      display: true,
      perPage: '10',
    },
    columns: {
      name: {
        title: 'Name',
        filter: true,
      },
      lat: {
        title: 'Latitude',
        filter: true,
      },
      long: {
        title: 'Longitude',

      },
      bandwidth: {
        title: 'Band Width',

      },
      maxusers: {
        title: 'Max User',
      }
    },
    actions: {
      add: false,
      edit: false
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },

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
    this.genericService.find('/basestation/find').subscribe(data => {
      if (data.basestation) { this.source = data.basestation } else { this.toaster.error(data.message); }
    }, err => { this.toaster.error(err) });
  }
  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      this.genericService.deleteOne('/basestation/delete', event.data.id).subscribe(data => {
        if (data.name == 'Custom Error') { this.toaster.error(data.message) } else {
          this.toaster.success('Deleted');
          this.getList();
        }
      }, err => { this.toaster.error(err) });
    }
  }
  public onUserRowSelect(event): void {
    this.router.navigate(['/pages/basestation/showBasestation', event.data.id]);
  }

}