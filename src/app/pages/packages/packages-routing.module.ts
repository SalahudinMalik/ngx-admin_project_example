import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddPackageComponent } from './add-package/add-package.component';
import { ListPackageComponent } from './list-package/list-package.component';
import { PackagesComponent } from './packages.component'
const routes: Routes = [
  {
    path: '',
    component: PackagesComponent,
    children: [{
      path: 'addPackage',
      component: AddPackageComponent,
    },
    {
      path: 'listPackage',
      component: ListPackageComponent,
    },
    {
      path: 'showPackage/:id',
      component: AddPackageComponent,
    },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PackagesRoutingModule { }
export const routedComponents = [
  PackagesComponent,
  ListPackageComponent,
  AddPackageComponent,
];
