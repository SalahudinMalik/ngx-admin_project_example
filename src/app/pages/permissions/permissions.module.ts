import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ThemeModule } from "../../@theme/theme.module";
import {
  PermissionsRoutingModule,
  routedComponents
} from "./permissions-routing.module";
import { ReactiveFormsModule } from "@angular/forms";
import { NgProgressModule } from "@ngx-progressbar/core";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { DatePipe } from "@angular/common";
import { UpdateComponent } from "./update-modal/update.component";
// import { DeleteComponent } from "./customers-list/delete.component";
// import { PipeModule } from "../../pipes/pipe.module";

@NgModule({
  entryComponents: [UpdateComponent],
  imports: [
    CommonModule,
    ThemeModule,
    PermissionsRoutingModule,
    ReactiveFormsModule,
    NgProgressModule,
    Ng2SmartTableModule
    // PipeModule
  ],
  declarations: [...routedComponents],
  providers: [DatePipe]
})
export class PermissionsModule {}
