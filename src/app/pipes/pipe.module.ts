import { NgModule } from "@angular/core";

import { SearchPipePipe } from "./search-pipe/search-pipe.pipe";
@NgModule({
  declarations: [SearchPipePipe],
  exports: [SearchPipePipe]
})
export class PipeModule {}
