import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenAuthService } from '../../../@core/data/token-auth.service';
import { GenericStockService } from '../../../@core/data/generic-stock.service';
import { SearchComponent } from '../../components/search/custom-search.component';
import { ShareDataService } from '../../../@core/data/share-data.service';

@Component({
  selector: 'payment-entry',
  templateUrl: './payment-entry.component.html',
  styleUrls: ['./payment-entry.component.scss']
})
export class PaymentEntryComponent implements OnInit {

  patchObj: any;
  form: FormGroup;
  partyOfList: any = [];
  selectedRecord: any;
  searchAbleArray = [];
  title: any = 'Search...';
  isPatch: boolean = false;
  PartiesList = ['Dealer', 'Customer', 'Employee'];
  @ViewChild(SearchComponent) search: SearchComponent;


  constructor(private fb: FormBuilder, private genericService: GenericStockService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private shareDataService: ShareDataService,
    private tokenAuthService: TokenAuthService) {
    this.patchObj = null;
    this.isPatch = false;
  }

  async ngOnInit() {
    this.search = new SearchComponent();
    this.createForm();
    await this.patchPayment();
  }
  createForm() {
    this.form = this.fb.group({
      partyOf: [null, Validators.required],
      partyOfId: [null, Validators.required],
      amount: [null, Validators.required],
      name: [null],
    });
  }
  patchPayment(): Promise<any> {
    return new Promise(resolve => {
      this.patchObj = this.shareDataService.getObj;
      if (this.patchObj !== undefined && this.patchObj !== null) {
        this.form.patchValue(this.patchObj);
        this.isPatch = true;
        this.PartiesList = [this.patchObj.partyOf];
        this.title = this.patchObj.username;
        this.selectedRecord = this.patchObj.username;
        this.search.mapValue(this.patchObj.username);
        this.shareDataService.setObj = null;
        this.form.get('amount').disable();
        // this.form.get('partyOf').disable();
        return resolve(true);
      }
      return resolve(true);
    });

  }
  fieldChange() {
    // console.log('onchange')
    this.selectedRecord = false;

  }
  partyChange() {
    // this.selectedRecord = null;
    this.title = 'Search...';
    this.form.patchValue({ amount: null });
    this.searchAbleArray = [];

    switch (this.form.value.partyOf) {
      case 'Dealer':
        this.getDealers();
        break;
      case 'Customer':
        this.getCustomers();
        break;
      case 'Employee':
        this.getEmployees();
        break;
      default:
        break;
    }
    if (this.selectedRecord) {
      this.search.mapValue('');
    }
  }
  createSearchableArray() {
    for (let item of this.partyOfList) {
      if (this.form.value.partyOf == 'Customer')
        this.searchAbleArray.push(item.username);
      else
        this.searchAbleArray.push(item.first_name);
    }
  }
  afterSelectingRecord(s) {
    const pos = this.partyOfList.map(function (e) { return e.username || e.first_name; }).indexOf(s);
    this.selectedRecord = this.partyOfList[pos];
    this.form.patchValue({
      partyOfId: this.selectedRecord.id,
      name: this.selectedRecord.first_name + ' ' + this.selectedRecord.last_name,
    });
  }
  getEmployees() {
    this.genericService.find('/user/find?filters%5B%5D=1&role_id=3').subscribe(data => {
      this.partyOfList = data.users;
      this.createSearchableArray();
    }, err => {
      this.toastr.error(err.error.err || err.error);
    });
  }
  getDealers() {
    this.genericService.find('/user/find?filters%5B%5D=1&role_id=2').subscribe(data => {
      this.partyOfList = data.users;
      this.createSearchableArray();
    }, err => {
      this.toastr.error(err.error.err || err.error);
    });
  }
  getCustomers() {
    this.genericService.find('/customer/customerUsernameList').subscribe(data => {
      this.partyOfList = data;
      this.createSearchableArray();
    }, err => {
      this.toastr.error(err.error.err || err.error);
    });
  }
  onSubmit() {
    console.log('submit', this.form.value);
    if (this.patchObj) {
      this.genericService.create('/invoices/payment', { id: this.patchObj.invoiceId })
        .subscribe((res: any) => {
          this.toastr.success(res);
          this.router.navigateByUrl('pages/invoices/list-invoice');
        },
          err => {
            this.toastr.error(err.error.err || err.error);
          });
    }
    else {

      this.genericService.create('/account/payment', this.form.value).subscribe(data => {
        this.toastr.success(data);
        this.router.navigateByUrl('pages/accounts/journal-entry-list');
      },
        err => {
          this.toastr.error(err.error.err || err.error);
        })
    }

  }
}
