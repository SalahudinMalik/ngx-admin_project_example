import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";
import { CustomValidationService } from "./customValidationService";
import { CustomersService } from "../../../@core/data/customers.service";
import { ToastrService } from "ngx-toastr";
import { ActivatedRoute } from "@angular/router";
import { Customer } from "../../../models/customer.model";
@Component({
  selector: "ngx-customer",
  templateUrl: "./customer.component.html",
  styleUrls: ["./customer.component.scss"]
})
export class CustomerComponent implements OnInit {
  disableUpdate: boolean;
  data: Customer;
  showTimeline: boolean;
  cnicFrontPic: string;
  cnicBackPic: string;
  docPic: string;
  id: any;
  editable: boolean = false;
  private sub: any;
  btnSave: boolean;
  public form: FormGroup;
  public formm: FormGroup;
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
    private customersService: CustomersService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {
    // this.formObj = new Customer();
  }
  // fnControl: FormControl;
  // lnControl: FormControl;
  // cnicControl: FormControl;

  ngOnInit() {
    // this.lnControl = this.fb.control('', Validators.compose([Validators.required]));
    // this.fnControl = this.fb.control('', Validators.compose([Validators.required]));
    // this.cnicControl =  this.fb.control();
    // this.formObj.firstName = 'mlaik';
    this.showTimeline = false;
    this.form = this.fb.group({
      firstName: [null, Validators.compose([Validators.required])],
      lastName: [null, Validators.compose([Validators.required])],
      cnicNo: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(13),
          Validators.maxLength(15),
          Validators.pattern("^[0-9]{5}(-)?[0-9]{7}(-)?[0-9]{1}$")
        ])
      ],
      email: [
        null,
        Validators.compose([Validators.email, Validators.required])
      ],
      mobileNo: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern("[0-9]+"),
          Validators.minLength(11),
          Validators.maxLength(11)
        ])
      ],
      //   CustomValidationService.checkLimit(10000000000, 99999999999)])],
      password: [null, Validators.required]
      // discription: [null, Validators.compose([Validators.required])],

      // receipt: [null, Validators.compose([Validators.required])]
    });
    this.sub = this.route.params.subscribe(params => {
      this.id = params["id"]; // (+) converts string 'id' to a number
      if (this.id !== undefined) {
        this.showTimeline = true;
        this.editable = true;
        this.customersService.getOneCustomer(this.id).subscribe(data => {
          this.data = data;
          this.form.patchValue({
            firstName: data.first_name,
            lastName: data.last_name,
            cnicNo: data.cnic,
            email: data.email,
            mobileNo: data.mobile,
            password: data.password
            // address: data.address,
            // package: data.package,
            // routerOf: data.routerOf,
            // routerBrand: data.routerBrand,
            // routerModel: data.routerModel,
            // ksjdaflkjsdlafjl
            // dropWirePricePL: data.dropWirePricePL,
          });
          // this.form.('password');
          this.form.disable();
          this.btnSave = false;
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
      if (
        r.firstName == this.data.first_name &&
        r.lastName == this.data.last_name &&
        r.email == this.data.email &&
        r.mobileNo == this.data.mobile &&
        r.cnicNo == this.data.cnic
      ) {
        this.disableUpdate = false;
      } else {
        this.disableUpdate = true;
      }
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
    // console.log('data : ' + )
    const data = {
      id: this.id,
      first_name: this.form.value.firstName,
      last_name: this.form.value.lastName,
      cnic: this.form.value.cnicNo,
      mobile: this.form.value.mobileNo,
      email: this.form.value.email,
      password: this.form.value.password
      // address: this.form.value.address,
      // package: this.form.value.package == null ? 'Super' : this.form.value.package,
      // routerOf: this.form.value.routerOf == null ? 'Company' : this.form.value.routerOf,
      // routerBrand: this.form.value.routerBrand == null ? 'Cisco' : this.form.value.routerBrand ,
      // routerModel: this.form.value.routerModel == null ? 'R28' : this.form.value.routerModel,
      // routerPrice: this.form.value.routerOf === 'Customer' ? '' : this.form.value.routerPrice,
      // dropWireOf: this.form.value.dropWireOf == null ? 'Company' : this.form.value.dropWireOf,
      // dropWireLength: this.form.value.dropWireLength,
      // dropWirePricePL: this.form.value.dropWireOf === 'Customer' ? '' : this.form.value.dropWirePricePL ,
    };
    // console.log('data : ' + JSON.stringify(data));
    if (!this.showTimeline) {
      this.customersService.saveCustomer(data).subscribe(
        data1 => {
          console.log("Data inserted");
          this.form.reset();
          this.toastr.success("Data inserted successfully.");
        },
        error => {
          this.toastr.error("Data not inserted error occured.");
        }
      );
    } else if (this.showTimeline) {
      this.customersService.updateCustomer(data).subscribe(
        data1 => {
          this.toastr.success("Customer Data Updated.");
        },
        error => {
          this.toastr.error("Customer Data not updated error occured.");
        }
      );
    }
  }
}
