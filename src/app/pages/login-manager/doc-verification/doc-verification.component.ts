import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { GenericStockService } from '../../../@core/data/generic-stock.service';
import { TokenAuthService } from '../../../@core/data/token-auth.service';
import { PopupComponent } from '../popup.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { timer } from 'rxjs'; // (for rxjs < 6) use 'rxjs/observable/timer'
import { take, map } from 'rxjs/operators'

@Component({
  selector: 'ngx-doc-verification',
  templateUrl: './doc-verification.component.html',
  styleUrls: ['./doc-verification.component.scss']
})
export class DocVerificationComponent implements OnInit {
  public form: FormGroup;
  user: any;
  incomingConnection: any;
  regForm: any;
  cnicBack: any;
  cnicFront: any;
  //timer
  timerSub: any;
  countDown: any;
  countUp: any;
  count: any = 60;
  counterUp: number = 1;

  constructor(
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private genericService: GenericStockService,
    private tokenAuthService: TokenAuthService
  ) {

  }

  ngOnInit() {
    this.createForm();
    this.getVerifyDoc();
    this.user = this.tokenAuthService.user.user;
    
  }
  ngOnDestroy() {
    if (this.timerSub) {
      this.timerSub.unsubscribe();
    }
  }
  public createForm() {
    this.form = this.fb.group({
      loginName: [null, { disabled: true }],
      cnicNo: [null, { disabled: true }],
      dealerId: [null, { disabled: true }],
      partnerId: [null, { disabled: true }],
      package: [null, { disabled: true }],
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
  public getVerifyDoc() {

    this.genericService.find('/connection/docFind').subscribe(data => {
      // console.log(data);
      this.incomingConnection = data;
      this.cnicBack = '/assets/images/loading.gif';
    this.cnicFront ='/assets/images/loading.gif';
    this.regForm = '/assets/images/loading.gif';
      this.patchValuesOnFE();
      this.countDown = timer(0, 1000).pipe(
        take(this.count),
        map(() => --this.count)
      );

      this.countUp = timer(0, 1000);
      this.timerSub = this.countUp.subscribe(x => {

        if (x % 60 == 0 && this.incomingConnection != null) {
          this.genericService.update('/connection/increaseTimer', { id: data.id }).subscribe();
          this.count = 60;
          this.countDown = timer(0, 1000).pipe(
            take(this.count),
            map(() => --this.count)
          );
        }
      });

    }, err => {
      this.toastr.warning(err.error.err || err.error);
      this.form.reset();
      this.incomingConnection = null;
      this.cnicBack = null;
      this.cnicFront = null;
      this.regForm = null   });
  }
  public patchValuesOnFE() {
    
    this.form.patchValue({
      loginName: this.incomingConnection.customers.username,
      cnicNo: this.incomingConnection.customers.cnic,
      dealerId: this.incomingConnection.dealer == null ? '' : this.incomingConnection.dealer.id,
      // partnerId: this.incomingConnection.partnerId,
      package: this.incomingConnection.packages.package_name,
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
    this.cnicBack = this.incomingConnection.cnicBack;
    this.cnicFront = this.incomingConnection.cnicFront;
    this.regForm = this.incomingConnection.regForm;
  }
  verifyDoc() {
    this.genericService.create('/connection/update', {
      id: this.incomingConnection.id,
      doc_verified: true,
      customers: this.incomingConnection.customers.id,
    }).subscribe(data => {
      this.toastr.success('document verified successfully.');
      const activeModal = this.modalService.open(PopupComponent, {
        size: "sm",
        container: "nb-layout"
      });
      activeModal.componentInstance.modalHeader = "Document Verified";
      // activeModal.componentInstance.modalContent = event.data;
      activeModal.result.then(
        () => {
          this.getVerifyDoc();
        },
      );
    },
      error => {
        this.toastr.error(error.error.err);
      });
  }
  rejectDoc(){
    const activeModal = this.modalService.open(PopupComponent, {
      size: "sm",
      container: "nb-layout"
    });
    activeModal.componentInstance.modalHeader = "Document Reject";
    activeModal.componentInstance.modalReject = true;
    // activeModal.componentInstance.modalContent = event.data;
    activeModal.result.then(
      (result) => {
        if(result){
          this.genericService.create('/connection/rejectDoc' , {id:this.incomingConnection.id , rejectType:result})
            .subscribe((res:any) =>{
              this.toastr.success(res);
              this.getVerifyDoc();
            },  
            error => {
              this.toastr.error(error.error.err);
              this.getVerifyDoc();
          });
        }
        
      },
    );
  }
  onSubmit() {
    const data = {
      // id: this.id,
      first_name: this.form.value.firstName,
      last_name: this.form.value.lastName,
      cnic: this.form.value.cnicNo,
      mobile: this.form.value.mobileNo,
      email: this.form.value.email,
      password: this.form.value.password,
    };

  }

}
