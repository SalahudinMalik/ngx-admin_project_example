import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";
import { ToastrService } from "ngx-toastr";
// import { NgProgress } from '@ngx-progressbar/core';
import { ActivatedRoute } from "@angular/router";
import { PackagesService } from "../../../@core/data/packages.service";
import { Package } from "../../../models/package.model";
import { DISABLED } from "@angular/forms/src/model";

@Component({
  selector: "ngx-add-package",
  templateUrl: "./add-package.component.html",
  styleUrls: ["./add-package.component.scss"]
})
export class AddPackageComponent implements OnInit, OnDestroy {
  data: Package;
  disableUpdate: boolean;
  editable: boolean = false;
  id: any;
  private sub: any;
  btnSave: boolean;
  public form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private packageService: PackagesService,
    private toastr: ToastrService,
    // private ngProgress: NgProgress,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      packageName: [null, Validators.required],
      bandwidth: [null, Validators.required],
      dataLimit: [null, Validators.required],
      costPrice: [null, Validators.required]
    });

    this.btnSave = true;
    this.sub = this.route.params.subscribe(params => {
      this.id = params["id"]; // (+) converts string 'id' to a number
      if (this.id !== undefined) {
        this.editable = true;
        this.packageService.getOnePackage(this.id).subscribe(data => {
          this.data = data;

          this.form.patchValue({
            packageName: data.package_name,
            bandwidth: data.bandwidth,
            dataLimit: data.data_limit,
            costPrice: data.cost_price
          });
          this.form.disable();
          this.btnSave = false;
          this.onChange();
        });
      }

      // In a real app: dispatch action to load the details here.
    });
  }
  onChange() {
    this.form.valueChanges.subscribe(r => {
      if (
        r.packageName == this.data.package_name &&
        r.bandwidth == this.data.bandwidth &&
        r.dataLimit == this.data.data_limit &&
        r.costPrice == this.data.cost_price
      ) {
        this.disableUpdate = false;
      } else {
        this.disableUpdate = true;
      }
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
  onSubmit() {
    const data = {
      package_name: this.form.value.packageName,
      bandwidth: this.form.value.bandwidth,
      data_limit: this.form.value.dataLimit,
      cost_price: this.form.value.costPrice
    };
    if (this.btnSave) {
      this.packageService.savePackage(data).subscribe(
        data1 => {
          this.toastr.success("package add successfully.");
          this.form.reset();
        },
        err => {
          this.toastr.error(err.error.err || err.error);
        }
      );
    } else if (!this.btnSave) {
      data["id"] = +this.id;
      this.packageService.updatePackage(data).subscribe(
        data => {
          this.toastr.success("Data updated successfully.");
        },
        err => {
          this.toastr.error(err.error.err || err.error);
        }
      );
    }
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
