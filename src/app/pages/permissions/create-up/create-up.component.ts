import { Component, OnInit } from '@angular/core';
import { GenericStockService } from '../../../@core/data/generic-stock.service';
import { ToastrService } from '../../../../../node_modules/ngx-toastr';
import { NgbActiveModal } from '../../../../../node_modules/@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-create-up',
  templateUrl: './create-up.component.html',
  styleUrls: ['./create-up.component.scss']
})
export class CreateUpComponent implements OnInit {
 users: Array<any> = [];
  usersSearchAbleArray: Array<any> = [];
  routes: Array<any> = [];
  routesSearchAbleArray: Array<any> = [];
  selectedUser: any;
  selectedRoute: any;
  description: string;
  constructor(public genericService: GenericStockService, public toastr: ToastrService, private activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.getUsers();
    this.getRoutes();
  }

  getUsers() {
    this.genericService.find('/user/find').subscribe((data: any) => {
      this.users = data.users;
      this.createUsersSearchAbleArray();
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

  afterSelectingUsersRecord(event) {
    const pos = this.users.map(function (e) { console.log(e); return e.first_name; }).indexOf(event);
    this.selectedUser = this.users[pos];
  }
  afterSelectingRoutesRecord(event) {
    const pos = this.routes.map(function (e) { return e.end_point; }).indexOf(event);
    this.selectedRoute = this.routes[pos];
  }

  createUsersSearchAbleArray() {
    for (let item of this.users) {
      this.usersSearchAbleArray.push(item.first_name);
    }
  }
  createRoutesSearchableArray() {
    for (let item of this.routes) {
      this.routesSearchAbleArray.push(item.end_point);
    }
  }

  add() {
    console.log(this.selectedRoute , this.selectedUser);
    if (this.selectedUser && this.selectedRoute) {
      this.genericService.create('/usersroutes/create',
        {
          user_id: this.selectedUser.id,
          routes_id: this.selectedRoute.id,
          description: this.description
        }).subscribe(data => {
          this.toastr.success('Added SuccessFully');
          this.activeModal.close();
        }, err => {
          this.toastr.error(err.error.err || err.error);
        })
    } else {
      this.toastr.warning('Please select user and route');
    }
  }

}
