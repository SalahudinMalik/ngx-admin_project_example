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
    private toastr: ToastrService
  ) {}

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
    this.userService.getAllUser().subscribe((data: any) => {
      this.dealerObj = data.users;
      // console.log('user'  , data);
    });
    this.form = this.fb.group({
      dealerGroup: [null, Validators.compose([Validators.required])]
    });
  }

  dealerChange() {
    console.log(this.selectedDealer.id, "dealer changeed");
    this.dataArray = [];
    this.dpService
      .getAllDealerPackages(this.selectedDealer.id)
      .subscribe((result: any) => {
        if (result.totalCount > 0) {
          for (let dp of result.dealerPackages) {
            // console.log('dp' , dp)
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
      });
    this.refresh();
  }

  addPackage() {
    // console.log('click')
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
          console.log("closed", result1);
          this.dataArray.push(result1);
          this.refresh();
        }
      },
      () => {
        console.log("Backdrop click");
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
    //         // console.log('dp' , dp.packages.id);
    //         dpData.packageId = dp.packages.id;
    //         dpData.packageName = dp.packages.package_name;
    //         dpData.packagePrice = dp.price;
    //         dbArray.push(dpData);
    //       }
    //     }
    //     //  console.log('dataArray' ,this.dataArray , 'dbArray', dbArray);
    //     let dif = _.differenceWith(this.dataArray, dbArray, _.isEqual);
    //     // this.refresh();
    //     // console.log('diff' ,dif);
    //     for (let d of dif) {
    //       let saveData: any = {
    //         dealer_id: this.selectedDealer.id,
    //         package_id: d.packageId,
    //         price: d.packagePrice
    //       };
    //       // console.log('saveData ', saveData)
    //       this.dpService.saveDealerPackages(saveData).subscribe(
    //         (result: any) => {
    //           // notify = true;
    //           // console.log('result' ,result)
    //           this.toastr.success("Data inserted successfully.");
    //         },
    //         error => {
    //           // notify = false;
    //           this.toastr.error("Data insertion error ", error);
    //         }
    //       );
    //     }
    //   });
    // console.log('submit')
  }
  onDeleteConfirm(event): void {
    if (window.confirm("Are you sure you want to delete?")) {
      event.confirm.resolve();
      console.log("event.data.id", event.data.id);
      this.dpService.deleteDealerPackages(event.data.id).subscribe(
        data1 => {
          this.toastr.success("Deleted Successfully");
          this.dealerChange();
        },
        error => {
          this.toastr.error("Deletion Error");
        }
      );
    } else {
      event.confirm.reject();
    }
  }
}
