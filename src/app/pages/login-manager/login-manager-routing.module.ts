import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RechargeConnectionComponent } from './recharge-connection/recharge-connection.component';
import { PopupComponent } from './popup.component'
import { LoginManagerComponent } from './login-manager.component';
import { DocVerificationComponent } from './doc-verification/doc-verification.component';

const routes: Routes = [
  {
    path: '',
    component: LoginManagerComponent,
    children: [{
      path: 'recharge-connection',
      component: RechargeConnectionComponent,
    },
    {
      path: 'document-verification',
      component: DocVerificationComponent,
    },
    {
      path: 'recharge-connection-popup',
      component: PopupComponent,
    },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginManagerRoutingModule { }
export const routedComponents = [
  RechargeConnectionComponent,
  PopupComponent,
  DocVerificationComponent,
  LoginManagerComponent
];