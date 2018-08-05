import { Component, OnInit } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";
import { Router } from "@angular/router";
import { DatePipe } from "@angular/common";
import { Http } from "@angular/http";
import { ServerDataSource } from "ng2-smart-table";
import { Globals } from "../../../../Globals";
import { NbAuthService } from "@nebular/auth";
import { ToastrService } from "ngx-toastr";
import { CustomersService } from "../../../@core/data/customers.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DeleteComponent } from "../../modal/delete-modal/delete.component";
import { ServerSourceConf } from "../../../../../node_modules/ng2-smart-table/lib/data-source/server/server-source.conf";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { PermissionsService } from "../../../@core/data/permission.service";

@Component({
  selector: "ngx-customers-list",
  templateUrl: "./customers-list.component.html",
  styleUrls: ["./customers-list.component.scss"]
})
export class CustomersListComponent implements OnInit {
  delete: any;
  source: LocalDataSource = new LocalDataSource();
  sourceConf: ServerSourceConf;
  token: any;
  data: any;
  // public dummyData = [
  //   { name: "Usama", cnic: "34101-7943164-9", phoneNo: 923026326656 },
  //   { name: "Usman", cnic: "34202-7943164-9", phoneNo: 923036326656 },
  //   { name: "danish", cnic: "34303-7943164-9", phoneNo: 923046326656 },
  //   { name: "awais", cnic: "34404-7943164-9", phoneNo: 923056326656 },
  //   { name: "alamgir", cnic: "34505-7943164-9", phoneNo: 923056326656 },
  //   { name: "Usama", cnic: "34101-7943164-9", phoneNo: 923026326656 },
  //   { name: "Usman", cnic: "34202-7943164-9", phoneNo: 923036326656 },
  //   { name: "danish", cnic: "34303-7943164-9", phoneNo: 923046326656 },
  //   { name: "awais", cnic: "34404-7943164-9", phoneNo: 923056326656 },
  //   { name: "alamgir", cnic: "34505-7943164-9", phoneNo: 923056326656 },
  //   { name: "Usama", cnic: "34101-7943164-9", phoneNo: 923026326656 },
  //   { name: "Usman", cnic: "34202-7943164-9", phoneNo: 923036326656 },
  //   { name: "danish", cnic: "34303-7943164-9", phoneNo: 923046326656 },
  //   { name: "awais", cnic: "34404-7943164-9", phoneNo: 923056326656 },
  //   { name: "alamgir", cnic: "34505-7943164-9", phoneNo: 923056326656 },
  //   { name: "Usama", cnic: "34101-7943164-9", phoneNo: 923026326656 },
  //   { name: "Usman", cnic: "34202-7943164-9", phoneNo: 923036326656 },
  //   { name: "danish", cnic: "34303-7943164-9", phoneNo: 923046326656 },
  //   { name: "awais", cnic: "34404-7943164-9", phoneNo: 923056326656 },
  //   { name: "alamgir", cnic: "34505-7943164-9", phoneNo: 923056326656 }
  // ];
  constructor(
    private router: Router,
    private datePipe: DatePipe,
    private http: Http,
    private globals: Globals,
    private customersService: CustomersService,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private authService: NbAuthService,
    private role: PermissionsService
  ) {
    this.token = authService.getToken();
    this.token = this.token.value.token;
    // this.customersService.getAllCustomers()
    //   .subscribe((data1: any) => {
    //     this.data = data1.customers;
    //   });

    // this.source = new ServerDataSource(http,
    //   {
    //     endPoint: globals.weburl + '/customers' + '?access_token=' + this.token,
    //     // pagerLimitKey: '_limit',
    //     // pagerPageKey: '_page',
    //     // sortDirKey:  '_order',
    //     // sortFieldKey: '_sort',
    //     // dataKey: 'data',
    //     // totalKey: 'x_total_count',
    //   },
    // );
  }
  settings = {
    pager: {
      display: true,
      perPage: "10"
    },
    columns: {
      first_name: {
        title: "First Name"
      },
      last_name: {
        title: "Last Name"
      },
      cnic: {
        title: "CNIC No"
      },
      mobile: {
        title: "Mobile No"
      },
      email: {
        title: "Email"
      }
    },
    actions: {
      add: false,
      edit: false,
      delete: this.delete
      // custom: [{ name: 'print', title: `<i class="fa fa-print p-0 m-0 float-left"></i>` },   ],
      // position:  'left',
    },
    delete: {
      position: "right",
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true
    }
  };

  ngOnInit() {
    if (this.role.role.Admin) {
      this.delete = true;
      this.settings.actions.delete = this.delete;
    } else if (this.role.role.Dealer) {
      this.delete = false;
      this.settings.actions.delete = this.delete;
    }
    this.customersService.getAllCustomers().subscribe((data1: any) => {
      if (data1.customers) {
        this.data = data1.customers;
        this.source.load(data1.customers);
      }
    });
  }

  public onUserRowSelect(event): void {
    console.log(event);
    this.router.navigate(["/pages/customers/showCustomer", event.data.id]);
  }
  onDeleteConfirm(event): void {
    // if (window.confirm('Are you sure you want to delete?')) {
    //   event.confirm.resolve();
    //   this.customersService.deleteCustomer(event.data.id)
    //     .subscribe(data1 => {
    //       this.toastr.success('Deleted Successfully')
    //     },
    //   error => {
    //     this.toastr.error('Deletion Error')
    //   });

    // } else {
    //   event.confirm.reject();
    // }
    console.log("user " + event.data.firstName);
    const activeModal = this.modalService.open(DeleteComponent, {
      size: "lg",
      container: "nb-layout"
    });

    activeModal.componentInstance.modalHeader = "Delete";
    activeModal.componentInstance.modalContent = event.data.first_name;
    activeModal.componentInstance.modalUCnic = event.data.cnic;
    activeModal.componentInstance.modalU_ID = event.data.id;
    activeModal.componentInstance.modalSrc = this.data;
    activeModal.result.then(
      () => {
        this.refresh();
      },
      () => {
        console.log("Backdrop click");
      }
    );
  }
  public refresh(): void {
    this.ngOnInit();
    console.log("refresh ");
  }

  print(event): void {
    // this.router.navigate(['print/customerprint', event.data.id]);
  }
}
