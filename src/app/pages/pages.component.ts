import { Component, HostListener, OnInit } from "@angular/core";
import { NbAuthJWTToken, NbAuthService } from "@nebular/auth";
import { UserService } from "../@core/data/appuser.service";
import { MENU_ITEMS } from "./pages-menu";
import { TokenAuthService } from "../@core/data/token-auth.service";
import { NgxPermissionsService } from "ngx-permissions";
import { PermissionsService } from "../@core/data/permission.service";
import { Router } from "../../../node_modules/@angular/router";
import { Location } from '@angular/common';
import * as _ from 'lodash';
import { GenericStockService } from "../@core/data/generic-stock.service";
import { AnalyticsService } from "../@core/utils/analytics.service";
import { UserGaurdService } from "./user-gaurd.service";
export enum KEY_CODE { ESC = 27 }

@Component({
  selector: "ngx-pages",
  template: `
    <ngx-sample-layout>
      <nb-menu *ngIf="menuItems.length > 0" [items]="menuItems"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-sample-layout>
  `
})
export class PagesComponent implements OnInit {
  menuItems: Array<any> = [];
  userToken: any;
  user: any;
  permission: any;
  homepage: boolean = true;
  constructor(
    private userGaurdService: UserGaurdService,
    private analytics: AnalyticsService,
    public genericService: GenericStockService,
    public location: Location,
    private router: Router,
    private tokenAuthService: TokenAuthService,
    private permissionService: NgxPermissionsService,
  ) {
    this.tokenAuthService.getToken();  // first call of the application should be Get Token
    this.analytics.trackPageViews();
  }
  ngOnInit() {
    this.user = this.tokenAuthService.user.user;
    this.getMenuItems();
    this.permissionService.permissions$.subscribe(permissions => { this.permission = permissions; });
    this.permissionService.loadPermissions([this.tokenAuthService.user.user.role.name]);
    if (this.permission.Login_Manager) { };
  }
  getMenuItems() {
    const roleId = this.tokenAuthService.user.user.role.id;
    if (roleId == 1) {
      this.menuItems = _.cloneDeep(MENU_ITEMS);
      this.userGaurdService.menuItems = _.cloneDeep(this.menuItems);
      this.router.navigateByUrl(this.menuItems[0].link);
    } else {
      this.genericService.findOne('/rolepermissions/findOne', roleId).subscribe(data => {
        this.menuItems = _.cloneDeep(data.menu);
        for (let item of this.menuItems) {
          item.hidden = !item.hidden
          if (!item.hidden && this.homepage && !item.children) {
            this.router.navigateByUrl(item.link);
            this.homepage = false;
          } else if (!item.hidden && this.homepage && item.children) {
            this.router.navigateByUrl(item.children[0].link);
            this.homepage = false;
          }
        }
        this.userGaurdService.menuItems = _.cloneDeep(this.menuItems);
      });
    }
  }
  checkKeyPress() {
    document.onkeydown = function (evt) {
      if (evt.keyCode == 27) {
        alert('Esc key pressed.');
      }
    };
  }
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.keyCode === KEY_CODE.ESC) {
      this.location.back();
    }
  }
  goBack() {
    this.location.back();
  }
}
