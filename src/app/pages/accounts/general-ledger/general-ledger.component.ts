import { Component, OnInit, ViewChild } from '@angular/core';
import { GenericStockService } from '../../../@core/data/generic-stock.service';
import { AgGridNg2 } from 'ag-grid-angular';
import { ActivatedRoute } from '../../../../../node_modules/@angular/router';
@Component({
  selector: 'general-ledger',
  templateUrl: './general-ledger.component.html',
  styleUrls: ['./general-ledger.component.scss']
})
export class GeneralLedgerComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridNg2;
  showWarning: boolean = false;
  columnDefs = [
    { headerName: 'Ledger ID', field: 'id' },
    { headerName: 'Date', field: 'date' },
    { headerName: 'Account Name', field: 'account' },
    { headerName: 'Credit', field: 'credit' },
    { headerName: 'Debit', field: 'debit' },
    { headerName: 'Balance', field: 'balance' },
    { headerName: 'Reference Type', field: 'reference_type' },
    { headerName: 'Description', field: 'description' },
  ];
  rowData: any = [];
  constructor(public genericService: GenericStockService, public activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this.activatedRoute.params.subscribe(params => {
      const id = params["id"];
      if (id) {
        this.genericService.findOne('/ledger/findOne', id).subscribe((data: any) => {
          this.rowData = data;
        });
      } else if (id == undefined) {
        this.genericService.find('/ledger/find').subscribe(data => {
          this.rowData = data;
        });
      } else {
        this.rowData = [];
        this.showWarning = true;
      }
    })
  }
  getSelectedRows() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    const selectedDataStringPresentation = selectedData.map(node => node.make + ' ' + node.model).join(', ');
    alert(`Selected nodes: ${selectedDataStringPresentation}`);
  }

}
