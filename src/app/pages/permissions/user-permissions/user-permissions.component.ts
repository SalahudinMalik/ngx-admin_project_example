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

@Component({
  selector: "ngx-user-permissions",
  templateUrl: "./user-permissions.component.html",
  styleUrls: ["./user-permissions.component.scss"]
})
export class UserPermissionsComponent implements OnInit {
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
      users: {
        title: "User Role"
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

      delete: false
    },

    edit: {
      position: "right",
      editButtonContent: '<i class="nb-edit"></i>'
    }
  };

  ngOnInit() {
    this.permissionService.getAllUserPermissions().subscribe((data: any) => {
      console.log(data, "console user routes");
      if (data.length > 0) {
        this.permissionData = data;
        const d = data.usersRoutes;
        d.forEach(element => {
          const d = {
            id: element.id,
            users: element.user.first_name,
            routes: element.routes.end_point,
            description: ""
          };

          this.data.push(d);
          if (data.usersRoutes.length === this.data.length) {
            this.source.load(this.data);
          }
        });
      }
    });

    // this.obj.forEach(element => {
    //   const d = {
    //     id: element.id,
    //     roles: element.roles.name,
    //     routes: element.routes.end_point,
    //     description: element.description
    //   };

    //   this.data.push(d);
    // });
  }

  public refresh(): void {
    this.ngOnInit();
    console.log("refresh ");
  }

  openUpdateModal(s) {
    const activeModal = this.modalService.open(UpdateComponent, {
      size: "lg",
      container: "nb-layout"
    });

    activeModal.componentInstance.modalHeader = "Update User";
    activeModal.componentInstance.modalContent = s.data;
    activeModal.componentInstance.modalFor = "Users";
    // activeModal.componentInstance.modalUCnic = event.data.cnic;
    // activeModal.componentInstance.modalU_ID = event.data.id;
    // activeModal.componentInstance.modalSrc = this.data;
    activeModal.result.then(
      a => {
        console.log(a, "result");
        this.refresh();
        console.log("AASssssssas das das dasd ");
      },
      () => {
        console.log("Backdrop click");
      }
    );
  }
  print(event): void {
    // this.router.navigate(['print/customerprint', event.data.id]);
  }
}
