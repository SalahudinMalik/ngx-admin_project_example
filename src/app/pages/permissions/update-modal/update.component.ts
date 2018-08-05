import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
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
import { PermissionsService } from "../../../@core/data/permission.service";

@Component({
  selector: "ngx-modal",
  templateUrl: "update.component.html"
})
export class UpdateComponent implements OnInit {
  roleUpdated: boolean = false;
  routeUpdated: boolean = false;
  userOrRole: any;
  selectedPackage: any;
  modalHeader: string;
  modalFor: string;
  public form: FormGroup;
  modalContent: any;
  roles: any;
  routes: any;
  roleId: any;
  routeId: any;
  roleIdInit: any;
  routeIdInit: any;
  constructor(
    private activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private customersService: CustomersService,
    private toastr: ToastrService,
    private permissionService: PermissionsService
  ) {}

  ngOnInit() {
    this.roleIdInit = this.modalContent.role.id;
    this.routeIdInit = this.modalContent.route.id;

    this.permissionService.getRoles().subscribe((data: any) => {
      this.roles = data.roles;
    });
    this.permissionService.getRoutes().subscribe((data: any) => {
      this.routes = data.routes;
    });
    this.form = this.fb.group({
      id: [null, Validators.compose([Validators.required])],
      userOrRole: [null, Validators.compose([Validators.required])],
      route: [null, Validators.compose([Validators.required])]
    });
  }
  // private cObj: CustomersListComponent =
  //  new CustomersListComponent(null , null , null , null , null , null , null , this.authService ) ;
  closeModal() {
    this.activeModal.close();
  }

  onSubmit() {
    if (this.modalFor == "Roles") {
      const updatedRole = {
        id: this.modalContent.id,
        role_id: this.modalContent.role.id,
        route_id: this.modalContent.route.id
      };

      this.permissionService.updateRolePermission(updatedRole).subscribe(
        data1 => {
          this.toastr.success("Updated Successfully");
          // this.customersListComponent.refresh();
          this.activeModal.close();
        },
        error => {
          this.toastr.error("Updation Error");
        }
      );
    }
  }
  //  console.log(this.form.valid);  // false
  //   if (this.form.value.cnicNo) {
  //     this.customersService.deleteCustomer(this.modalU_ID).subscribe(
  //       data1 => {
  //         this.toastr.success("Deleted Successfully");
  //         // this.customersListComponent.refresh();
  //         this.activeModal.close();
  //       },
  //       error => {
  //         this.toastr.error("Deletion Error");
  //       }
  //     );
  //   } else {
  //     this.toastr.warning("Wrong CNIC number.");
  //   }
  // }

  selectRoleChange(item) {
    if (item == this.roleIdInit) {
      this.roleUpdated = false;
    } else {
      this.roleId = item;
      this.roleUpdated = true;
    }
  }
  selectRouteChange(item) {
    if (item == this.routeIdInit) {
      this.routeUpdated = false;
    } else {
      this.routeId = item.toNumber;
      this.routeUpdated = true;
    }
  }
}
