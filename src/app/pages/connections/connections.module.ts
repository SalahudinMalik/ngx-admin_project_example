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
import { ConnectionsService } from "../../@core/data/connections.service";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { ListConnectionsComponent } from "./list-connections/list-connections.component";
import { PipeModule } from "../../pipes/pipe.module";
import { RenewComponent } from "./modal/renew-modal/renew.component";

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
    PipeModule
  ],
  declarations: [...routedComponents,],
  providers: [DatePipe, ConnectionsService]
})
export class ConnectionsModule {}
