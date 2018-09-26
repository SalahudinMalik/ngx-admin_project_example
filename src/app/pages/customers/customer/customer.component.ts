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
import { ActivatedRoute, Router } from "@angular/router";
import { Customer } from "../../../models/customer.model";
import { FileUploadService } from "../../../@core/data/file-upload.service";
import { GenericStockService } from "../../../@core/data/generic-stock.service";
import { TokenAuthService } from "../../../@core/data/token-auth.service";
import { UserService } from "../../../@core/data/appuser.service";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
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
  destroySubject: Subject<void> = new Subject();
  // .pipe(takeUntil(this.destroySubject))
  constructor(
    private fileUploadService: FileUploadService,
    private fb: FormBuilder,
    private customersService: CustomersService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private genericService: GenericStockService,
    private tokenAuthService: TokenAuthService,
    private router: Router
  ) {

  }
  ngOnInit() {

    this.user = this.tokenAuthService.user.user;

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
      rbRole: [null],
    });
    // this.form.patchValue({ rbRole: '1' });
    this.sub = this.route.params.pipe(takeUntil(this.destroySubject)).subscribe(params => {
      this.id = params["id"]; // (+) converts string 'id' to a number
      if (this.id !== undefined) {
        this.cnicBack = this.cnicFront = '/assets/images/loading.gif';
        this.showTimeline = true;
        this.editable = true;
        this.customersService.getOneCustomer(this.id).pipe(takeUntil(this.destroySubject)).subscribe((data: any) => {
          this.data = data;
          this.mobileNumber = data.mobile;
          this.form.patchValue({
            firstName: data.first_name,
            lastName: data.last_name,
            cnicNo: data.cnic,
            email: data.email,
            mobileNo: data.mobile,
            // password: '12312'//parseInt(data.password),
          });
          this.selectedDealer = data.createdBy;
          // this.form.('password');
          this.cnicBack = data.cnicBack;
          this.cnicFront = data.cnicFront;
          this.verifyM = data.manually_mobile_verified;

          for (let c of data.customerverify) {
            if (c.doc_type == 1) {
              this.numberVerified = c.is_verified;
              this.verifyM = c.is_verified;
            }
          }
          
          this.password = parseInt(data.password);
          this.form.get('password').setValidators([
            Validators.required,
          ]);
          this.form.get('cnicNo').setValidators([
            Validators.required,
            Validators.compose([
              // Validators.required,
              Validators.minLength(13),
              Validators.maxLength(15),
              Validators.pattern("^[1-9]{1}[0-9]{4}(-)?[0-9]{7}(-)?[0-9]{1}$")
            ])
          ]);
          this.form.disable();
          this.btnSave = false;
          this.onChange();
        },
          err => {
            this.toastr.error(err.error.err || err.error);
          });
      }
      else {
        this.cnicFront = '/assets/images/cnicFront.jpg';
        this.cnicBack = '/assets/images/cnicBack.jpg';
      }
    });
    if (this.user.role.id == 1 || this.user.role.id == 6) {
      this.genericService.find('/user/find?filters%5B%5D=1&role_id=2').pipe(takeUntil(this.destroySubject)).subscribe(data => {
        this.dealerList = data.users;
      }, err => {
        this.toastr.error(err.error.err || err.error);
      });
    }

  }
  ngOnDestroy() {
    this.destroySubject.next();
  }
  enableEdit() {
    this.form.enable();
    this.editable = false;
    if(this.verifyM){
      this.form.get('mobileNo').disable();
    }
  }
  rbchange() {
    // console.log(this.form.value.rbRole);
    if (this.form.value.rbRole == 1) {
      this.selectedDealer = null;
    }
  }
  disableEdit() {
    this.form.disable();
    this.editable = true;
  }
  onChange() {
    this.form.valueChanges.pipe(takeUntil(this.destroySubject)).subscribe(r => {
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
      createdBy: this.selectedDealer == undefined ? this.user.role.id == 6 ? 1 : null :
        this.selectedDealer.role == 6 ? 1 : this.selectedDealer.id,
    };
    // console.log(data);
    if (!this.showTimeline) {
      this.genericService.create('/customer/create', data).pipe(takeUntil(this.destroySubject)).subscribe(
        data => {
          if (this.cnicBackPic && this.cnicFrontPic && data.id) {
            this.uploadFile(data.id);
          }
          this.form.reset();
          this.cnicFront = '/assets/images/cnicFront.jpg';
          this.cnicBack = '/assets/images/cnicBack.jpg';
          this.toastr.success("customer added successfully.");
          this.router.navigateByUrl('pages/customers/listCustomer');
        },
        err => {
          this.toastr.error(err.error.err || err.error);
        }, () => {

        }
      );
      this.verifyM = false;
    } else if (this.showTimeline) {
      this.genericService.update('/customer/update', data).pipe(takeUntil(this.destroySubject)).subscribe(
        data1 => {
          if (this.cnicBackPic && this.cnicFrontPic && data.id) {

            this.uploadFile(data.id);
          }
          this.toastr.success("Customer Data Updated.");
          this.router.navigateByUrl('pages/customers/listCustomer');

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
      this.genericService.create('/customer/verifyToken', { token: this.verificationCode, mobile: this.form.value.mobileNo }).pipe(takeUntil(this.destroySubject)).subscribe((data) => {
        if (data.validity == true) {
          this.toastr.success("Code Verified :)")
          this.numberVerified = true;
          this.mobileNumber = this.form.value.mobileNo;
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
      this.verificationCode = null;
      this.genericService.create('/customer/getToken', { mobile: this.form.value.mobileNo , id:this.id }).pipe(takeUntil(this.destroySubject)).subscribe((data) => {
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
    if (this.mobileNumber != this.form.value.mobileNo) {
      this.numberVerified = false;
      this.verifyM = false;
    }
    if (this.mobileNumber == this.form.value.mobileNo) {
      this.numberVerified = true;
    }
  }

  verifyManually() {
    this.verifyM = true;
    this.numberVerified = true;
    this.mobileNumber = this.form.value.mobileNo;
    this.toastr.success('Mobile number verified.')
  }
}
