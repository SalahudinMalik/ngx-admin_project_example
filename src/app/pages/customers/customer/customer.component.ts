import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";
import * as _ from 'lodash';

import { CustomValidationService } from "./customValidationService";
import { CustomersService } from "../../../@core/data/customers.service";
import { ToastrService } from "ngx-toastr";
import { ActivatedRoute } from "@angular/router";
import { Customer } from "../../../models/customer.model";
import { FileUploadService } from "../../../@core/data/file-upload.service";
import { GenericStockService } from "../../../@core/data/generic-stock.service";
import { TokenAuthService } from "../../../@core/data/token-auth.service";
import { UserService } from "../../../@core/data/appuser.service";
@Component({
  selector: "ngx-customer",
  templateUrl: "./customer.component.html",
  styleUrls: ["./customer.component.scss"]
})
export class CustomerComponent implements OnInit {
  numberVerified: boolean = false;
  password: any;
  mobileNumber: any;
  user: any;
  disableUpdate: boolean;
  data: Customer;
  showTimeline: boolean;
  cnicFrontPic: File = null;
  cnicBackPic: File = null;
  cnicFront: string;
  cnicBack: string;
  docPic: string;
  id: any;
  loader: any;
  verificationCode: any;
  editable: boolean = false;
  verifyM: boolean = false;
  selectedDealer: any;
  dealerList: any = [];
  private sub: any;
  btnSave: boolean;
  public form: FormGroup;
  public formm: FormGroup;
  constructor(
    private fileUploadService: FileUploadService,
    private fb: FormBuilder,
    private customersService: CustomersService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private genericService: GenericStockService,
    private tokenAuthService: TokenAuthService,
    private userService: UserService,
  ) {

  }
  ngOnInit() {

    this.user = this.tokenAuthService.user.user;
    this.cnicFront = '/assets/images/cnicFront.jpg';
    this.cnicBack = '/assets/images/cnicBack.jpg';
    this.showTimeline = false;
    this.form = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null,],
      dealer: [null],
      cnicNo: [
        null,
        Validators.compose([
          // Validators.required,
          Validators.minLength(13),
          Validators.maxLength(15),
          Validators.pattern("^[1-9]{1}[0-9]{4}(-)?[0-9]{7}(-)?[0-9]{1}$")
        ])
      ],
      email: [
        null,
        // Validators.compose([Validators.email, Validators.required])
      ],
      mobileNo: [
        null,
        Validators.compose([
          Validators.required,
          // Validators.pattern("^[0][3](0|1|2|3|4)[0-9](-)?[0-9]*{7}$"),
          Validators.minLength(11),
          Validators.maxLength(11)
        ])
      ],
      password: [null,
        // Validators.pattern("^[0-9]*$"),
      ],

    });
    this.sub = this.route.params.subscribe(params => {
      this.id = params["id"]; // (+) converts string 'id' to a number
      if (this.id !== undefined) {
        this.showTimeline = true;
        this.editable = true;
        this.customersService.getOneCustomer(this.id).subscribe((data: any) => {
          this.data = data;
          this.form.patchValue({
            firstName: data.first_name,
            lastName: data.last_name,
            cnicNo: data.cnic,
            email: data.email,
            mobileNo: data.mobile,
            password: data.password,
          });
          // this.form.('password');
          this.cnicBack = data.cnicBack;
          this.cnicFront = data.cnicFront;
          this.form.disable();
          this.btnSave = false;
          this.onChange();
        },
          err => {
            this.toastr.error(err.error.err || err.error);
          });
      }
    });
    if (this.user.role.id == 1) {
      this.genericService.find('/user/find?filters%5B%5D=1&role_id=2').subscribe(data => {
        this.dealerList = data.users;
      }, err => {
        this.toastr.error(err.error.err || err.error);
      });
    }

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
  uploadCnicFront(event) {
    const cnicF = event.target.files[0];
    this.cnicFrontPic = cnicF;
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.cnicFront = event.target.result;
    }
    reader.readAsDataURL(event.target.files[0]);

  }
  uploadCnicBack(event) {
    const cnicB = event.target.files[0];
    this.cnicBackPic = cnicB;
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.cnicBack = event.target.result;
    }
    reader.readAsDataURL(event.target.files[0]);
  }
  docsPic(event) {
    const doc = event.target.files[0].name;
    this.docPic = doc;
  }
  onSubmit() {
    const data = {
      id: this.id,
      first_name: this.form.value.firstName,
      last_name: this.form.value.lastName,
      cnic: this.form.value.cnicNo,
      mobile: this.form.value.mobileNo,
      email: this.form.value.email,
      password: this.form.value.password,
      verifyManually: this.verifyM,
      createdBy: this.selectedDealer == undefined ? null : this.selectedDealer.id,
    };
    console.log(data);
    if (!this.showTimeline) {
      this.genericService.create('/customer/create', data).subscribe(
        data => {
          if (this.cnicBackPic && this.cnicFrontPic && data.id) {
            this.uploadFile(data.id);
          }
          this.form.reset();
          this.toastr.success("customer added successfully.");
        },
        err => {
          this.toastr.error(err.error.err || err.error);
        }, () => {

        }
      );
      this.verifyM = false;
    } else if (this.showTimeline) {
      this.customersService.updateCustomer(data).subscribe(
        data1 => {
          console.log('upload filed', data1)
          if (this.cnicBackPic && this.cnicFrontPic && data.id) {

            this.uploadFile(data.id);
          }
          this.toastr.success("Customer Data Updated.");

        },
        err => {
          this.toastr.error(err.error.err || err.error);
        }
      );
    }

  }
  generatePassword() {
    var array = [2, 3, 4, 5, 6, 7, 8, 9];
    var i = array.length,
      j = 0,
      temp;
    while (i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    var randomPassword = _.join(array, "");
    this.password = randomPassword;
  }
  uploadFile(id) {
    if (this.cnicBackPic && this.cnicFrontPic) {
      this.toastr.info('Uploading CNIC');
      this.fileUploadService.postFile('/customer/fileUpload', this.cnicFrontPic, 'cnicFront', id).subscribe(data => {
        if (data) {
          this.toastr.success("CNIC Front Uploaded");
          this.fileUploadService.postFile('/customer/fileUpload', this.cnicBackPic, 'cnicBack', id).subscribe(data => {
            if (data) {
              this.toastr.success("CNIC Back Uploaded");
            }
            else {
              this.toastr.error("CNICBack Not Uploaded Yet Try Again!");
            }
          },
            err => {
              this.toastr.error(err.error.err || err.error);
            })
        } else {
          this.toastr.error("CNIC Not Uploaded Yet Try Again!");

        }
      },
        err => {
          this.toastr.error(err.error.err || err.error);
        });
    }

  }
  verifyCode() {
    if (this.verificationCode.length == 5) {
      this.genericService.create('/customer/verifyToken', { token: this.verificationCode, mobile: this.form.value.mobileNo }).subscribe((data) => {
        if (data.validity == true) {
          this.toastr.success("Code Verified :)")
          this.numberVerified = true;
        }
        else {
          this.toastr.error('Wrong or Expired code');
        }
      },
        err => {
          this.toastr.error(err.error.err || err.error);
        });
    }
  }
  verifyMobileNo() {
    this.toastr.success('please wait')
    this.loader = true;
    if (this.form.value.mobileNo) {
      this.genericService.create('/customer/getToken', { mobile: this.form.value.mobileNo }).subscribe((data) => {
        if (data[0].status == '1') {
          this.toastr.success('code sent to your mobile number');
        }
        else {
          this.toastr.warning('error occured could not send code to your number. try again');
        }
        this.loader = false;
      },
        err => {
          this.toastr.error(err.error.err || err.error);
          this.loader = false;
        });
    }
  }
  controlVerifyNo() {
    this.verificationCode = null;
    this.numberVerified = false;
  }
  verifyManually() {
    this.verifyM = true;
  }
}
