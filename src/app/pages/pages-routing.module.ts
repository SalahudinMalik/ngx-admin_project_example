import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

import { PagesComponent } from "./pages.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { NotFoundComponent } from "./miscellaneous/not-found/not-found.component";
import { NgxPermissionsGuard } from "ngx-permissions";
import { UserGuard } from "./user.guard";

const routes: Routes = [
  {
    path: "",
    component: PagesComponent,
    children: [
      {
        path: "dashboard",
        component: DashboardComponent
      },
      {
        path: "accounts",
        loadChildren: "./accounts/accounts.module#AccountsModule"
      },
      {
        path: "dealerpackage",
        loadChildren:
          "./dealer-packages/dealer-packages.module#DealerPackagesModule",
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: ["Admin"]
          }
        }
      },
      {
        path: "notification",
        loadChildren: "./notification/notification.module#NotificationsModule"
      },
      {
        path: "user",
        loadChildren: "./user/user.module#DealersModule",
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: ["Admin"]
          }
        }
      },
      {
        path: "customers",
        loadChildren: "./customers/customers.module#CustomersModule"
      },
      {
        path: "coverage",
        loadChildren: "./coverage/coverage.module#CoverageModule"
      },
      {
        path: "packages",
        loadChildren: "./packages/packages.module#PackagesModule",
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: ["Admin"]
          }
        }
      },
      {
        path: "complaints",
        loadChildren: "./complaints/complain.module#ComplainModule"
      },
      {
        path: "basestation",
        loadChildren: "./basestation/basestation.module#BaseStationModule",
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: ["Admin"]
          }
        }
      },
      {
        path: "connections",
        loadChildren: "./connections/connections.module#ConnectionsModule"
      },
      {
        path: "permissions",
        loadChildren: "./permissions/permissions.module#PermissionsModule",
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: ["Admin"]
          }
        }
      },
      // {
      //   path: 'ui-features',
      //   loadChildren: './ui-features/ui-features.module#UiFeaturesModule',
      // }, {
      //   path: 'components',
      //   loadChildren: './components/components.module#ComponentsModule',
      // }, {
      //   path: 'maps',
      //   loadChildren: './maps/maps.module#MapsModule',
      // }, {
      //   path: 'charts',
      //   loadChildren: './charts/charts.module#ChartsModule',
      // }, {
      //   path: 'editors',
      //   loadChildren: './editors/editors.module#EditorsModule',
      // }, {
      //   path: 'forms',
      //   loadChildren: './forms/forms.module#FormsModule',
      // }, {
      //   path: 'tables',
      //   loadChildren: './tables/tables.module#TablesModule',
      // }, {
      //   path: 'miscellaneous',
      //   loadChildren: './miscellaneous/miscellaneous.module#MiscellaneousModule',
      // },
      {
        path: "",
        redirectTo: "dashboard",
        pathMatch: "full"
      },
      {
        path: "**",
        component: NotFoundComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
