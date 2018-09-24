import { Component, OnInit } from '@angular/core';
import { GenericStockService } from '../../../@core/data/generic-stock.service';
import { LocalDataSource } from '../../../../../node_modules/ng2-smart-table';
import { ToastrService } from '../../../../../node_modules/ngx-toastr';
import { DatePipe } from '../../../../../node_modules/@angular/common';
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
        filter: true,
        valuePrepareFunction: (purchase_date) => {
          var raw = new Date(purchase_date);
          var formatted = this.datePipe.transform(raw, 'dd MMM yyyy');
          return formatted;
        }
      },
      credit: {
        title: "Credit Formula "
      },
      debit: {
        title: "Debit Formula"
      },
      account: {
        title: "Account Name",
        type:"html",
        filter:true,
        valuePrepareFunction:(account) =>{
          return account.name;
        },
        filterFunction(cell?: any, search?: string): boolean {          
          // if (cell >= search || search === '') {
          //   return true;
          // } else {
          //   return false;
          // }       
          if(cell.toLowerCase().indexOf(search) > -1)
            return true;
          return false;   
        }

      },
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
  constructor(public genericService: GenericStockService,
    private datePipe: DatePipe, public toaster: ToastrService) { }

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
