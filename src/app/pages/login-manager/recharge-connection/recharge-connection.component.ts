import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { ToastrService } from '../../../../../node_modules/ngx-toastr';
import { GenericStockService } from '../../../@core/data/generic-stock.service';
import { NgbModal } from "../../../../../node_modules/@ng-bootstrap/ng-bootstrap";
import { PopupComponent } from '../popup.component';
import { timer } from 'rxjs'; // (for rxjs < 6) use 'rxjs/observable/timer'
import { take, map } from 'rxjs/operators'

@Component({
  selector: 'recharge-connection',
  templateUrl: './recharge-connection.component.html',
  styleUrls: ['./recharge-connection.component.scss']
})
export class RechargeConnectionComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public incomingConnection: any;
  public isActivated: boolean;
  public isPackageChanged: boolean = false;
  countDown: any;
  countUp: any;
  count: any = 60;
  counterUp: number = 1;
  boarderColor: string;
  timerSub: any;
  constructor(private formbuilder: FormBuilder,
    private toastr: ToastrService,
    private genericService: GenericStockService,
    private modalService: NgbModal) {

  }

  public ngOnInit() {
    this.createForm();
    this.getincomingConnection();
  }
  ngOnDestroy() {
    if (this.timerSub) {
      this.timerSub.unsubscribe();
    }
  }
  public createForm() {
    this.form = this.formbuilder.group({
      loginName: [null, { disabled: true }],
      cnic: [null, { disabled: true }],
      dealerId: [null, { disabled: true }],
      partnerId: [null, { disabled: true }],
      package: [null, { disabled: true }],
      new_package: [null, { disabled: true }],
      planExpiry: [null, { disabled: true }],
      email: [null, { disabled: true }],
      firstName: [null, { disabled: true }],
      lastName: [null, { disabled: true }],
      status: [null, { disabled: true }],
      password: [null, { disabled: true }],
      confirmPassword: [null, { disabled: true }],
      phoneNo: [null, { disabled: true }],
      mobileNo: [null, { disabled: true }],
      address: [null, { disabled: true }],
      remarks: [null, { disabled: true }],
    });
  }
  public copyToClipBoard(id) {
    var copyText = document.getElementById(id);
    document.execCommand("copy");
    this.toastr.info('Text Copied : ' + copyText['value']);
  }
  public getincomingConnection() {
    this.count = 60;
    this, this.counterUp = 0;
    this.genericService.find('/connrenewal/paidConnection').subscribe((data: any) => {
      if (data.length === 0) {
        this.toastr.warning('There are no pending connections right now ..')
        this.form.reset();
        this.incomingConnection = null;
      }
      else if (data.status_id === 1) {
        this.incomingConnection = data;
        this.isActivated = false;
        this.boarderColor = '#20fc33'
        this.countDown = timer(0, 1000).pipe(
          take(this.count),
          map(() => --this.count)
        );

        this.countUp = timer(0, 1000);
        this.timerSub = this.countUp.subscribe(x => {

          if (x % 60 == 0) {
            this.genericService.update('/connection/increaseTimer', { id: data.id }).subscribe();
            this.count = 60;
            this.countDown = timer(0, 1000).pipe(
              take(this.count),
              map(() => --this.count)
            );
          }
        });
        // .pipe(
        //   take(this.counterUp),
        //   map(() =>  ++this.counterUp)
        // );

        this.patchValuesOnFE();
      }
      else if (data.status_id === 22) {
        this.incomingConnection = data;
        this.isActivated = true;
        this.isPackageChanged = true;
        this.boarderColor = '#f8ff47'
        this.countDown = timer(0, 1000).pipe(
          take(this.count),
          map(() => --this.count)
        );

        this.countUp = timer(0, 1000);
        this.timerSub = this.countUp.subscribe(x => {

          if (x % 60 == 0) {
            this.genericService.update('/connection/increaseTimer', { id: data.id }).subscribe();
            this.count = 60;
            this.countDown = timer(0, 1000).pipe(
              take(this.count),
              map(() => --this.count)
            );
          }
        });

        this.patchValuesOnFE();
      }
      else if (data.status_id !== 1) {
        this.incomingConnection = data;
        this.isActivated = true;
        this.boarderColor = '#ff4444'
        this.countDown = timer(0, 1000).pipe(
          take(this.count),
          map(() => --this.count)
        );

        // this.countUp = timer(0,1000).pipe(
        //   take(this.counterUp),
        //   map(() =>  ++this.counterUp)
        // );

        this.countUp = timer(0, 1000);
        this.timerSub = this.countUp.subscribe(x => {

          if (x % 60 == 0) {
            this.genericService.update('/connection/increaseTimer', { id: data.id }).subscribe();
            this.count = 60;
            this.countDown = timer(0, 1000).pipe(
              take(this.count),
              map(() => --this.count)
            );
          }
        });
        this.patchValuesOnFE();
      }

    }, err => {
      this.toastr.error(err.error.err || err.error);
      this.form.reset();
      this.incomingConnection = null;
    });
  }
  packageChanged() {
    this.genericService.create('/connrenewal/changePackage', { id: this.incomingConnection.id }).subscribe(data => {
      this.toastr.success(data);
      const activeModal = this.modalService.open(PopupComponent, {
        size: "sm",
        container: "nb-layout"
      });
      activeModal.componentInstance.modalHeader = "Package Changed";
      // activeModal.componentInstance.modalContent = event.data;
      activeModal.result.then(
        () => {
          this.isPackageChanged = false;
          this.getincomingConnection();

        },
      );

    },
      error => {
        this.toastr.error(error.error.err);
      });
  }
  public activateConnection() {
    this.genericService.create('/connection/activeConnection', { id: this.incomingConnection.id }).subscribe(data => {
      this.toastr.success(data);
      const activeModal = this.modalService.open(PopupComponent, {
        size: "sm",
        container: "nb-layout"
      });
      activeModal.componentInstance.modalHeader = "Connection Activated";
      // activeModal.componentInstance.modalContent = event.data;
      activeModal.result.then(
        () => {
          this.boarderColor = '#ff4444'
        },
      );
      this.boarderColor = '#ff4444'
      this.isActivated = true;
    },
      error => {
        this.toastr.error(error.error.err || error.err);
      });
  }
  public rechargeConnection() {
    this.genericService.create('/connrenewal/rechargeConnection', { id: this.incomingConnection.connRenewalId }).subscribe(data => {
      this.toastr.success(data)
      const activeModal = this.modalService.open(PopupComponent, {
        size: "sm",
        container: "nb-layout"
      });
      activeModal.componentInstance.modalHeader = "Connection Recharged";
      // activeModal.componentInstance.modalContent = event.data;
      activeModal.result.then(
        () => {
          this.getincomingConnection();
        },
      );


    },
      error => {
        this.toastr.error(error.error.err || error.err);
      });
  }
  public patchValuesOnFE() {

    this.form.patchValue({
      loginName: this.incomingConnection.customers.username,
      cnic: this.incomingConnection.customers.cnic,
      dealerId: this.incomingConnection.dealer == null ? '' : this.incomingConnection.dealer.id,
      // partnerId: this.incomingConnection.partnerId,
      package: this.incomingConnection.packages.package_name,
      new_package: this.incomingConnection.new_package.package_name,
      // planExpiry: this.incomingConnection.planExpiry,
      email: this.incomingConnection.customers.email,
      firstName: this.incomingConnection.customers.first_name,
      lastName: this.incomingConnection.customers.last_name,
      // status: this.incomingConnection.customers.status,
      password: this.incomingConnection.password,
      confirmPassword: this.incomingConnection.password,
      // phoneNo: this.incomingConnection.customers.phoneNo,
      mobileNo: this.incomingConnection.customers.mobile,
      address: this.incomingConnection.address,
      // remarks: this.incomingConnection.remarks,

    });
  }
}
