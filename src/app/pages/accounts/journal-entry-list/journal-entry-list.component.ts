import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from '../../../../../node_modules/ng2-smart-table';
import { GenericStockService } from '../../../@core/data/generic-stock.service';
import { ToastrService } from '../../../../../node_modules/ngx-toastr';
import { DatePipe } from '../../../../../node_modules/@angular/common';
import { Router, ActivatedRoute } from '../../../../../node_modules/@angular/router';

@Component({
  selector: 'journal-entry-list',
  templateUrl: './journal-entry-list.component.html',
  styleUrls: ['./journal-entry-list.component.scss']
})
export class JournalEntryListComponent implements OnInit {
  settings = {
    columns: {
      id: {
        title: "ID"
      },
      date: {
        title: "Date",
        valuePrepareFunction: (purchase_date) => {
          var raw = new Date(purchase_date);
          var formatted = this.datePipe.transform(raw, 'dd MMM yyyy');
          return formatted;
        }
      },
      user_remarks: {
        title: "Remarks"
      },
      status_id: {
        type: "html",
        title: "Status",
        filter: false,
        valuePrepareFunction: (status_id) => {
          if (status_id == 1) {
            return `<span>Saved&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>`;
          } else {
            return `<span>Submitted&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>`;
          }
        }
      },
    },
    actions: {
      add: false,
      edit: false,
      delete: false
    }
  };
  source: LocalDataSource = new LocalDataSource();
  constructor(private genericService: GenericStockService, private toastr: ToastrService, private datePipe: DatePipe, private router: Router) { }

  ngOnInit() {
    this.getJournalsList();
  }
  getJournalsList() {
    this.genericService.find('/journalentry/find').subscribe(data => {
      this.source.load(data.journalEntry);
    }, err => {
      this.toastr.error(err.error.err || err.error);
    })
  }
  public onUserRowSelect(event): void {
    this.router.navigate(["/pages/accounts/update-journal", event.data.id]);
  }
}
