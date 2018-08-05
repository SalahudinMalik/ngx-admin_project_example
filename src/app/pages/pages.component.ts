import { Component, OnInit } from "@angular/core";
import { NbAuthJWTToken, NbAuthService } from "@nebular/auth";
import { UserService } from "../@core/data/appuser.service";
import { MENU_ITEMS } from "./pages-menu";
import { TokenAuthService } from "../@core/data/token-auth.service";
import { NgxPermissionsService } from "ngx-permissions";
import { PermissionsService } from "../@core/data/permission.service";

@Component({
  selector: "ngx-pages",
  template: `
    <ngx-sample-layout>
      <nb-menu [items]="getMenu()"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-sample-layout>
  `
})
export class PagesComponent implements OnInit {
  menu = MENU_ITEMS;
  userToken: any;
  user: any;
  permission: any;
  constructor(
    private tokenAuthService: TokenAuthService,
    private userService: UserService,
    private permissionService: NgxPermissionsService,
    private role: PermissionsService
  ) {
    this.user = this.tokenAuthService.user.user;
  }
  getMenu() {
    if (this.permission.Admin) {
      return this.menuVisibility(
        MENU_ITEMS,
        ["User", "Dealer Packages", "Package", "Permissions", "Notifications"],
        true
      );
    } else if (this.permission.Dealer) {
      return this.menuVisibility(
        MENU_ITEMS,
        ["User", "Dealer Packages", "Package", "Permissions", "Notifications"],
        false
      );
    }
  }
  ngOnInit() {
    this.tokenAuthService.getToken();
    var permissions = this.permissionService.getPermissions();
    this.permissionService.permissions$.subscribe(permissions => {
      this.permission = permissions;
      this.role.role = this.permission;
    });
    const val = [];
    val[0] = this.tokenAuthService.user.user.role.name;
    this.permissionService.loadPermissions(val);
  }

  menuVisibility(menu, titleArray, visible) {
    let newmenu = menu;
    for (let title of titleArray) {
      let index = menu.findIndex(v => v.title == title);
      let menu_filter = menu.filter(v => v.title == title);
      if (menu_filter.length > 0 && index >= 0) {
        menu_filter[0].hidden = !visible;
        newmenu = [
          ...menu.slice(0, index),
          menu_filter[0],
          ...menu.slice(index + 1)
        ];
      }
    }
    return newmenu;
  }
}
