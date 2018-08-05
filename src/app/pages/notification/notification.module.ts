import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { ReactiveFormsModule } from "@angular/forms";
import { ThemeModule } from "../../@theme/theme.module";
import {
  NotificatiosRoutingModule,
  routedComponents
} from "./notification-routing.module";
import { NgProgressModule } from "@ngx-progressbar/core";
import { NgSelectModule } from "@ng-select/ng-select";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ThemeModule,
    NgSelectModule,
    NotificatiosRoutingModule,
    Ng2SmartTableModule,
    NgProgressModule
  ],
  declarations: [...routedComponents]
})
export class NotificationsModule {}
