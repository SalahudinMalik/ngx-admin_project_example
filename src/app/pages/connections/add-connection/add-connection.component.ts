import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { FileUploadService } from "../../../@core/data/file-upload.service";
import { GenericStockService } from "../../../@core/data/generic-stock.service";
import { ActivatedRoute, Router } from "@angular/router";
import { async } from "rxjs/internal/scheduler/async";
import { TokenAuthService } from "../../../@core/data/token-auth.service";

@Component({
  selector: "add-connection",
  templateUrl: "./add-connection.component.html",
  styleUrls: ["./add-connection.component.scss"]
})
export class AddConnectionComponent implements OnInit {
  form: FormGroup;
  signedDoc: File;
  docPic: string;
  customerList = [];
  packagesList = [];
  searchAbleArray = [];
  editable: boolean = false;
  selectedPackage: any;
  selectedRecord: any;
  rejectReason: any;
  user: any;
  id: any;
  constructor(private fb: FormBuilder, private genericService: GenericStockService,
    private toastr: ToastrService, private fileUploadService: FileUploadService,
    private route: ActivatedRoute,
    private tokenAuthService: TokenAuthService,
    private router: Router
  ) { }
  async ngOnInit() {
    this.user = this.tokenAuthService.user.user;
    console.log(this.user);
    this.selectedPackage = {};
    this.createForm();
    await this.patchConnection();


    if (this.id == undefined || this.id == null)
      this.getCustomers();



  }
  async getPackages() {
    let dealer_id = this.selectedRecord.createdBy;
    await this.genericService.find('/dealerpackages/find?filters%5B%5D=1&dealer_id=' + dealer_id).subscribe((data: any) => {
      this.packagesList = data.dealerPackages;
      if (this.id) {
        const pos = this.packagesList.map(function (e) { return e.packages.package_name; }).indexOf(this.selectedPackage.package_name);

        if (pos >= 0) {
          this.selectedPackage = this.packagesList[pos];

        }
      }
      else {
        this.genericService.findOne('/package/findOne', this.selectedRecord.invoices[0].packages).subscribe(
          p => {
            this.selectedPackage = p;
            const pos = this.packagesList.map(function (e) { return e.packages.package_name; }).indexOf(this.selectedPackage.package_name);

            if (pos >= 0) {
              this.selectedPackage = this.packagesList[pos];

            }
            this.form.patchValue({ connection_price: this.selectedRecord.invoices[0].package_price });
          }
        );
      }
      // if (this.selectedPackage) {
      //   const pos = this.packagesList.map(function (e) { return e.packages.package_name; }).indexOf(this.selectedPackage.package_name);

      //   if (pos >= 0) {
      //     this.selectedPackage = this.packagesList[pos];

      //   }
      // }
    }, err => {
      this.toastr.error(err.error.err || err.error);
    });
  }
  getCustomers() {
    this.genericService.find('/customer/customerConnection').subscribe((data: any) => {
      this.customerList = data.customers;
      this.createSearchableArray();
    }, err => {
      // this.toastr.error(err.error.err || err.error);
    });
  }
  createForm() {
    this.form = this.fb.group({
      id: [null],
      customers: [null, Validators.required],
      first_name: [null, { disabled: true }],
      last_name: [null],
      cnic: [null],
      email: [null],
      mobile: [null],
      search: [],
      invoices: [null, { disabled: true }],
      address: [null, Validators.required],
      username: [null],
      password: [null, { disabled: true }],
      router_of: [null],
      router_brand: [null],
      router_model: [null],
      router_price: [null],
      drop_wire_of: [null],
      drop_wire_length: [null],
      price_per_meter: [null],
      connection_price: [null, Validators.required],
      is_wireless: [null],
      lat: [null],
      long: [null],
      packages: [null, Validators.required]
    });
  }
  updateConnection() {

  }
  onSubmit() {
    this.form.value.packages = this.selectedPackage.packages.id;
    
      if (this.id) {
        this.genericService.create('/connection/update', this.form.value).subscribe(
          data => {
            if (this.id && this.signedDoc) {
              this.uploadFile(this.id);
            }
            this.toastr.success("connection updated successfully.");
            this.selectedRecord = false;
            this.ngOnInit();
            this.docPic = null;
            this.searchAbleArray = [];
            this.form.reset();
          },
          err => {
            this.toastr.error(err.error.err || err.error);
          });
      }
      else {
        if (this.signedDoc) {
        this.genericService.create('/connection/create', this.form.value).subscribe(
          data => {
            if (data.id) {
              this.uploadFile(data.id);
            }
            this.toastr.success("connection add successfully.");
            this.router.navigateByUrl('pages/connections/listConnections');
            // this.selectedRecord = false;
            // this.ngOnInit();
            // this.docPic = null;
            // this.searchAbleArray = [];
            // this.form.reset();
          },
          err => {
            this.toastr.error(err.error.err || err.error);
          }
        );
      }
      else {
        this.toastr.warning('Signed Document is required');
      }
      }
   
  }
  uploadFile(id) {
    if (this.signedDoc) {
      this.toastr.info('Uploading Document');
      this.fileUploadService.postFile('/connection/fileUpload', this.signedDoc, 'signedDoc', id).subscribe(data => {
        this.toastr.success("Document Uploaded");
      }, err => {
        this.toastr.error(err.error.err || err.error);
      });
    }

  }
  uploadSignedDoc(event) {
    const doc = event.target.files[0];
    this.signedDoc = doc;
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.docPic = event.target.result;
    }
    reader.readAsDataURL(event.target.files[0]);
  }
  createSearchableArray() {
    for (let item of this.customerList) {
      this.searchAbleArray.push(item.username);
    }
  }
  afterSelectingRecord(s) {
    const pos = this.customerList.map(function (e) { return e.username; }).indexOf(s);
    this.selectedRecord = this.customerList[pos];
    this.form.patchValue({
      customers: this.selectedRecord.id,
      first_name: this.selectedRecord.first_name,
      last_name: this.selectedRecord.last_name,
      cnic: this.selectedRecord.cnic,
      email: this.selectedRecord.email,
      mobile: this.selectedRecord.mobile,
      username: this.selectedRecord.username,
      password: this.selectedRecord.password,
      address: this.selectedRecord.address,
      invoices: this.selectedRecord.invoices[0].id
    });
    this.getPackages();
  }
  packageChange() {
    this.form.patchValue({ connection_price: this.selectedPackage.price });
    // console.log(this.selectedPackage , event);

  }
  customerFieldChange() {
    // console.log('onchange')
    this.selectedRecord = false;
  }
  patchConnection(): Promise<any> {

    return new Promise(resolve => {
      this.route.params.subscribe(async params => {
        this.id = params["id"]; // (+) converts string 'id' to a number
        if (this.id !== undefined) {
          this.docPic = '/assets/images/loading.gif';
          await this.genericService.findOne('/connection/findOne', this.id).subscribe((data: any) => {

            this.form.patchValue({
              id: data.id,
              connection_price: data.connection_price,
              address: data.address,
              username: data.customers.username,
              router_of: data.router_of,
              router_brand: data.router_brand,
              router_model: data.router_model,
              router_price: data.router_price,
              drop_wire_of: data.drop_wire_of,
              drop_wire_length: data.drop_wire_length,
              price_per_meter: data.price_per_meter,
              is_wireless: data.is_wireless == true ? 1 : 0,
              lat: data.lat,
              long: data.long,
              search: data.customers.username,

            });

            this.selectedRecord = data.customers
            this.form.patchValue({
              customers: this.selectedRecord.id,
              first_name: this.selectedRecord.first_name,
              last_name: this.selectedRecord.last_name,
              cnic: this.selectedRecord.cnic,
              email: this.selectedRecord.email,
              mobile: this.selectedRecord.mobile,
              username: this.selectedRecord.username,
              password: this.selectedRecord.password,
              invoices: data.invoices[0].id
            });

            // console.log('form value', data.rejectdoc[0])

            if (data.rejectdoc.length >= 1) {
              this.rejectReason = '';
              switch (data.rejectdoc[0].rejection_type) {
                case 0:
                  this.rejectReason = 'CNIC not Match';
                  break;
                case 1:
                  this.rejectReason = 'Location Error'
                  break;
                case 2:
                  this.rejectReason = 'Reg Form Error'
                  break;
              }

            }
            this.searchAbleArray.length = 0;
            this.searchAbleArray.push(this.selectedRecord.username);
            this.docPic = data.regForm;
            // this.signedDoc = data.regForm;
           
            this.selectedPackage = data.new_package;
            this.getPackages();
            if(data.status_id == 16 || data.status_id == 18){
              this.form.disable();
            }
            return resolve(true);

          },
            err => {
              this.toastr.error(err.error.err || err.error);
              return resolve(true);

            });
        }
        return resolve(true);

      });
    });
  }

}
