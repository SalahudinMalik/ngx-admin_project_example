import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ThemeModule } from '../../@theme/theme.module';
import { PackagesRoutingModule, routedComponents } from './packages-routing.module';
import { NgProgressModule } from '@ngx-progressbar/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { DatePipe } from '@angular/common';
@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    PackagesRoutingModule,
    ReactiveFormsModule,
    NgProgressModule,
    Ng2SmartTableModule
  ],
  declarations: [...routedComponents],
  providers: [DatePipe],
})
export class PackagesModule { }
