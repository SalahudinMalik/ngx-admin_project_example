import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RolePermissionsComponent } from "./role-permissions/role-permissions.component";
import { PermissionsComponent } from "./permissions.component";
import { UserPermissionsComponent } from "./user-permissions/user-permissions.component";
import { UpdateComponent } from "./update-modal/update.component";
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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PermissionsRoutingModule {}

export const routedComponents = [
  RolePermissionsComponent,
  UserPermissionsComponent,
  PermissionsComponent,
  UpdateComponent
];
