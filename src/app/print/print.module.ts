import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrintRoutingModule , routedComponents}  from './print-routing.module';
import { FormsModule } from '../pages/forms/forms.module';
import { ThemeModule } from '../@theme/theme.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    PrintRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ThemeModule,
  ],
  declarations: [...routedComponents]
})
export class PrintModule { }
