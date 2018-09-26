import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from "../../@theme/theme.module";
import { HelpRoutingModule , routedComponents } from './help-routing.module';

@NgModule({
  imports: [
    CommonModule,
    HelpRoutingModule,
    ThemeModule
  ],
  declarations: [...routedComponents]
})
export class HelpModule { }
