import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeModule } from 'angular-tree-component';
import { AccountsRoutingModule, routedComponents } from './accounts-routing.module';
import { ThemeModule } from '../../@theme/theme.module';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { InputComponent } from './chart-of-accounts/input.component';
import { Ng2SmartTableModule } from '../../../../node_modules/ng2-smart-table';
import { ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { ComponentsModule } from '../components/components.module';
@NgModule({
  entryComponents: [InputComponent],
  imports: [
    CommonModule,
    ThemeModule,
    AccountsRoutingModule,
    TreeModule,
    AngularFontAwesomeModule,
    Ng2SmartTableModule,
    ReactiveFormsModule,
    ComponentsModule,
    AgGridModule.withComponents([])
  ],
  declarations: [...routedComponents]
})
export class AccountsModule { }
