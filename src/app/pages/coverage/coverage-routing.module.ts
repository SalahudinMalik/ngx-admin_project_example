import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoverageComponent } from './coverage.component';
import { CovComponent } from './cov/cov.component'
const routes: Routes = [
  {
    path: '',
    component: CoverageComponent,
    children: [{
      path: 'cov',
      component: CovComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoverageRoutingModule { }
export const routedComponents = [
  CovComponent,
  CoverageComponent,
];
