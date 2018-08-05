import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { ActivatedRoute } from "@angular/router";
import { ComplaintsService } from "../../../@core/data/complaints.service";
import { Complaints } from "../../../models/complaints.model";
import { DISABLED } from "@angular/forms/src/model";

@Component({
  selector: "ngx-add-complain",
  templateUrl: "./add-complain.component.html",
  styleUrls: ["./add-complain.component.scss"]
})
export class AddComplainComponent implements OnInit, OnDestroy {
  id: any;
  private sub: any;
  btnSave: boolean;
  public form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private packageService: ComplaintsService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.btnSave = true;

    this.form = this.fb.group({
      connection: [null, Validators.compose([Validators.required])],
      subject: [null, Validators.compose([Validators.required])],
      complaint: [null, Validators.compose([Validators.required])]
      // assignto: [null, Validators.compose([Validators.required])]
    });
    this.sub = this.route.params.subscribe(params => {
      this.id = params["id"]; // (+) converts string 'id' to a number
      console.log("this.id " + this.id);
      if (this.id !== undefined) {
        this.packageService.getOneComplaint(this.id).subscribe(data => {
          this.form.patchValue({
            subject: data.customerId,
            complaint: data.complaintStatus,
            assignto: data.assignedTo
          });
          this.form.disable();
          this.btnSave = true;

          console.log(
            "form.valid " + this.form.valid + " btnSave " + this.btnSave
          );
        });
      }

      // In a real app: dispatch action to load the details here.
    });
    console.log("this.id " + this.id);
  }
  onSubmit() {
    var date = new Date();

    const data = {
      subject: this.form.value.subject,
      description: this.form.value.complaint,
      connection_name: this.form.value.connection
      // assignedTo: this.form.value.assignto,
      // complaintOpenDateTime: date.toUTCString(),
      // opendBy: "",
      // resolvedDate: date.toUTCString()
    };

    this.packageService.saveComplaint(data).subscribe(
      data1 => {
        console.log("Data inserted");
        this.toastr.success("Data inserted successfully.");
      },
      error => {
        this.toastr.error("Data not inserted error occured.");
      }
    );
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
