/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from "@angular/core";
import { NbAuthService } from "@nebular/auth";
import { NbMenuService } from "@nebular/theme";
import { Router } from "@angular/router";
import { TokenAuthService } from "./@core/data/token-auth.service";

@Component({
  selector: "ngx-app",
  template: "<router-outlet></router-outlet>"
})
export class AppComponent implements OnInit {
  constructor(
    private menuService: NbMenuService,
    private authService: NbAuthService,
    private router: Router,
    private tokenAuthService: TokenAuthService,
  ) {
  }
  ngOnInit(): void {
    this.menuService.onItemClick().subscribe(event => {
      this.onItemSelection(event.item.title);
    });
  }
  onItemSelection(title) {
    if (title === "Logout") {
      this.authService.logout("email").subscribe((result: any) => {
        this.router.navigate([result.redirect]);
      });
    }
  }
}
