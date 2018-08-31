import { NgModule } from '@angular/core';

import { TreeModule } from 'angular-tree-component';
import { ToasterModule } from 'angular2-toaster';

import { ThemeModule } from '../../@theme/theme.module';
import { ComponentsRoutingModule, routedComponents } from './components-routing.module';
import { SearchComponent } from './search/custom-search.component';

@NgModule({
  imports: [
    ThemeModule,
    ComponentsRoutingModule,
    TreeModule,
    ToasterModule.forRoot(),
  ],
  declarations: [
    ...routedComponents,
  ],
  exports:[SearchComponent]
})
export class ComponentsModule { }
