import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ThemeModule } from "../../@theme/theme.module";
import {
  CustomersRoutingModule,
  routedComponents
} from "./customers-routing.module";
import { ReactiveFormsModule } from "@angular/forms";
import { NgProgressModule } from "@ngx-progressbar/core";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { DatePipe } from "@angular/common";
import { DeleteComponent } from "../modal/delete-modal/delete.component";
import { HttpClientModule } from '../../../../node_modules/@angular/common/http';

@NgModule({
  entryComponents: [DeleteComponent],
  imports: [
    CommonModule,
    ThemeModule,
    CustomersRoutingModule,
    ReactiveFormsModule,
    NgProgressModule,
    Ng2SmartTableModule,
    // PipeModule
    // HttpClientModule,
  ],
  declarations: [...routedComponents],
  providers: [DatePipe]
})
export class CustomersModule {}
