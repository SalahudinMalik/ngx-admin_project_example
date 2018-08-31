import { NgModule } from "@angular/core";
import { PagesComponent } from "./pages.component";
import { DashboardModule } from "./dashboard/dashboard.module";
import { PagesRoutingModule } from "./pages-routing.module";
import { ThemeModule } from "../@theme/theme.module";
import { MiscellaneousModule } from "./miscellaneous/miscellaneous.module";
import { UserGuard } from "./user.guard";
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { WelcomeModule } from "./welcome/welcome.module";
const PAGES_COMPONENTS = [PagesComponent];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    WelcomeModule,
    MiscellaneousModule,
    HttpClientModule,
    HttpModule
  ],
  declarations: [...PAGES_COMPONENTS,],
  providers: [UserGuard]
})
export class PagesModule { }
