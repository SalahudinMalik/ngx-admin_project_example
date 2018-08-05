/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from "@angular/core";
import { AnalyticsService } from "./@core/utils/analytics.service";
import { NbAuthJWTToken, NbAuthService, NbAuthResult } from "@nebular/auth";
import { NbMenuService, NbSidebarService } from "@nebular/theme";
import { Router } from "@angular/router";
import { TokenAuthService } from "./@core/data/token-auth.service";
import { NgxPermissionsService } from "ngx-permissions";
@Component({
  selector: "ngx-app",
  template: "<router-outlet></router-outlet>"
})
export class AppComponent implements OnInit {
  constructor(
    private analytics: AnalyticsService,
    private menuService: NbMenuService,
    private authService: NbAuthService,
    private router: Router,
    private tokenAuthService: TokenAuthService,
    private permissionService: NgxPermissionsService
  ) {}

  ngOnInit(): void {
    this.tokenAuthService.getToken();
    this.analytics.trackPageViews();
    this.menuService.onItemClick().subscribe(event => {
      // console.log('event ' , event);
      this.onItemSelection(event.item.title);
      // return false;
    });
  }
  onItemSelection(title) {
    if (title === "Logout") {
      // Do something on Log out
      this.authService.logout("email").subscribe((result: any) => {
        this.router.navigate([result.redirect]);
      });
    } else if (title === "Profile") {
      // Do something on Profile
      console.log("Profile Clicked ");
    }
  }
}
