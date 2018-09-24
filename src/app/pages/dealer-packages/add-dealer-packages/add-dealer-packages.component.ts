import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";
import { UserService } from "../../../@core/data/appuser.service";
import { Observable } from "rxjs";
import { startWith, map } from "rxjs/operators";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { PackageComponent } from "./package.component";
import { Ng2SmartTableModule, LocalDataSource } from "ng2-smart-table";
import { DealerPackageService } from "../../../@core/data/dealerpackage.service";
import { ToastrService } from "ngx-toastr";
import * as _ from "lodash";
import { GenericStockService } from "../../../@core/data/generic-stock.service";

@Component({
  selector: "add-dealer-packages",
  templateUrl: "./add-dealer-packages.component.html",
  styleUrls: ["./add-dealer-packages.component.scss"]
})
export class AddDealerPackagesComponent implements OnInit {
  public form: FormGroup;
  public source = new LocalDataSource();
  dataArray: any = [];
  data: any = {
    id: "",
    packageName: "",
    packagePrice: ""
  };
  dealerObj: any;

  selectedDealer: any;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private modalService: NgbModal,
    private dpService: DealerPackageService,
    private toastr: ToastrService,
    private genericService:GenericStockService,
  ) { }

  settings = {
    // pager : {
    //   display : true,
    //   perPage: '10',
    //   },
    columns: {
      // id: {
      //   title: 'Pakckage ID',
      // },
      packageName: {
        title: "Package Name"
      },

      packagePrice: {
        title: "Package Price"
      }
    },
    actions: {
      add: false,
      edit: false
      // custom: [{ name: 'print', title: `<i class="fa fa-print p-0 m-0 float-left"></i>` },   ],
      // position:  'left',
    },
    delete: {
      position: "right",
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true
    }
  };

  ngOnInit() {
    this.genericService.find('/user/find?filters%5B%5D=1&role_id=2').subscribe(data => {
      this.dealerObj = data.users;
    }, err => {
      this.toastr.error(err.error.err || err.error);
    });
    this.form = this.fb.group({
      dealerGroup: [null, Validators.required]
    });
  }

  dealerChange() {
    this.dataArray = [];
    this.dpService.getAllDealerPackages(this.selectedDealer.id)
      .subscribe((result: any) => {
        if (result.totalCount > 0) {
          for (let dp of result.dealerPackages) {
            let dpData = {
              id: "",
              packageId: "",
              packageName: "",
              packagePrice: ""
            };
            dpData.id = dp.id;
            dpData.packageId = dp.packages.id;
            dpData.packageName = dp.packages.package_name;
            dpData.packagePrice = dp.price;
            this.dataArray.push(dpData);
          }
          this.refresh();
        }
      },
      err =>{
        this.toastr.error(err.error.err || err.error);
      });
    this.refresh();
  }

  addPackage() {
    const activeModal = this.modalService.open(PackageComponent, {
      size: "sm",
      container: "nb-layout"
    });

    activeModal.componentInstance.modalHeader = "Add  Package";
    activeModal.componentInstance.modalContent = this.selectedDealer;
    activeModal.componentInstance.modalDataArray = this.dataArray;
    activeModal.result.then(
      (result1: any) => {
        if (result1 != undefined) {
          this.dataArray.push(result1);
          this.refresh();
        }
      },
      () => {
      }
    );
  }
  refresh() {
    this.source.load(this.dataArray);
  }
  onSubmit() {
    // let dbArray: any = [];
    // this.dpService
    //   .getAllDealerPackages(this.selectedDealer.id)
    //   .subscribe((result: any) => {
    //     if (result.totalCount > 0) {
    //       for (let dp of result.dealerPackages) {
    //         let dpData = {
    //           id: "",
    //           packageId: "",
    //           packageName: "",
    //           packagePrice: ""
    //         };
    //         dpData.id = dp.id;
    //         dpData.packageId = dp.packages.id;
    //         dpData.packageName = dp.packages.package_name;
    //         dpData.packagePrice = dp.price;
    //         dbArray.push(dpData);
    //       }
    //     }
    //     let dif = _.differenceWith(this.dataArray, dbArray, _.isEqual);
    //     // this.refresh();
    //     for (let d of dif) {
    //       let saveData: any = {
    //         dealer_id: this.selectedDealer.id,
    //         package_id: d.packageId,
    //         price: d.packagePrice
    //       };
    //       this.dpService.saveDealerPackages(saveData).subscribe(
    //         (result: any) => {
    //           // notify = true;
    //           this.toastr.success("Data added successfully.");
    //         },
    //         error => {
    //           // notify = false;
    //           this.toastr.error("Data insertion error ", error);
    //         }
    //       );
    //     }
    //   });
  }
  onDeleteConfirm(event): void {
    if (window.confirm("Are you sure you want to delete?")) {
      event.confirm.resolve();
      this.dpService.deleteDealerPackages(event.data.id).subscribe(
        data1 => {
          this.toastr.success("Deleted Successfully");
          this.dealerChange();
        },
        err => {
          this.toastr.error(err.error.err || err.error);
        }
      );
    } else {
      event.confirm.reject();
    }
  }
}
