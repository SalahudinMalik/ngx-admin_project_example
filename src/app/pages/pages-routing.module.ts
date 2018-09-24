import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

import { PagesComponent } from "./pages.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { NotFoundComponent } from "./miscellaneous/not-found/not-found.component";
import { UserGuard } from "./user.guard";
import { WelcomeComponent } from "./welcome/welcome.component";

var routes: Routes = [
  {
    path: "",
    component: PagesComponent,
    children: [
      {
        canActivate: [UserGuard],
        path: "dashboard",
        component: DashboardComponent,
      },
      {
        canActivate: [UserGuard],
        path: "accounts",
        loadChildren: "./accounts/accounts.module#AccountsModule"
      },
      {
        path: "dealerpackage",
        loadChildren:
          "./dealer-packages/dealer-packages.module#DealerPackagesModule",
        canActivate: [UserGuard],
      },
      {
        canActivate: [UserGuard],
        path: "notification",
        loadChildren: "./notification/notification.module#NotificationsModule"
      },
      {
        canActivate: [UserGuard],
        path: "invoices",
        loadChildren: "./invoices/invoices.module#InvoicesModule",
      },
      {
        canActivate: [UserGuard],
        path: "user",
        loadChildren: "./user/user.module#DealersModule",
      },
      {
        canActivate: [UserGuard],
        path: "help",
        loadChildren: "./help/help.module#HelpModule",
      },
      {
        canActivate: [UserGuard],
        path: "customers",
        loadChildren: "./customers/customers.module#CustomersModule"
      },
      {
        canActivate: [UserGuard],
        path: "coverage",
        loadChildren: "./coverage/coverage.module#CoverageModule"
      },
      {
        canActivate: [UserGuard],
        path: "stock",
        loadChildren: "./stock/stock.module#StockModule"
      },
      {
        canActivate: [UserGuard],
        path: "login-manager",
        loadChildren: "./login-manager/login-manager.module#LoginManagerModule"
      },
      {
        canActivate: [UserGuard],
        path: "configuration",
        loadChildren: "./configuration/configuration.module#ConfigurationModule"
      },
      {
        canActivate: [UserGuard],
        path: "packages",
        loadChildren: "./packages/packages.module#PackagesModule",
      },
      {
        canActivate: [UserGuard],
        path: "complaints",
        loadChildren: "./complaints/complain.module#ComplainModule"
      },
      {
        canActivate: [UserGuard],
        path: "basestation",
        loadChildren: "./basestation/basestation.module#BaseStationModule",
      },
      {
        canActivate: [UserGuard],
        path: "connections",
        loadChildren: "./connections/connections.module#ConnectionsModule"
      },
      {
        canActivate: [UserGuard],
        path: "permissions",
        loadChildren: "./permissions/permissions.module#PermissionsModule",
      },
      {
        path: "welcome",
        component: WelcomeComponent,
      },
      {
        path: "",
        redirectTo: "welcome",
        pathMatch: "full",
      },
      {
        path: "**",
        component: NotFoundComponent
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
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
