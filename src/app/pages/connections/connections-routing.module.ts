import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ConnectionsComponent } from "./connections.component";
import { AddConnectionComponent } from "./add-connection/add-connection.component";
import { ListConnectionsComponent } from "./list-connections/list-connections.component";
import { RenewComponent } from "./modal/renew-modal/renew.component";
import { ExConnectionComponent } from './ex-connection/ex-connection.component';
const routes: Routes = [
  {
    path: "",
    component: ConnectionsComponent,
    children: [
      {
        path: "addConnection",
        component: AddConnectionComponent
      },
      {
        path: "listConnections",
        component: ListConnectionsComponent
      },
      {
        path: 'exConnections',
        component: ExConnectionComponent,
      },
      {
        path: 'showConnection/:id',
        component: AddConnectionComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConnectionsRoutingModule {}
export const routedComponents = [
  ConnectionsComponent,
  AddConnectionComponent,
  ListConnectionsComponent,
  ExConnectionComponent,
  RenewComponent
];
