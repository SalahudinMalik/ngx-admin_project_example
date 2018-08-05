import { Component, OnInit } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";
import { Router } from "@angular/router";
import { DatePipe } from "@angular/common";
import { Http } from "@angular/http";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";
import { UserService } from "../../../@core/data/appuser.service";
import { User } from "../../../models/user.model";
import { ServerDataSource } from "ng2-smart-table";
import { Globals } from "../../../../Globals";
import { NbAuthService } from "@nebular/auth";
import { ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
@Component({
  selector: "ngx-user",
  templateUrl: "./adduser.component.html",
  styleUrls: ["./adduser.component.scss"]
})
export class AddUserComponent implements OnInit {
  cnicFrontPic: string;
  cnicBackPic: string;
  docPic: string;
  id: any;
  userObj: User;
  private sub: any;
  roles: any;
  selectedRole;
  btnSave: boolean;
  public form: FormGroup;
  data: any;
  disableUpdate: boolean = false;
  constructor(
    private fb: FormBuilder,
    private usersService: UserService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.usersService.getRoles().subscribe(role => {
      this.roles = role.roles;
      console.log(this.roles);
    });
    this.form = this.fb.group({
      firstName: [null, Validators.compose([Validators.required])],
      lastName: [null, Validators.compose([Validators.required])],
      // cnicNo: [null, Validators.compose([Validators.required,
      //   Validators.minLength(13) , Validators.maxLength(13) ,  Validators.pattern('[0-9]+')])],
      email: [
        null,
        Validators.compose([Validators.email, Validators.required])
      ],
      mobileNo: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern("[0-9]+"),
          Validators.minLength(11),
          Validators.maxLength(11)
        ])
      ],
      userName: [null, Validators.compose([Validators.required])],
      password: [null, Validators.required],
      role: [null, Validators.required]
    });
    this.sub = this.route.params.subscribe(params => {
      this.id = params["id"]; // (+) converts string 'id' to a number
      // console.log('this.id ' + this.id);
      if (this.id !== undefined) {
        this.usersService.getOneUser(this.id).subscribe(data => {
          this.data = data;
          console.log(this.data);
          this.form.patchValue({
            firstName: data.first_name,
            lastName: data.last_name,
            email: data.email,
            mobileNo: data.mobile,
            role: data.role_id,
            userName: data.username

            // dArea: data.dArea,
            // packagerp: data.packagerp,
            // graceAmount: data.graceAmount,
            // gracePeriod: data.gracePeriod,
          });
          this.form.enable();
          this.btnSave = true;
          this.onChange();
        });
      }

      // In a real app: dispatch action to load the details here.
    });
  }

  onChange() {
    this.form.valueChanges.subscribe(r => {
      if (!r.role) {
        r.role = this.data.role;
      }
      if (
        r.firstName == this.data.first_name &&
        r.lastName == this.data.last_name &&
        r.email == this.data.email &&
        r.mobileNo == this.data.mobile &&
        r.role.id == this.data.role.id &&
        r.userName == this.data.username
      ) {
        this.disableUpdate = false;
      } else {
        this.disableUpdate = true;
      }
    });
  }
  cnicFPic(event) {
    const cnicF = event.target.files[0].name;
    this.cnicFrontPic = cnicF;
    // console.log('name ' + files);
  }
  cnicBPic(event) {
    const cnicB = event.target.files[0].name;
    this.cnicBackPic = cnicB;
    // console.log('name ' + files);
  }
  docsPic(event) {
    const doc = event.target.files[0].name;
    this.docPic = doc;
    // console.log('name ' + files);
  }
  onSubmit() {
    // console.log('data : ' + data);
    // this.userObj = {
    //   fullName: this.form.value.fullName,
    //   cnicNo: this.form.value.cnicNo,
    //   address: this.form.value.address,
    //   address2: this.form.value.address2,
    //   dArea: this.form.value.dArea == null ? 'Area1' : this.form.value.dArea,
    //   packagewsp: this.form.value.packagewsp,
    //   packagerp: this.form.value.packagerp,
    //   graceAmount: this.form.value.graceAmount,
    //   gracePeriod: this.form.value.gracePeriod,
    // }

    const data = {
      first_name: this.form.value.firstName,
      last_name: this.form.value.lastName,
      mobile: this.form.value.mobileNo,
      email: this.form.value.email,
      username: this.form.value.userName,
      password: this.form.value.password,
      role_id: this.form.value.role.id,
      role_type: this.form.value.role.id
    };
    if (!this.btnSave) {
      this.usersService.saveUser(data).subscribe(
        data1 => {
          this.toastr.success("Data inserted successfully.");
          this.form.reset();
        },
        error => {
          this.toastr.error("Data not inserted error occured.", error);
        }
      );
    } else if (this.btnSave) {
      data["id"] = this.data.id;

      this.usersService.updateUser(data).subscribe(
        data1 => {
          this.toastr.success("Data updated successfully.");
        },
        error => {
          this.toastr.error("Data not updated error occured.", error);
        }
      );
    }
  }
}
