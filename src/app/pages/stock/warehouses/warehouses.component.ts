import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from '../../../../../node_modules/ng2-smart-table';
import { AddWareHouse } from './add-warehouse.component';
import { NgbModal } from '../../../../../node_modules/@ng-bootstrap/ng-bootstrap';
import { GenericStockService } from '../../../@core/data/generic-stock.service';

@Component({
  selector: 'warehouses',
  templateUrl: './warehouses.component.html',
  styleUrls: ['./warehouses.component.scss']
})
export class WarehousesComponent implements OnInit {
  source: LocalDataSource = new LocalDataSource();
  settings = {
    columns: {
      name: {
        title: "Name",
        filter: true
      },
      location: {
        title: "Location "
      }
    },
    actions: {
      add: false,
      edit: false
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true
    }
  };
  constructor(private modalService: NgbModal, public genericStockService: GenericStockService) { }

  public ngOnInit() {
    this.genericStockService.find('/warehouse/find').subscribe(data => {
      this.source.load(data.warehouse);
    }, err => {
    });
  }

  public addWareHouse() {
    const activeModal = this.modalService.open(AddWareHouse, {
      size: "lg",
      container: "nb-layout"
    });
    activeModal.result.then(
      (result1: any) => {
        this.ngOnInit();
      }
    );
  }
  public deleteWareHouse($event) {
    if (window.confirm("Are you sure you want to delete?")) {
      $event.confirm.resolve();
      this.genericStockService.deleteOne('/warehouse/delete', $event.data.id).subscribe(data => {
      });
    } else {
      $event.confirm.reject();
    }
  }
}
