import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { GenericStockService } from '../../../@core/data/generic-stock.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenAuthService } from '../../../@core/data/token-auth.service';
import { ShareDataService } from '../../../@core/data/share-data.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PaymentComponent } from './payment.component';
import { async } from 'rxjs/internal/scheduler/async';

@Component({
  selector: 'add-invoice',
  templateUrl: './add-invoice.component.html',
  styleUrls: ['./add-invoice.component.scss']
})
export class AddInvoiceComponent implements OnInit {

  customerList = [];
  searchAbleArray = [];
  selectedRecord: any;
  user: any;
  form: FormGroup;

  stockList: any = [];
  selectedStock: any;
  itemList: any = [];
  selectedItem: any;
  warehouseList: any = [];
  packageList: any = [];
  selectedPackage: any;
  id: any;
  constructor(private fb: FormBuilder, private genericService: GenericStockService,
    private toastr: ToastrService,
    private route: ActivatedRoute, private modalService: NgbModal,
    private router: Router, private shareDataService: ShareDataService,
    private tokenAuthService: TokenAuthService) { }

  async ngOnInit() {
    this.user = this.tokenAuthService.user.user;
    this.createForm();
    if (this.user.role.id == 1 || this.user.role.id == 6) {
      this.getItems();
      this.getWarehouse();
    }
    await this.patchInvoice();
    if (this.id == undefined || this.id == null)
      this.getCustomers();

  }
  createForm() {
    this.form = this.fb.group({
      id: [null],
      customers: [null, Validators.required],
      first_name: [null, { disabled: true }],
      last_name: [null, { disabled: true }],
      cnic: [null],
      mobile: [null],
      search: [],
      address: [null],
      username: [null],
      password: [null, { disabled: true }],
      paid: [],
      packages: [null],
      package_price: [null],
      stocks: (this.user.role.id == 1 || this.user.role.id == 6) ? this.fb.array([], null) : this.fb.array([]),
    });

    // this.fb.group({
    //   id: [null],
    //   items: [null, Validators.required],
    //   warehouse: [null, Validators.required],
    //   quantity: [null, Validators.required],
    //   price: [null, Validators.required],
    // })

  }
  packageChange() {
    // console.log(this.selectedPackage);
    this.form.patchValue({ package_price: this.selectedPackage.price });
  }
  changeItem(s) {
    const pos = this.itemList.map(function (e) { return e.name; }).indexOf(this.selectedItem);
    const lengthOfWF = this.form.value.stocks.length;

    this.stocks.at(lengthOfWF - 1).patchValue({
      items: this.itemList[pos].name,

    });
  }
  getCustomers() {
    this.genericService.find('/invoices/customerForInvoice').subscribe((data: any) => {
      this.customerList = data.customers;
      this.createSearchableArray();
    }, err => {
      // this.toastr.error(err.error.err || err.error);
    });
  }
  get stocks() {
    return this.form.get('stocks') as FormArray;
  }
  addStock() {

    const cNull = this.form.value.stocks[this.form.value.stocks.length - 1];
    if (cNull == null || (cNull.items != null && cNull.warehouse != null)) {
      this.stocks.push(this.fb.group({
        id: [null],
        items: [null, Validators.required],
        warehouse: [null, Validators.required],
        quantity: [null, Validators.required],
        price: [null, Validators.required],
      }));
    } else {
      this.toastr.warning('Fill last one first');
    }
  }

