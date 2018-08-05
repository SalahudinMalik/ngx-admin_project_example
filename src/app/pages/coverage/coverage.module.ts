import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NguiMapModule} from '@ngui/map';
import { CoverageRoutingModule , routedComponents } from './coverage-routing.module';
import { AgmCoreModule } from '@agm/core';
import { FormsModule } from '../../../../node_modules/@angular/forms';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CoverageRoutingModule,
    NguiMapModule.forRoot(
      {apiUrl: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDBAPQfhbTDB5cCPF2eX3morfU8hO4ER8g&libraries=drawing' }
    ),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDBAPQfhbTDB5cCPF2eX3morfU8hO4ER8g'
    })
  ],
  declarations: [ ...routedComponents]
})
export class CoverageModule { }
