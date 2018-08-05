import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddComplainComponent } from './add-complain/add-complain.component';
import { ListComplainComponent } from './list-complain/list-complain.component';
import { ComplainComponent } from './complain.component'
const routes: Routes = [
  {
    path: '',
    component: ComplainComponent,
    children: [{
      path: 'addComplain',
      component: AddComplainComponent,
    },
    {
      path: 'listComplain',
      component: ListComplainComponent,
    },
    {
      path: 'showComplain/:id',
      component: AddComplainComponent,
    }
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComplainRoutingModule { }
export const routedComponents = [
  ComplainComponent,
  ListComplainComponent,
  AddComplainComponent,
];
