import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddBaseStationComponent } from './add-basestation/add-basestation.component';
import { ListBaseStationComponent } from './list-basestation/list-basestation.component';
import { BaseStationComponent } from './basestation.component'
const routes: Routes = [
  {
    path: '',
    component: BaseStationComponent,
    children: [{
      path: 'addBasestation',
      component: AddBaseStationComponent,
    },
    {
      path: 'listBasestation',
      component: ListBaseStationComponent,
    },
    {
      path: 'showBasestation/:id',
      component: AddBaseStationComponent,
    }
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaseStationRoutingModule { }
export const routedComponents = [
  BaseStationComponent,
  ListBaseStationComponent,
  AddBaseStationComponent,
];
