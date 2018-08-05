import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";
import { UserService } from "../../../@core/data/appuser.service";
import { Observable } from "rxjs";
import { startWith, map } from "rxjs/operators";
import { ToastrService } from "ngx-toastr";
import { NotificationService } from "../../../@core/data/notification.service";

@Component({
  selector: "notifications-page",
  templateUrl: "./notifications-page.component.html",
  styleUrls: ["./notifications-page.component.scss"]
})
export class NotificationsPageComponent implements OnInit {
  public form: FormGroup;
  public days = [
    { day: "Sunday" },
    { day: "Monday" },
    { day: "Tuesday" },
    { day: "Wednesday" },
    { day: "Thursday" },
    { day: "Friday" },
    { day: "Saturday" }
  ];

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private notify: NotificationService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      expiringIn: [null, Validators.compose([Validators.required])],
      everyDay: [null, Validators.compose([Validators.required])],
      time: [null, Validators.compose([Validators.required])]
      // min: [null, Validators.compose([Validators.required])]
      // assignto: [null, Validators.compose([Validators.required])]
    });
  }

  onSubmit() {
    const data = {
      expires_in: this.form.value.expiringIn,
      cron_job_time: this.form.value.time
    };
    console.log(data);
    this.notify.createNotification(data).subscribe(
      result => {
        this.form.reset();
        this.toastr.success("Notified");
      },
      error => {
        console.error(error);
        this.toastr.error("Error in Notification");
      }
    );
  }
  onDeleteConfirm(event): void {}
}
