import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { NgForm } from "@angular/forms";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { PackagesService } from "../../../@core/data/packages.service";
import { NbAuthService } from "@nebular/auth";
import { Package } from "../../../models/package.model";
import * as _ from "lodash";
import { DealerPackageService } from "../../../@core/data/dealerpackage.service";

@Component({
  selector: "ngx-modal",
  template: `
  <form class="form" role="form" [formGroup]="form" (ngSubmit)="onSubmit()">
  <fieldset>
  <div class="modal-header">
      <span>{{ modalHeader }}</span>
      <button class="close" aria-label="Close" (click)="closeModal()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>

    <div class="modal-body">
    <div class="col-lg-12 mt-1 mb-2 ">
                <label>Package </label>
                <select [(ngModel)]="selectedPackage" class="form-control" [formControl]="form.controls['packageGroup']" [ngClass]="{'form-control-danger': form.controls['packageGroup'].hasError('required') && form.controls['packageGroup'].touched}">
                  <option *ngFor="let p of package" [ngValue]="p">{{p.package_name}}</option>
                </select>
                <div  class="m-1" *ngIf="form.controls['packageGroup'].hasError('required') && form.controls['packageGroup'].touched">Package is required.</div>
              </div>
     <div class=" form-group col-lg-12" >
     <!-- <input type="number" placeholder="CNIC Number" class="form-control"/> -->
     <input type="number" placeholder="Package Price" class="form-control"  [formControl]="form.controls['price']" [ngClass] = "{'form-control-danger': form.controls['price'].hasError('required') && form.controls['price'].touched}"/>
     <div  class="m-1" *ngIf="form.controls['price'].hasError('required') && form.controls['price'].touched">price is required</div>
   </div>

    </div>
    <div class="modal-footer">
      <button  type="submit" [disabled]="!form.valid" class="btn btn-md btn-primary" >Add</button>
    </div>
    </fieldset>
</form>
  `
})
export class PackageComponent implements OnInit {
  modalHeader: string;
  modalUser: string;
  modalUCnic: string;
  modalDataArray: any = [];
  modalData: any = {
    id: "",
    packageId: "",
    packageName: "",
    packagePrice: ""
  };
  public form: FormGroup;
  modalContent: any;
  selectedPackage: any;
  package: Package[] = [];

  constructor(
    private activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private packageService: PackagesService,
    private toastr: ToastrService,
    private authService: NbAuthService,
    private dpService: DealerPackageService
  ) {}

  ngOnInit() {
    this.modalData.id = "";
    this.modalData.packageName = "";
    this.modalData.packagePrice = "";
    this.packageService.getPackages().subscribe((data: any) => {
      this.package = data.packages;
    });
    this.form = this.fb.group({
      packageGroup: [null, Validators.required],
      price: [null, Validators.required]
    });
  }

  // private cObj: CustomersListComponent =
  //  new CustomersListComponent(null , null , null , null , null , null , null , this.authService ) ;
  closeModal() {
    this.activeModal.close();
  }
  onSubmit() {
    this.modalData.packageId = this.selectedPackage.id;
    this.modalData.packageName = this.selectedPackage.package_name;
    this.modalData.packagePrice = this.form.value.price;
    if (_.some(this.modalDataArray, { packageId: this.selectedPackage.id })) {
      this.toastr.warning("Record already exist.");
    } else {
      this.activeModal.close(this.modalData);
    }

    let dbArray: any = [];
    this.dpService
      .getAllDealerPackages(this.modalContent.id)
      .subscribe((result: any) => {
       
          for (let dp of result.dealerPackages) {
            let dpData = {
              id: "",
              packageId: "",
              packageName: "",
              packagePrice: ""
            };
            dpData.id = dp.id;
            dpData.packageId = dp.packages.id;
            dpData.packageName = dp.packages.package_name;
            dpData.packagePrice = dp.price;
            dbArray.push(dpData);
          }
        
        let dif = _.differenceWith(this.modalDataArray, dbArray, _.isEqual);
        // this.refresh();
        for (let d of dif) {
          let saveData: any = {
            dealer_id: this.modalContent.id,
            package_id: d.packageId,
            price: d.packagePrice
          };
          this.dpService.saveDealerPackages(saveData).subscribe(
            (result: any) => {
              // notify = true;
              this.toastr.success("dealer package add successfully.");
            },
            err => {
              // notify = false;
              this.toastr.error(err.error.err || err.error);
            }
          );
        }
      },
      err =>{
        let saveData: any = {
          dealer_id: this.modalContent.id,
          package_id: this.selectedPackage.id,
          price: this.form.value.price
        };
        this.dpService.saveDealerPackages(saveData).subscribe(
          (result: any) => {
            // notify = true;
            this.toastr.success("dealer package add successfully.");
          },
          err => {
            // notify = false;
            this.toastr.error(err.error.err || err.error);
          }
        );
      });
    // if (this.form.value.cnicNo == this.modalUCnic) {
    //   this.customersService.deleteCustomer(this.modalU_ID)
    //     .subscribe(data1 => {
    //       this.toastr.success('Deleted Successfully');
    //       // this.customersListComponent.refresh();
    //       this.activeModal.close();
    //     },
    //       error => {
    //         this.toastr.error('Deletion Error');

    //       });
    // }
    // else {
    //   this.toastr.warning('Wrong CNIC number.');
    // }
  }
}
