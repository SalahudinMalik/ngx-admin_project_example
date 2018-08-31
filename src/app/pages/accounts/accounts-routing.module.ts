import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChartOfAccountsComponent } from './chart-of-accounts/chart-of-accounts.component';
import { AccountsComponent } from './accounts.component';
import { InputComponent } from './chart-of-accounts/input.component';
import { JournalEntryListComponent } from './journal-entry-list/journal-entry-list.component';
import { JournalEntryComponent } from './journal-entry/journal-entry.component';
import { GeneralLedgerComponent } from './general-ledger/general-ledger.component';
const routes: Routes = [
  {
    path: '',
    component: AccountsComponent,
    children: [{
      path: 'chart-of-accounts',
      component: ChartOfAccountsComponent,
    }, {
      path: 'journal-entry',
      component: JournalEntryComponent,
    }, {
      path: 'journal-entry-list',
      component: JournalEntryListComponent,
    },
    {
      path: "general-ledger",
      component: GeneralLedgerComponent
    },
    {
      path: "update-journal/:id",
      component: JournalEntryComponent
    },
    {
      path: "general-ledger/:id",
      component: GeneralLedgerComponent
    }
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
  InputComponent,
  JournalEntryComponent,
  JournalEntryListComponent,
  GeneralLedgerComponent
];
