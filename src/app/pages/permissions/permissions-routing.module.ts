import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RolePermissionsComponent } from "./role-permissions/role-permissions.component";
import { PermissionsComponent } from "./permissions.component";
import { UserPermissionsComponent } from "./user-permissions/user-permissions.component";
import { UpdateComponent } from "./update-modal/update.component";
import { AssignViewsComponent } from "./assign-views/assign-views.component";
import { CreateComponent } from "./create-rp/create.component";
import { CreateUpComponent } from './create-up/create-up.component';
const routes: Routes = [
  {
    path: "",
    component: PermissionsComponent,
    children: [
      {
        path: "rolePermissions",
        component: RolePermissionsComponent
      },
      {
        path: "userPermissions",
        component: UserPermissionsComponent
      },
      {
        path: "assign-views",
        component: AssignViewsComponent
      },
      {
        path: "create",
        component: CreateComponent
      },
      {
        path: "createup",
        component: CreateUpComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PermissionsRoutingModule { }

export const routedComponents = [
  RolePermissionsComponent,
  UserPermissionsComponent,
  PermissionsComponent,
  UpdateComponent,
  AssignViewsComponent,
  CreateComponent,
  CreateUpComponent
];
