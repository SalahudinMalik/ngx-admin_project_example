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
import { CustomersService } from "../../../@core/data/customers.service";

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
     <label> Enter CNIC number for {{modalContent}} to Delete </label>
     <div class=" form-group" >
     <!-- <input type="number" placeholder="CNIC Number" class="form-control"/> -->
     <input type="text" placeholder="CNIC Number" class="form-control"  [formControl]="form.controls['cnicNo']" [ngClass] = "{'form-control-danger': form.controls['cnicNo'].hasError('required') && form.controls['cnicNo'].touched}"/>
     <div style="color:red" class="m-1 form-control-feedback" *ngIf="form.controls['cnicNo'].hasError('required') && form.controls['cnicNo'].touched">CNIC is required</div>
     <div style="color:red" class="m-1 form-control-feedback" *ngIf="form.controls['cnicNo'].hasError('maxlength')">CNIC must be 13 digits.</div>
     <div style="color:red" class="m-1 form-control-feedback" *ngIf="form.controls['cnicNo'].hasError('minlength')">CNIC must be 13 digits.</div>
     <div style="color:red" class="m-1 form-control-feedback" *ngIf="form.controls['cnicNo'].hasError('pattern')">CNIC must be in number formate.</div>
   </div>

    </div>
    <div class="modal-footer">
      <button  type="submit" [disabled]="!form.valid" class="btn btn-md btn-primary" >Delete</button>
    </div>
    </fieldset>
</form>
  `
})
export class DeleteComponent implements OnInit {
  modalHeader: string;
  modalUser: string;
  modalUCnic: string;
  modalU_ID: string;
  modalSrc: any;
  public form: FormGroup;
  modalContent = "";

  constructor(
    private activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private customersService: CustomersService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      cnicNo: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(13),
          Validators.maxLength(15),
          Validators.pattern("^[0-9]{5}(-)?[0-9]{7}(-)?[0-9]{1}$")
        ])
      ]
    });
  }
  // private cObj: CustomersListComponent =
  //  new CustomersListComponent(null , null , null , null , null , null , null , this.authService ) ;
  closeModal() {
    this.activeModal.close();
  }
  onSubmit() {
    //  console.log(this.form.valid);  // false
    if (this.form.value.cnicNo == this.modalUCnic) {
      this.customersService.deleteCustomer(this.modalU_ID).subscribe(
        data1 => {
          this.toastr.success("Deleted Successfully");
          // this.customersListComponent.refresh();
          this.activeModal.close();
        },
        error => {
          this.toastr.error("Deletion Error");
        }
      );
    } else {
      this.toastr.warning("Wrong CNIC number.");
    }
  }
}
