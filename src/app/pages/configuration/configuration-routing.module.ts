import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfigurationComponent } from './configuration.component';
import { RulesComponent } from './rules/rules.component';
import { FormulaComponent } from './rules/formula.component';
import { RulesListComponent } from './rules-list/rules-list.component';

const routes: Routes = [
  {
    path: "",
    component: ConfigurationComponent,
    children: [
      {
        path: "rules",
        component: RulesComponent
      },
      {
        path: "rules",
        component: FormulaComponent
      },
      {
        path: "rules-list",
        component: RulesListComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationRoutingModule { }
export const routedComponents = [
  ConfigurationComponent,
  RulesComponent,
  FormulaComponent
];