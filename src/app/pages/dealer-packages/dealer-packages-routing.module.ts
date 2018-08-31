import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddDealerPackagesComponent } from './add-dealer-packages/add-dealer-packages.component';
import { DealerPackagesComponent } from './dealer-packages.component';
import { PackageComponent } from './add-dealer-packages/package.component';

const routes: Routes = [
  {
    path: '',
    component: DealerPackagesComponent,
    children: [{
      path: 'addDealerPackage',
      component: AddDealerPackagesComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DealerPackagesRoutingModule { }

 export const routedComponents = [
  DealerPackagesComponent,
  AddDealerPackagesComponent,
  PackageComponent
];