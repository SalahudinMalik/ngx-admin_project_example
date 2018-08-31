import { Component, OnInit } from '@angular/core';
import { GenericStockService } from '../../../@core/data/generic-stock.service';
import { LocalDataSource } from '../../../../../node_modules/ng2-smart-table';
import { ToastrService } from '../../../../../node_modules/ngx-toastr';

@Component({
  selector: 'rules-list',
  templateUrl: './rules-list.component.html',
  styleUrls: ['./rules-list.component.scss']
})
export class RulesListComponent implements OnInit {
  public source: LocalDataSource = new LocalDataSource();
  public settings = {
    pager : {
      display : true,
      perPage: '10',
      },
    columns: {
      id: {
        title: "ID",
        filter: true
      },
      wf_number: {
        title: "Work FLow No"
      },
      createdAt: {
        title: "Creation Date",
        filter: true
      },
      credit: {
        title: "Credit Formula "
      },
      debit: {
        title: "Debit Formula"
      }
    },
    actions: {
      add: false,
      edit: false
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true
    }

  }
  constructor(public genericService: GenericStockService, public toaster: ToastrService) { }

  ngOnInit() {
    this.getWFs();
  }
  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      this.genericService.deleteOne('/workflow/delete', event.data.id).subscribe(data => {
        if (data.name == 'Custom Error') { this.toaster.error(data.message) } else {
          this.toaster.success('Deleted');
          this.getWFs();
        }
      }, err => { this.toaster.error(err) });
    }
  }
  getWFs() {
    this.genericService.find('/workflow/find').subscribe(data => {
      if (data.workflow) { this.source = data.workflow } else {
        this.toaster.error(data.msg);
      }
    }, err => { this.toaster.error(err) });
  }

}
