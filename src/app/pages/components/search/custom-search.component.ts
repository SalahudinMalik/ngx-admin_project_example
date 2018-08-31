import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Subject, Observable } from '../../../../../node_modules/rxjs';
import { SearchService } from '../../../@core/data/custom-search.service';

@Component({
  selector: 'custom-search',
  templateUrl: './custom-search.component.html',
  styleUrls: ['./custom-search.component.scss'],
  // providers: [SearchService]
})
export class SearchComponent {
  public formControlValue: any;
  @Input() public inputString;
  @Input() public title;
  @Input() public dataToSearch;
  @Output() public onSelection = new EventEmitter<any>();
  results: Array<any> = [];
  constructor(private searchService: SearchService) {
  }
  searchEntries(term: string) {
    let res: Array<any> = [];
    this.results = this.dataToSearch.filter(item =>
      item.toLowerCase().includes(term.toLowerCase())
    )
  }
  getChoiceLabel(choice: string) {
    this.formControlValue = choice;
    this.results = [];
    this.onSelection.emit(choice);
    return `@${choice} `;


  }
  focusOut() {
    setTimeout(() => {
      this.results = [];
    }, 200);
  }
}
