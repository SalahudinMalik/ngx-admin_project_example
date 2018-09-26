import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ThemeModule } from '../../@theme/theme.module';

import { InvoicesRoutingModule , routedComponents } from './invoices-routing.module';
import { ComponentsModule } from '../components/components.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SmartTableModule,
    ThemeModule,
    InvoicesRoutingModule,
    ComponentsModule
  ],
  declarations: [...routedComponents,]
})
export class InvoicesModule { }
