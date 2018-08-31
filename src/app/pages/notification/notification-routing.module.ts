import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NotificationsPageComponent } from "./notifications/notifications-page.component";
import { NotificationComponent } from "./notification.component";
import { ListNotificationsComponent } from './list-notifications/list-notifications.component';


const routes: Routes = [
  {
    path: "",
    component: NotificationComponent,
    children: [
      {
        path: "add",
        component: NotificationsPageComponent
      },
      {
        path: "list",
        component: ListNotificationsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificatiosRoutingModule {}

export const routedComponents = [
  NotificationComponent,
  NotificationsPageComponent,
  ListNotificationsComponent
];
