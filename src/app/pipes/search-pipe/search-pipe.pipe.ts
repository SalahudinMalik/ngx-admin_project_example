import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "searchPipe"
})
export class SearchPipePipe implements PipeTransform {
  public transform(items: any[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLowerCase();

    return items.filter(it => {
      return JSON.stringify(it)
        .toLowerCase()
        .match(searchText);
    });
  }
}
