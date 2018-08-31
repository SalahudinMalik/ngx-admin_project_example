import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { ActivatedRoute } from "@angular/router";
import { GenericStockService } from "../../../@core/data/generic-stock.service";

@Component({
  selector: 'ngx-add-basestation',
  templateUrl: './add-basestation.component.html',
  styleUrls: ['./add-basestation.component.scss']
})
export class AddBaseStationComponent implements OnInit {
  public form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private genericService: GenericStockService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) { }
  ngOnInit() {
    this.createForm();
    this.patchValues();
  }
  createForm() {
    this.form = this.fb.group({
      name: [null, Validators.required],
      lat: [null, Validators.required],
      long: [null, Validators.required],
      bandwidth: [null, Validators.required],
      maxusers: [null, Validators.required],
      address: [null, Validators.required]
    });
  }
  onSubmit() {
    const data = {
      name: this.form.value.name,
      lat: this.form.value.lat,
      long: this.form.value.long,
      bandwidth: this.form.value.bandwidth,
      max_connection: this.form.value.maxusers,
      address: this.form.value.address
    }
    this.genericService.create('/basestation/create', data).subscribe(
      data => {
          this.toastr.success("Basestation added successfully.");
          this.form.reset();
      },
      err => {
        this.toastr.error(err.error.err || err.error);
      }
    );
  }
  patchValues() {
    this.route.params.subscribe(params => {
      const id = params["id"];
      if (id !== undefined) {
        this.genericService.findOne('/basestation/findOne', id).subscribe(data => {
          this.form.patchValue({
            name: data.name,
            lat: data.lat,
            long: data.long,
            bandwidth: data.bandwidth,
            maxusers: data.maxusers,
            address: data.address,
          });
          this.form.disable();
        });
      }
    });
  }
}