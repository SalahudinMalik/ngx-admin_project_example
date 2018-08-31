import { Component, OnInit } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";
import { Router } from "@angular/router";
import { DatePipe } from "@angular/common";
import { Http } from "@angular/http";
import { UserService } from "../../../@core/data/appuser.service";
import { User } from "../../../models/user.model";
import { ServerDataSource } from "ng2-smart-table";
import { Globals } from "../../../../Globals";
import { ToastrService } from "ngx-toastr";
import { dashCaseToCamelCase } from "../../../../../node_modules/@angular/compiler/src/util";

@Component({
  selector: "ngx-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.scss"]
})
export class UserListComponent implements OnInit {
  data: any;
  settings = {
    // pager : {
    //   display : true,
    //   perPage: '10',
    //   },
    columns: {
      first_name: {
        title: "First Name"
      },
      last_name: {
        title: "Last Name"
      },
      mobile: {
        title: "Mobile No"
      },
      email: {
        title: "Email"
      },
      role: {
        title: "Role"
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
  source: LocalDataSource = new LocalDataSource();
  dArray: any = [];

  token: any;
  constructor(
    private userService: UserService,
    private router: Router,
    private datePipe: DatePipe,
    private http: Http,
    private globals: Globals,
    private toastr: ToastrService
  ) {}
  ngOnInit() {
    this.userService.getAllUser().subscribe((data1: any) => {
      for (let d of data1.users) {
        let ds = {
          id: d.id,
          first_name: d.first_name,
          last_name: d.last_name,
          mobile: d.mobile,
          email: d.email,
          role: d.role.name
        };
        this.dArray.push(ds);
      }
      this.source.load(this.dArray);
    });
  }
  onDeleteConfirm(event): void {
    if (window.confirm("Are you sure you want to delete?")) {
      event.confirm.resolve();
      this.userService.deleteUser(event.data.id).subscribe(
        data1 => {
          this.toastr.success("Deleted Successfully");
        },
        err => {
          this.toastr.error(err.error.err || err.error);
        }
      );
      this.source.refresh();
    } else {
      event.confirm.reject();
    }
  }
  public onUserRowSelect(event): void {
    this.router.navigate(["/pages/user/showUser", event.data.id]);
  }
}
