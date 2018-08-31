import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TreeModule } from "angular-tree-component";
import {
  ConnectionsRoutingModule,
  routedComponents
} from "./connections-routing.module";
import { ThemeModule } from "../../@theme/theme.module";
import { AngularFontAwesomeModule } from "angular-font-awesome";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { DatePipe } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { PipeModule } from "../../pipes/pipe.module";
import { AngularFileUploaderModule } from "angular-file-uploader";
import { RenewComponent } from "./modal/renew-modal/renew.component";
import { ComponentsModule } from "../components/components.module";

@NgModule({
  entryComponents: [RenewComponent],
  imports: [
    CommonModule,
    ThemeModule,
    ConnectionsRoutingModule,
    Ng2SmartTableModule,
    HttpClientModule,
    TreeModule,
    AngularFontAwesomeModule,
    PipeModule,
    AngularFileUploaderModule,
    ComponentsModule

  ],
  declarations: [...routedComponents],
  providers: [DatePipe]
})
export class ConnectionsModule { }
