import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ReactiveFormsModule } from '@angular/forms';
import { ThemeModule } from '../../@theme/theme.module';
import { DealerPackagesRoutingModule  ,routedComponents} from './dealer-packages-routing.module';
import { NgProgressModule } from '@ngx-progressbar/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { PackageComponent } from './add-dealer-packages/package.component';

@NgModule({
  entryComponents: [PackageComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ThemeModule,
    NgSelectModule,
    DealerPackagesRoutingModule,
    Ng2SmartTableModule,
    NgProgressModule,
  ],
  declarations: [...routedComponents],
})
export class DealerPackagesModule { }
