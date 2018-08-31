import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigurationRoutingModule } from './configuration-routing.module';
import { ThemeModule } from '../../@theme/theme.module';
import { routedComponents } from './configuration-routing.module';
import { RulesListComponent } from './rules-list/rules-list.component';
import { Ng2SmartTableModule } from '../../../../node_modules/ng2-smart-table';
import { TextInputAutocompleteModule } from 'angular-text-input-autocomplete';
import { NgProgressModule } from '../../../../node_modules/@ngx-progressbar/core';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    ConfigurationRoutingModule,
    CommonModule,
    ThemeModule,
    NgProgressModule,
    Ng2SmartTableModule,
    TextInputAutocompleteModule,
    ComponentsModule
  ],
  declarations: [...routedComponents, RulesListComponent]
})
export class ConfigurationModule { }
