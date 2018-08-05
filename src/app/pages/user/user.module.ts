import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { UserRoutingModule, routedComponents } from './user-routing.module';
import { ThemeModule } from '../../@theme/theme.module';
import { DatePipe } from '@angular/common';
import { UserService } from '../../@core/data/appuser.service'
import { HttpClientModule, HttpClient } from '@angular/common/http';
// import { DealerListComponent } from './dealer-list/dealer-list.component';

@NgModule({
  imports: [
    ThemeModule,
    UserRoutingModule,
    Ng2SmartTableModule,
    HttpClientModule,
  ],
  declarations: [...routedComponents],
  providers: [DatePipe, UserService],
})
export class DealersModule { }
