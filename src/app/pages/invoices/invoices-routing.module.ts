import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddInvoiceComponent } from './add-invoice/add-invoice.component';
import { InvoicesComponent } from './invoices.component';
import { ListInvoiceComponent } from './list-invoice/list-invoice.component';
import { PaymentComponent } from './add-invoice/payment.component';

const routes: Routes = [
  {
    path: '',
    component: InvoicesComponent,
    children: [{
      path: 'add-invoice',
      component: AddInvoiceComponent,
    },
    {
      path: 'list-invoice',
      component: ListInvoiceComponent,
    },
    {
      path: 'showInvoice/:id',
      component: AddInvoiceComponent,
    },
    {
      path: 'payment',
      component: PaymentComponent,
    },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvoicesRoutingModule { };



export const routedComponents = [
  AddInvoiceComponent,
  InvoicesComponent,
  ListInvoiceComponent,
  PaymentComponent
];