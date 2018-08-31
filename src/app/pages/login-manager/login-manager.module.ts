import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginManagerRoutingModule, routedComponents } from './login-manager-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ThemeModule } from '../../@theme/theme.module';

@NgModule({
  imports: [
    CommonModule,
    LoginManagerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ThemeModule
  ],
  declarations: [...routedComponents,]
})
export class LoginManagerModule { }
