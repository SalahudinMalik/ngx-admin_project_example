import { Component, OnInit } from '@angular/core';
import { MENU_ITEMS } from "../../pages-menu";
import * as _ from 'lodash';
import { GenericStockService } from '../../../@core/data/generic-stock.service';
import { ToastrService } from '../../../../../node_modules/ngx-toastr';

@Component({
  selector: 'assign-views',
  templateUrl: './assign-views.component.html',
  styleUrls: ['./assign-views.component.scss']
})
export class AssignViewsComponent implements OnInit {
   menu: any = [];
  public role_id;
   allRoles: any;
  public dataToSend = {
    role_id: '',
    menu: '',
  }

  constructor(public genericService: GenericStockService, public toaster: ToastrService) {
    this.getAllRoles();
   }

  ngOnInit() {

  }
  getAllRoles() {
    this.genericService.find('/roles/find').subscribe(data => {
        this.allRoles = data.roles;
    }, 
    err =>{
      this.toaster.error(err.error.err || err.error);
    })
  }
  getselectedviews() {
    this.dataToSend.role_id = this.allRoles[this.allRoles.map(function (e) { return e.name; }).indexOf(this.role_id)].id;
    this.dataToSend.menu = this.menu;
    if (this.dataToSend.menu && this.dataToSend.role_id) {
      this.genericService.create('/rolepermissions/create', this.dataToSend).subscribe(data => {
        this.toaster.success('Permissions of selected Role are updated')
      }, err => {
        this.toaster.error(err.error.err || err.error);
      })
    }
  }

  getM(id) {
    const pos = this.allRoles.map(function (e) { return e.name; }).indexOf(this.role_id);
    this.genericService.findOne('/rolepermissions/findOne', this.allRoles[pos].id).subscribe(data => {
      if (data.menu) {
        this.menu = data.menu;
      } else {
      }
    }, err => {
      this.toaster.error(err.error.err || err.error);
      this.menu = [];
      this.menu = _.cloneDeep(MENU_ITEMS);
      for (let item of this.menu) {
        item.hidden = false;
      }
    })
  }
}
