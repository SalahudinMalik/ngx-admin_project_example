import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChartOfAccountsComponent } from './chart-of-accounts/chart-of-accounts.component';
import { AccountsComponent } from './accounts.component';
import { InputComponent } from './chart-of-accounts/input.component';
const routes: Routes = [
  {
    path: '',
    component: AccountsComponent,
    children: [{
      path: 'ChartOfAccounts',
      component: ChartOfAccountsComponent,
    },

  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountsRoutingModule { }
export const routedComponents = [
  AccountsComponent,
  ChartOfAccountsComponent,
  InputComponent
];
