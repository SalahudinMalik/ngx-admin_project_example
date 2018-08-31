import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WarehousesComponent } from './warehouses/warehouses.component';
import { ItemsComponent } from './items/items.component';
import { StockInComponent } from './stock-in/stock-in.component';
import { StockOutComponent } from './stock-out/stock-out.component';
import { StockComponent } from './stock.component';
import { AddWareHouse } from './warehouses/add-warehouse.component';
import { AddItem } from './items/add-item.component';
import { AddStockIn } from './stock-in/add-stock-in.component';
import { AddStockOut } from './stock-out/add-stock-out.component';
const routes: Routes = [
  {
    path: '',
    component: StockComponent,
    children: [{
      path: 'warehouses',
      component: WarehousesComponent,
    },
    {
      path: 'items',
      component: ItemsComponent,
    },
    {
      path: 'stock-in',
      component: StockInComponent,
    },
    {
      path: 'stock-out',
      component: StockOutComponent,
    }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StockRoutingModule { }
export const routedComponents = [
  StockComponent,
  WarehousesComponent,
  ItemsComponent,
  StockInComponent,
  StockOutComponent,
  AddWareHouse,
  AddItem, AddStockIn,AddStockOut
];