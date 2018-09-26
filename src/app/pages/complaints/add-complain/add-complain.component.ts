import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { ActivatedRoute } from "@angular/router";
import { GenericStockService } from "../../../@core/data/generic-stock.service";

@Component({
  selector: "ngx-add-complain",
  templateUrl: "./add-complain.component.html",
  styleUrls: ["./add-complain.component.scss"]
})
export class AddComplainComponent implements OnInit {
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
      connection: [null, Validators.required],
      subject: [null, Validators.required],
      complaint: [null, Validators.required]
    });
  }
  onSubmit() {
    const data = {
      subject: this.form.value.subject,
      description: this.form.value.complaint,
      connection_name: this.form.value.connection
    };
    this.genericService.create('/complaints/create', data).subscribe(
      data => {
          this.toastr.success("complaints add successfully.");
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
        this.genericService.findOne('/complaints/findOne',id).subscribe(data => {
          this.form.patchValue({
            subject: data.subject,
            complaint: data.description,
          });
          this.form.disable();
        });
      }
    });
  }
}
