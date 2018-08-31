import { Component, OnInit } from '@angular/core';
import { GenericStockService } from '../../../@core/data/generic-stock.service';
import { ToastrService } from '../../../../../node_modules/ngx-toastr';
import { NgbActiveModal } from '../../../../../node_modules/@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  roles: Array<any> = [];
  rolesSearchAbleArray: Array<any> = [];
  routes: Array<any> = [];
  routesSearchAbleArray: Array<any> = [];
  selectedRole: any;
  selectedRoute: any;
  description: string;
  constructor(public genericService: GenericStockService, public toastr: ToastrService, private activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.getRoles();
    this.getRoutes();
  }

  getRoles() {
    this.genericService.find('/roles/find').subscribe((data: any) => {
      this.roles = data.roles;
      this.createRolesSearchAbleArray();
    }, err => {
      this.toastr.error(err.error.err || err.error);
    });
  }
  getRoutes() {
    this.genericService.find('/routes/find').subscribe((data: any) => {
      this.routes = data.routes;
      this.createRoutesSearchableArray();
    }, err => {
      this.toastr.error(err.error.err || err.error);
    });
  }

  afterSelectingRolesRecord(event) {
    const pos = this.roles.map(function (e) { return e['name']; }).indexOf(event);
    this.selectedRole = this.roles[pos];
  }
  afterSelectingRoutesRecord(event) {
    const pos = this.routes.map(function (e) { return e.end_point; }).indexOf(event);
    this.selectedRoute = this.routes[pos];
  }

  createRolesSearchAbleArray() {
    for (let item of this.roles) {
      this.rolesSearchAbleArray.push(item.name);
    }
  }
  createRoutesSearchableArray() {
    for (let item of this.routes) {
      this.routesSearchAbleArray.push(item.end_point);
    }
  }

  add() {
    if (this.selectedRole && this.selectedRoute) {
      this.genericService.create('/rolesroutes/create',
        {
          role_id: this.selectedRole.id,
          routes_id: this.selectedRoute.id,
          description: this.description
        }).subscribe(data => {
          this.toastr.success('Added Successfully');
          this.activeModal.close();
        }, err => {
          this.toastr.error(err.error.err || err.error);
        })
    } else {
      this.toastr.warning('Please select role and route');
    }
  }
}