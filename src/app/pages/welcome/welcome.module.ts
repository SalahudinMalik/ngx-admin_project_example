import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeRoutingModule, routedComponents } from './welcome-routing.module';
import { ThemeModule } from '../../@theme/theme.module';

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    WelcomeRoutingModule
  ],
  declarations: [...routedComponents]
})
export class WelcomeModule { }
