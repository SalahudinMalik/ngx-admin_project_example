/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { APP_BASE_HREF } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { CoreModule } from "./@core/core.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { ThemeModule } from "./@theme/theme.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import {
  NbPasswordAuthStrategy,
  NbAuthModule,
  NbAuthJWTToken
} from "@nebular/auth";
import { NgxPermissionsModule } from "ngx-permissions";
import { AuthGuard } from "./auth-guard.service";
import { ToastrModule } from "ngx-toastr";
import { CustomersModule } from "./pages/customers/customers.module";
import { ConnectionsModule } from "./pages/connections/connections.module";
import { Globals } from "../Globals";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { PipeModule } from "./pipes/pipe.module";
import { PermissionsModule } from "./pages/permissions/permissions.module";
@NgModule({
  declarations: [AppComponent,],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    CustomersModule,
    PermissionsModule,
    ConnectionsModule,
    PipeModule,
    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    NgxPermissionsModule.forRoot(),
    Ng2SmartTableModule,
    CoreModule.forRoot(),
    ToastrModule.forRoot(),
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: "email",
          token: {
            class: NbAuthJWTToken,
            key: "token"
          },
          // baseEndpoint: "http://35.240.250.237:1337/",
          baseEndpoint: "http://192.168.31.93:1337/",
          login: {
            endpoint: "user/login",
            method: "post",
            redirect: {
              success: "/",
              failure: null
            }
          },
          register: {
            endpoint: "user/create",
            method: "post"
          },
          logout: {
            endpoint: "user/logout",
            method: "get",
            redirect: {
              success: "/auth/login",
              failure: "/"
            }
          }
        })
      ],
      forms: {}
    })
  ],
  bootstrap: [AppComponent],
  providers: [{ provide: APP_BASE_HREF, useValue: "/" }, AuthGuard, Globals]
})
export class AppModule {}
