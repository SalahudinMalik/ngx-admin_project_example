import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from '../../../../../node_modules/ng2-smart-table';
import { NgbModal } from '../../../../../node_modules/@ng-bootstrap/ng-bootstrap';
import { AddItem } from './add-item.component';
import { GenericStockService } from '../../../@core/data/generic-stock.service';

@Component({
  selector: 'items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {
  source: LocalDataSource = new LocalDataSource();
  settings = {
    columns: {
      name: {
        title: "Name",
        filter: true
      },
      code: {
        title: "Code "
      },
      unit: {
        title: "Unit "
      },
      description: {
        title: "Description "
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
    this.genericStockService.find('/items/find').subscribe(data => {
      this.source.load(data.items);
    }, err => {
    });
  }

  public addWareHouse() {
    const activeModal = this.modalService.open(AddItem, {
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
      this.genericStockService.deleteOne('/items/delete', $event.data.id).subscribe(data => {
      });
    } else {
      $event.confirm.reject();
    }
  }
}