import { Component, OnInit } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";
import { Router } from "@angular/router";
import { DatePipe } from "@angular/common";
import { Http } from "@angular/http";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { ServerDataSource } from "ng2-smart-table";
import { Globals } from "../../../../Globals";
import { ToastrService } from "ngx-toastr";
import { PackagesService } from "../../../@core/data/packages.service";

@Component({
  selector: "ngx-list-package",
  templateUrl: "./list-package.component.html",
  styleUrls: ["./list-package.component.scss"]
})
export class ListPackageComponent implements OnInit {
  source: LocalDataSource = new LocalDataSource();
  token: any;
  data: any;
  private _options;

  constructor(
    private router: Router,
    private datePipe: DatePipe,
    private http: Http,
    private globals: Globals,
    private packageService: PackagesService,
    private toastr: ToastrService
  ) {
    // this._options = { headers: new HttpHeaders({'Content-Type': 'application/json' ,'authorization': 'Bearer ' + this.token}) };
    // this.source = new ServerDataSource( http ,
    //   { endPoint: globals.weburl + '/package/find',
    //     // pagerLimitKey: '_limit',
    //     // pagerPageKey: '_page',
    //     // sortDirKey:  '_order',
    //     // sortFieldKey: '_sort',
    //       dataKey: 'packages',
    //     // totalKey: 'x_total_count',
    // },
    // );
  }
  settings = {
    // pager : {
    //   display : true,
    //   perPage: '10',
    //   },
    columns: {
      package_name: {
        title: "Package Name",
        filter: true
      },
      bandwidth: {
        title: "Bandwidth "
      },

      data_limit: {
        title: "Data Limit"
      },
      cost_price: {
        title: "Cost Price"
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
  };

  ngOnInit() {
    this.packageService.getPackages().subscribe((data1: any) => {
      this.data = data1.packages; // dsfdsfadsf
      this.source.load(this.data);
    });
  }
  public onUserRowSelect(event): void {
    this.router.navigate(["/pages/packages/showPackage", event.data.id]);
  }
  onDeleteConfirm(event): void {
    if (window.confirm("Are you sure you want to delete?")) {
      event.confirm.resolve();
      this.packageService.deletePackage(event.data.id).subscribe(
        data1 => {
          this.toastr.success("Deleted Successfully");
        },
        error => {
          this.toastr.error(error, "Deletion Error");
          // this.ngOnInit()
        }
      );
      this.ngOnInit();
    } else {
      event.confirm.reject();
    }
  }
}
