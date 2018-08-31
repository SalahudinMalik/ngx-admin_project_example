import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from '../../../../../node_modules/ng2-smart-table';
import { GenericStockService } from '../../../@core/data/generic-stock.service';
import { ToastrService } from '../../../../../node_modules/ngx-toastr';
import { DatePipe } from '../../../../../node_modules/@angular/common';
@Component({
  selector: 'list-notifications',
  templateUrl: './list-notifications.component.html',
  styleUrls: ['./list-notifications.component.scss']
})
export class ListNotificationsComponent implements OnInit {
  settings = {
    columns: {
      id: {
        title: "ID"
      },
      expires_in: {
        title: "Expire In Days",
      },
      cron_job_time: {
        title: "Cron Job Time"
      },
    },
    actions: {
      add: false,
      edit: false,
      delete: false
    }
  };
  source: LocalDataSource = new LocalDataSource();
  constructor(private genericService: GenericStockService, private toastr: ToastrService, private datePipe: DatePipe) { }

  ngOnInit() {
    this.getNotifyList();
  }
  getNotifyList() {
    this.genericService.find('/notify/find').subscribe(data => {
      this.source.load(data.notify);
    }, err => {
      this.toastr.error(err.error.err || err.error);
    })
  }

}