  deleteJEA(index) {
    this.stocks.removeAt(index);
  }
  createSearchableArray() {
    for (let item of this.customerList) {
      this.searchAbleArray.push(item.username);
    }
  }
  customerFieldChange() {
    this.selectedRecord = false;
  }
  async afterSelectingRecord(s) {
    this.form.reset();
    this.selectedPackage = null;
    this.form.patchValue({ packages: 0 });
    const pos = this.customerList.map(function (e) { return e.username; }).indexOf(s);
    this.selectedRecord = this.customerList[pos];
    this.form.patchValue({
      customers: this.selectedRecord.id,
      first_name: this.selectedRecord.first_name,
      last_name: this.selectedRecord.last_name,
      cnic: this.selectedRecord.cnic,
      mobile: this.selectedRecord.mobile,
      username: this.selectedRecord.username,
      email: this.selectedRecord.email,
      password: this.selectedRecord.password,
      address: this.selectedRecord.address,
    });
    this.packageList = await this.getPackages();
  }
  getPackages(): Promise<any> {
    return new Promise(async resolve => {
      const dealer = this.selectedRecord.createdBy.id == undefined ? this.selectedRecord.createdBy : this.selectedRecord.createdBy.id;
      await this.genericService.find('/dealerpackages/find?filters%5B%5D=1&dealer_id=' + dealer).subscribe(data => {
        return resolve(data.dealerPackages);
      }, err => {
        this.toastr.error(err.error.err || err.error);
        return resolve([]);
      });

    });

  }
  getItems() {
    const abc = this.genericService.find('/items/find').subscribe(data => {
      this.itemList = data.items;
    }, err => {
      this.toastr.error(err.error.err);
    });

  }
  getWarehouse() {
    const abc = this.genericService.find('/warehouse/find').subscribe(data => {
      this.warehouseList = data.warehouse;
    }, err => {
      this.toastr.error(err.error.err);
    });

  }
  // onSubmit(){
  //   // this.genericService.customerReport('http://localhost:5488/api/report' , body).subscribe((data:any)=>{
  //   //   console.log(data);
  //   //   var file = new Blob([data], { type: 'application/pdf' });
  //   //   var fileURL = URL.createObjectURL(file);
  //   //   console.log(fileURL);
  //   //   // this.router.navigateByUrl(fileURL);
  //   // },
  //   // err =>{
  //   //   console.log(err);
  //   // })
  // }
  print(event): void {
    let total_price = this.form.value.package_price == null ? 0 : this.form.value.package_price;
    for (let s of this.form.value.stocks) {
      total_price += (s.quantity * s.price);
    }

    // console.log(this.form.value);

    if (this.id == undefined || this.id == null) {
      const data: any = {
        customers: this.form.value.customers,
        total_price: total_price,
        packages: this.selectedPackage ? this.selectedPackage.packages.id : null,
        package_price: this.form.value.package_price ? this.form.value.package_price : 0,
        stocks: this.form.value.stocks,
      }
      this.genericService.create('/invoices/create', data).subscribe(
        (result: any) => {
          this.toastr.success('Invoice created successfully');
          this.id = result.id;
        },
        (err: any) => {
          this.toastr.error(err.error.err || err.error || err);
          // this.form.reset();
        }
      )
    }
    else {
      let stockList = [];
      for (let s of this.form.value.stocks) {
        const ipos = this.itemList.map(function (e) { return e.id; }).indexOf(s.items);
        const wpos = this.warehouseList.map(function (e) { return e.id; }).indexOf(s.warehouse);
        s.items = this.itemList[ipos].name;
        s.warehouse = this.warehouseList[wpos].name;
        stockList.push(s);
      }
      const printData: any = {
        customers: this.selectedRecord,
        total_price: total_price,
        packages: this.selectedPackage.packages,
        package_price: this.form.value.package_price,
        stocks: stockList,
      }
      this.shareDataService.setObj = printData;
      this.router.navigate(['print/invoice']);
      // localStorage.setItem('printInvoice' , printData);
      // window.open('#/print/invoice');
    }


  }
  payment() {
    // partyOf: [null, Validators.required],
    // partyOfId: [null, Validators.required],
    // amount: [null, Validators.required],
    let total_price = this.form.value.package_price;
    for (let s of this.form.value.stocks) {
      total_price += (s.quantity * s.price);
    }

    let obj = {
      partyOf: 'Customer',
      partyOfId: this.selectedRecord.id,
      amount: total_price,
      username: this.selectedRecord.username,
      invoiceId: this.id
    };

    this.shareDataService.setObj = obj;

    this.router.navigate(["/pages/accounts/payment-entry/invoice"]);

    // const activeModal = this.modalService.open(PaymentComponent, {
    //   size: "sm",
    //   container: "nb-layout"
    // });
    // activeModal.componentInstance.modalHeader = "Invoice Payment";
    // activeModal.componentInstance.modalAmount =  this.form.value.items[0].price;
    // activeModal.componentInstance.modalContent = this.id;
    // activeModal.result.then(
    //   (result) => {
    //     if(result.status){
    //       this.toastr.success(result.msg);
    //       this.form.patchValue({paid:true});
    //       this.router.navigateByUrl('pages/invoices/list-invoice');
    //     }
    //     else{
    //       this.toastr.error(result.msg);
    //     }

    //   },
    // );
  }
  patchInvoice(): Promise<any> {

    return new Promise(resolve => {
      this.route.params.subscribe(async params => {
        this.id = params["id"]; // (+) converts string 'id' to a number
        if (this.id !== undefined) {
          await this.genericService.findOne('/invoices/findOne', this.id).subscribe(async (data: any) => {
            this.selectedRecord = data.customers
            this.packageList = await this.getPackages();
            this.selectedPackage = data.packages;
            this.form.patchValue({
              id: data.id,
              customers: data.customers.id,
              first_name: data.customers.first_name,
              last_name: data.customers.last_name,
              cnic: data.customers.cnic,
              mobile: data.customers.mobile,
              paid: data.paid,
              package_price: data.package_price,
              packages: this.selectedPackage,
            });
            for (let item of data.invoicestock) {
              if (data.invoicestock.indexOf(item) == 0) {
                this.form.patchValue({ stocks: data.invoicestock });
              } else if (data.invoicestock.indexOf(item) > 0) {
                this.stocks.push(this.fb.group({
                  items: [item.items],
                  warehouse: [item.warehouse],
                  quantity: [item.quantity],
                  price: [item.price],
                }));
              }
            }
            const pos = this.packageList.map(function (e) { return e.packages.package_name; }).indexOf(this.selectedPackage.package_name);

            if (pos >= 0) {
              this.selectedPackage = this.packageList[pos];

            }

            this.searchAbleArray.length = 0;
            this.searchAbleArray.push(this.selectedRecord.username);
            return resolve(true);

          },
            err => {
              this.toastr.error(err.error.err || err.error);
              return resolve(true);

            });
        }
        return resolve(true);

      });
    });
  }
}
