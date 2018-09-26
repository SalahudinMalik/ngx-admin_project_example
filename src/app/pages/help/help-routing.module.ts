import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HelpComponent } from './help.component';
import { TimelineComponent } from './timeline/timeline.component';

const routes: Routes = [
  {
    path: "",
    component: TimelineComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HelpRoutingModule { }
export const routedComponents = [
  TimelineComponent,
  HelpComponent,
];