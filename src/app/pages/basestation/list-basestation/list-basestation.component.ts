import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http'
import { ServerDataSource } from 'ng2-smart-table';
import { Globals } from '../../../../Globals';
import { NbAuthService } from '@nebular/auth';
import { ToastrService } from 'ngx-toastr';
import { BasestationService } from '../../../@core/data/basestation.service';

@Component({
  selector: 'ngx-list-basestation',
  templateUrl: './list-basestation.component.html',
  styleUrls: ['./list-basestation.component.scss']
})
export class ListBaseStationComponent implements OnInit {
  source: LocalDataSource = new LocalDataSource();
  token: any;

  constructor(
    private router: Router,
    private datePipe: DatePipe,
    private http: Http,
    private globals: Globals,
    private BasestationService: BasestationService,
    private toastr: ToastrService,
    private authService: NbAuthService) {
    this.token = authService.getToken();
    this.token = this.token.value.token;
    // this.service.getAllCustomer()
    //   .subscribe(data1 => {
    //     this.data = data1; dsfdsfadsf
    //   });

    // this.source = new ServerDataSource( http ,
    //   { endPoint: globals.weburl + '/basestations' + '?access_token=' + this.token,
    // pagerLimitKey: '_limit',
    // pagerPageKey: '_page',
    // sortDirKey:  '_order',
    // sortFieldKey: '_sort',
    // dataKey: 'data',
    // totalKey: 'x_total_count',
    // },
    // );


    this.getdata();

  }

  getdata() {
    this.source = new ServerDataSource(this.http,
      {
        endPoint: this.globals.weburl + '/basestations' + '?access_token=' + this.token,
        // pagerLimitKey: '_limit',
        // pagerPageKey: '_page',
        // sortDirKey:  '_order',
        // sortFieldKey: '_sort',
        // dataKey: 'data',
        // totalKey: 'x_total_count',
      },
    );
  }

  settings = {
    // pager : {
    //   display : true,
    //   perPage: '10',
    //   },
    columns: {
      name: {
        title: 'Name',
        filter: true,
      },
      lat: {
        title: 'Latitude',
        filter: true,
      },
      lng: {
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


  ngOnInit() {
  }
  public onUserRowSelect(event): void {
    console.log(event);
    this.router.navigate(['/pages/basestation/showBasestation', event.data.id]);
  }
  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
      this.BasestationService.deleteBasestation(event.data.id)
        .subscribe(data1 => {
          this.toastr.success('Deleted Successfully');
          this.getdata();
        },
          error => {
            this.toastr.error('Deletion Error')
          });

    } else {
      event.confirm.reject();
    }
  }


}
