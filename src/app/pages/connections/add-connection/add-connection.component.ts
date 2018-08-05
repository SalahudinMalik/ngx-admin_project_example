import { Component, OnInit } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";
import { Router } from "@angular/router";
import { DatePipe } from "@angular/common";
import { Http } from "@angular/http";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";
import { ConnectionsService } from "../../../@core/data/connections.service";
import { DealerPackageService } from "../../../@core/data/dealerpackage.service";
import { CustomersService } from "../../../@core/data/customers.service";
import { ServerDataSource } from "ng2-smart-table";
import { ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { NbAuthJWTToken, NbAuthService, NbAuthResult } from "@nebular/auth";

@Component({
  selector: "add-connection",
  templateUrl: "./add-connection.component.html",
  styleUrls: ["./add-connection.component.scss"]
})
export class AddConnectionComponent implements OnInit {
  editable: boolean = false;
  dataLoaded: boolean = false;
  disableUpdate: boolean;
  data: any;
  showDropdown: boolean = true;
  cnicFrontPic: string;
  cnicBackPic: string;
  docPic: string;
  customerList: any = [];
  selectedCustomer: any;
  packageList: any = [];
  selectedPackage: any;
  id: any;
  user: any;
  private sub: any;
  btnSave: boolean;
  isWireless: any;
  public form: FormGroup;
  public timeline: any;
  public customerDetails = [
    {
      month: "April",
      packages: [
        {
          date: "july 18,2018",
          id: 1,
          name: "Monthly Internet Bundle",
          status: "paid",
          price: 1000
        },
        {
          date: "july 18,2018",
          id: 2,
          name: "Weekly Internet Bundle",
          status: "paid",
          price: 500
        },
        {
          date: "july 18,2018",
          id: 1,
          name: "Daily Internet Bundle",
          status: "paid",
          price: 200
        }
      ]
    },
    {
      month: "May",
      packages: [
        {
          date: "july 18,2018",
          id: 1,
          name: "Monthly Internet Bundle",
          status: "paid",
          price: 1000
        },
        {
          date: "july 18,2018",
          id: 2,
          name: "Weekly Internet Bndle",
          status: "paid",
          price: 500
        }
      ]
    }
  ];
  constructor(
    private fb: FormBuilder,
    private connectionsService: ConnectionsService,
    private toastr: ToastrService,
    private customerService: CustomersService,
    private authService: NbAuthService,
    private dpService: DealerPackageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
      if (token.isValid()) {
        this.user = token.getPayload();
      }
    });

    this.dpService
      .getAllDealerPackages(this.user.user.id)
      .subscribe((data: any) => {
        if (data.dealerPackages) {
          for (let p of data.dealerPackages) {
            this.packageList.push(p.packages);
          }
        }
      });
    this.customerService.getAllCustomers().subscribe((data: any) => {
      this.customerList = data.customers;
    });
    this.form = this.fb.group({
      customer: [null, Validators.compose([Validators.required])],
      first_name: [null, { disabled: true }],
      last_name: [null],
      cnic: [null],
      email: [null],
      mobile: [null],
      search: [],
      address: [null, Validators.compose([Validators.required])],
      username: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required])],
      router_of: [null],
      router_brand: [null],
      router_model: [null],
      router_price: [null],
      drop_wire_of: [null],
      drop_wire_length: [null],
      price_per_meter: [null],
      is_wireless: [null],
      lat: [null],
      lag: [null],
      // status_id: [null, Validators.compose([Validators.required])],
      // customer_id: [null, Validators.compose([Validators.required])],
      // basestation_id: [null, Validators.compose([Validators.required])],
      package: [null, Validators.compose([Validators.required])]
      // salesman_id: [null, Validators.compose([Validators.required])],
      // dealer_id: [null, Validators.compose([Validators.required])],
    });
    this.sub = this.route.params.subscribe(params => {
      this.id = params["id"]; // (+) converts string 'id' to a number

      if (this.id !== undefined) {
        this.connectionsService.getTimeline(this.id).subscribe(r => {
          this.timeline = r;
        });
        this.dataLoaded = true;
        this.editable = true;
        this.connectionsService
          .getOneConnection(this.id)
          .subscribe((data: any) => {
            this.data = data;

            if (data.is_wireless) {
              this.isWireless = "Yes";
            } else if (!data.is_wireless) {
              this.isWireless = "No";
            }

            this.form.patchValue({
              username: data.username,
              address: data.address,
              router_of: data.router_of,
              router_brand: data.router_brand,
              router_model: data.router_model,
              router_price: data.router_price,
              drop_wire_of: data.drop_wire_of,
              drop_wire_length: data.drop_wire_length,
              price_per_meter: data.price_per_meter,
              is_wireless: this.isWireless,
              lat: data.lat,
              lag: data.lng,
              status_id: data.status_id,
              basestation_id: data.basestation_id
            });

            this.form.disable();
            this.btnSave = true;
            this.onChange();
          });
      }

      // In a real app: dispatch action to load the details here.
    });
  }
  enableEdit() {
    this.form.enable();
    this.editable = false;
  }

  disableEdit() {
    this.form.disable();
    this.editable = true;
  }
  onChange() {
    this.form.valueChanges.subscribe(r => {
      if (!r.package) {
        r.package = this.data.packages;
      }
      if (
        r.username == this.data.username &&
        r.address == this.data.address &&
        r.package.id == this.data.packages.id &&
        r.drop_wire_of == this.data.drop_wire_of &&
        r.drop_wire_length == this.data.drop_wire_length &&
        r.lat == this.data.lat &&
        r.lag == this.data.lng &&
        r.is_wireless == this.isWireless &&
        r.router_brand == this.data.router_brand &&
        r.router_model == this.data.router_model &&
        r.router_of == this.data.router_of &&
        r.router_price == this.data.router_price &&
        r.price_per_meter == this.data.price_per_meter
      ) {
        this.disableUpdate = false;
      } else {
        this.disableUpdate = true;
      }
    });
  }

  showDrop() {
    this.showDropdown = true;
  }
  hideDrop() {
    this.showDropdown = false;
  }
  customerChange() {
    // this.showDropdown = false;
    this.form.patchValue({
      search: this.selectedCustomer.first_name,
      first_name: this.selectedCustomer.first_name,
      last_name: this.selectedCustomer.last_name,
      cnic: this.selectedCustomer.cnic,
      email: this.selectedCustomer.email,
      mobile: this.selectedCustomer.mobile
    });
  }
  cnicFPic(event) {
    const cnicF = event.target.files[0].name;
    this.cnicFrontPic = cnicF;
    // console.log('name ' + files);
  }
  cnicBPic(event) {
    const cnicB = event.target.files[0].name;
    this.cnicBackPic = cnicB;
    // console.log('name ' + files);
  }
  docsPic(event) {
    const doc = event.target.files[0].name;
    this.docPic = doc;
    // console.log('name ' + files);
  }
  onSubmit() {
    if (!this.btnSave) {
      const data = {
        username: this.form.value.username,
        password: this.form.value.password,
        router_of:
          this.form.value.router_of == null ? 0 : this.form.value.router_of,
        router_brand:
          this.form.value.router_brand == null
            ? ""
            : this.form.value.router_brand,
        router_model:
          this.form.value.router_model == null
            ? ""
            : this.form.value.router_model,
        router_price:
          this.form.value.router_price == null
            ? ""
            : this.form.value.router_price,
        drop_wire_of:
          this.form.value.drop_wire_of == null
            ? 0
            : this.form.value.drop_wire_of,
        drop_wire_length:
          this.form.value.drop_wire_length == null
            ? ""
            : this.form.value.drop_wire_length,
        price_per_meter:
          this.form.value.price_per_meter == null
            ? ""
            : this.form.value.price_per_meter,
        is_wireless: this.form.value.is_wireless == "Yes" ? true : false,
        lat: this.form.value.lat == null ? "" : this.form.value.lat,
        lng: this.form.value.lag == null ? "" : this.form.value.lag,
        customers: this.selectedCustomer.id,
        packages: this.selectedPackage.id,
        address: this.form.value.address,
        dealer_id: this.user.user
      };

      this.connectionsService.saveConnection(data).subscribe(
        data1 => {
          // console.log('Data inserted')

          this.toastr.success("Data inserted successfully.");
          this.form.reset();
        },
        error => {
          this.toastr.error("Data not inserted error occured.");
        }
      );
    } else if (this.btnSave) {
      const data = {
        username: this.form.value.username,
        password: this.form.value.password,
        id: this.data.id,
        router_of:
          this.form.value.router_of == null
            ? "Company"
            : this.form.value.router_of,
        router_brand:
          this.form.value.router_brand == null
            ? ""
            : this.form.value.router_brand,
        router_model:
          this.form.value.router_model == null
            ? ""
            : this.form.value.router_model,
        router_price:
          this.form.value.router_price == null
            ? ""
            : this.form.value.router_price,
        drop_wire_of:
          this.form.value.drop_wire_of == null
            ? "Company"
            : this.form.value.drop_wire_of,
        drop_wire_length:
          this.form.value.drop_wire_length == null
            ? ""
            : this.form.value.drop_wire_length,
        price_per_meter:
          this.form.value.price_per_meter == null
            ? ""
            : this.form.value.price_per_meter,
        is_wireless: this.form.value.is_wireless == "Yes" ? true : false,
        lat: this.form.value.lat == null ? "" : this.form.value.lat,
        lng: this.form.value.lag == null ? "" : this.form.value.lag,

        packages:
          this.selectedPackage == undefined
            ? this.data.packages.id
            : this.selectedPackage.id,
        address: this.form.value.address
      };

      this.connectionsService.updateConnection(data).subscribe(
        data1 => {
          this.toastr.success("Data updated successfully.");
        },
        error => {
          this.toastr.error("Data not updated error occured.");
        }
      );
    }
  }
}
