import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockRoutingModule, routedComponents } from './stock-routing.module';
import { Ng2SmartTableModule } from '../../../../node_modules/ng2-smart-table';
import { NgProgressModule } from '../../../../node_modules/@ngx-progressbar/core';
import { ReactiveFormsModule } from '../../../../node_modules/@angular/forms';
import { ThemeModule } from '../../@theme/theme.module';
import { AddWareHouse } from './warehouses/add-warehouse.component';
import { AddItem } from './items/add-item.component';
import { AddStockIn } from './stock-in/add-stock-in.component';
import { PipeModule } from '../../pipes/pipe.module';
import { DatePipe } from '@angular/common';
import { AddStockOut } from './stock-out/add-stock-out.component';
@NgModule({
  entryComponents: [AddWareHouse, AddItem, AddStockIn,AddStockOut],
  imports: [
    CommonModule,
    ThemeModule,
    StockRoutingModule,
    ReactiveFormsModule,
    NgProgressModule,
    Ng2SmartTableModule,
    PipeModule

  ],
  declarations: [...routedComponents],
  providers : [DatePipe]
})
export class StockModule { }
