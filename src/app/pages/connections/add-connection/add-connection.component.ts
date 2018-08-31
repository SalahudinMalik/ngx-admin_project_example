import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { FileUploadService } from "../../../@core/data/file-upload.service";
import { GenericStockService } from "../../../@core/data/generic-stock.service";
import { ActivatedRoute } from "@angular/router";
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
  rejectReason:any;
  user: any;
  id: any;
  constructor(private fb: FormBuilder, private genericService: GenericStockService,
    private toastr: ToastrService, private fileUploadService: FileUploadService,
    private route: ActivatedRoute,
    private tokenAuthService: TokenAuthService,
  ) { }
  async ngOnInit() {
    this.user = this.tokenAuthService.user.user;
    console.log(this.user);
    this.selectedPackage = {};
    this.createForm();
    await this.patchConnection();
    await this.getPackages();
    if(!this.id)
      this.getCustomers();



  }
  async getPackages(){
     
     await this.genericService.find('/dealerpackages/find').subscribe((data: any) => {
      this.packagesList = data.dealerPackages;
      
      if (this.selectedPackage) {
         const pos = this.packagesList.map(function (e) { console.log(e.packages.package_name); return e.packages.package_name; }).indexOf(this.selectedPackage.package_name);
       
        if (pos >= 0) {
          this.selectedPackage = this.packagesList[pos];
          console.log('package')
        }
      }
    }, err => {
      this.toastr.error(err.error.err || err.error);
    });
  }
  getCustomers() {
    this.genericService.find('/customer/customerConnection').subscribe((data: any) => {
      this.customerList = data.customers;
      this.createSearchableArray();
    }, err => {
      this.toastr.error(err.error.err || err.error);
    });
  }
  createForm() {
    this.form = this.fb.group({
      id:[null],
      customers: [null, Validators.required],
      first_name: [null, { disabled: true }],
      last_name: [null],
      cnic: [null],
      email: [null],
      mobile: [null],
      search: [],
      address: [null],
      username: [null],
      password: [null, { disabled: true }],
      router_of: [1],
      router_brand: [null],
      router_model: [null],
      router_price: [null],
      drop_wire_of: [1],
      drop_wire_length: [null],
      price_per_meter: [null],
      connection_price: [null, Validators.required],
      is_wireless: [0],
      lat: [null],
      long: [null],
      packages: [null, Validators.required]
    });
  }
  updateConnection(){

  }
  onSubmit() {
    this.form.value.packages = this.selectedPackage.packages.id;
    if(this.id){
      this.genericService.create('/connection/update', this.form.value).subscribe(
         data => {
          if (this.id) {
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
    else{
    this.genericService.create('/connection/create', this.form.value).subscribe(
      data => {
        if (data.id) {
          this.uploadFile(data.id);
        }
        this.toastr.success("connection add successfully.");
        this.selectedRecord = false;
        this.ngOnInit();
        this.docPic = null;
        this.searchAbleArray = [];
        this.form.reset();
      },
      err => {
        this.toastr.error(err.error.err || err.error);
      }
    );
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

    });
  }
  packageChange(event) {
    this.form.patchValue({ connection_price: this.selectedPackage.price });
    // console.log(this.selectedPackage , event);

  }
  customerFieldChange() {
    // console.log('onchange')
    this.selectedRecord = false;
  }
  async patchConnection() {
    
     await this.route.params.subscribe(async params => {
      this.id = params["id"]; // (+) converts string 'id' to a number
      if (this.id !== undefined) {
        await this.genericService.findOne('/connection/findOne', this.id).subscribe((data: any) => {
          this.form.patchValue({
            id : data.id,
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
            is_wireless: data.is_wireless,
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

          });
          console.log('form value', data.rejectdoc[0])

          if(data.rejectdoc.length >=1 ){
            this.rejectReason = '';
            switch(data.rejectdoc[0].rejection_type){
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
            console.log('rejectReason' , this.rejectReason)
          }
          this.searchAbleArray.length = 0;
          this.searchAbleArray.push(this.selectedRecord.username);
          this.docPic = data.regForm;
          // console.log(this.packagesList );

          this.selectedPackage = data.new_package == null ? data.packages : data.new_package;
          // console.log(this.packagesList , pos);
          console.log('patch');
          return true;
          // this.form.('password');

        },
          err => {
            this.toastr.error(err.error.err || err.error);
            return false;
          });
      }


    });
  }


}
