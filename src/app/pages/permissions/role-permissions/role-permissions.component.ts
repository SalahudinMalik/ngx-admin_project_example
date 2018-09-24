import { Component, OnInit } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";
import { Router } from "@angular/router";
import { DatePipe } from "@angular/common";
import { Http } from "@angular/http";
import { ServerDataSource } from "ng2-smart-table";
import { Globals } from "../../../../Globals";
import { NbAuthService } from "@nebular/auth";
import { ToastrService } from "ngx-toastr";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { PermissionsService } from "../../../@core/data/permission.service";
import { UpdateComponent } from "../update-modal/update.component";
import { CreateComponent } from "../create-rp/create.component";

@Component({
  selector: "ngx-role-permissions",
  templateUrl: "./role-permissions.component.html",
  styleUrls: ["./role-permissions.component.scss"]
})
export class RolePermissionsComponent implements OnInit {
  source: LocalDataSource = new LocalDataSource();
  token: any;
  data: any = [];
  permissionData: any;

  constructor(
    private router: Router,
    private datePipe: DatePipe,
    private http: Http,
    private globals: Globals,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private authService: NbAuthService,
    private permissionService: PermissionsService
  ) {
    this.token = authService.getToken();
    this.token = this.token.value.token;
  }
  settings = {
    mode: "external",
    columns: {
      id: {
        title: "Id"
      },
      roles: {
        title: "Role"
      },
      routes: {
        title: "Routes"
      },
      description: {
        title: "Description"
      }
    },
    actions: {
      add: false,
      edit:false,
      delete: false
    },

    edit: {
      position: "right",
      editButtonContent: '<i class="nb-edit"></i>'
    }
  };

  ngOnInit() {
    this.permissionService.getAllRolePermissions().subscribe((data: any) => {
      this.permissionData = data;
      const d = data.rolesRoutes;
      d.forEach(element => {
        const d = {
          id: element.id,
          roles: element.roles.name,
          routes: element.routes.end_point,
          description: element.description,
          role: element.roles,
          route: element.routes
        };

        this.data.push(d);
        if (data.rolesRoutes.length === this.data.length) {
          this.source.load(this.data);
        }
      });
    });
  }

  public refresh(): void {
    this.ngOnInit();
  }

  openUpdateModal(s) {
    const activeModal = this.modalService.open(UpdateComponent, {
      size: "lg",
      container: "nb-layout"
    });

    activeModal.componentInstance.modalHeader = "Update Role";
    activeModal.componentInstance.modalContent = s.data;
    activeModal.componentInstance.modalFor = "Roles";
    // activeModal.componentInstance.modalContent = event.data.first_name;
    // activeModal.componentInstance.modalUCnic = event.data.cnic;
    // activeModal.componentInstance.modalU_ID = event.data.id;
    // activeModal.componentInstance.modalSrc = this.data;
    activeModal.result.then(
      () => {
        this.refresh();
      },
      () => {
      }
    );
  }
  addPermissions() {
    const activeModal = this.modalService.open(CreateComponent, {
      size: "lg",
      container: "nb-layout"
    });
    activeModal.componentInstance.modalHeader = "Update Role";
    activeModal.result.then(
      () => {
        this.refresh();
      },
      () => {
      }
    );
  }
}
