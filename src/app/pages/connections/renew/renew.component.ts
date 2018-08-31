import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '../../../../../node_modules/@angular/forms';
import { ToastrService } from '../../../../../node_modules/ngx-toastr';
import { GenericStockService } from '../../../@core/data/generic-stock.service';


@Component({
  selector: 'renew',
  templateUrl: './renew.component.html',
  styleUrls: ['./renew.component.scss']
})
export class RenewPageComponent implements OnInit {
  public conRenewForm: FormGroup;
  public connections: any;
  public connectionsNames: any = [];
  formControlValue = '';
  public renewThisConn = {
    connection_id: null,
    renewal_price: null
  }
  constructor(
    private formbuilder: FormBuilder,
    public toaster: ToastrService,
    public genericService: GenericStockService,
  ) { }
  selectedAccount(s) {
    const pos = this.connections.map(function (e) { return e.customers.username; }).indexOf(s);
    const selectedConnection = this.connections[pos];
    this.renewThisConn.connection_id = selectedConnection.id;
    this.conRenewForm.patchValue({
      customer_name: selectedConnection.customers.first_name + " " + selectedConnection.customers.last_name,
      customer_mobile: selectedConnection.customers.mobile,
      connection_address: selectedConnection.address,
      dealer_name: selectedConnection.dealer.first_name,
      dealer_mobile: selectedConnection.dealer.mobile,
      package_name: selectedConnection.packages.package_name,
      connection_price: selectedConnection.connection_price,
    });
  }
  ngOnInit() {
    this.getconnections();
    this.createForm();
  }
  public createForm() {
    this.conRenewForm = this.formbuilder.group({
      customer_name: [null, Validators.required],
      customer_mobile: [null, Validators.required],
      connection_address: [null],
      dealer_name: [null, Validators.required],
      dealer_mobile: [null, Validators.required],
      package_name: [null, Validators.required],
      renewal_price: [null, Validators.required],
      connection_price: [null, Validators.required],

    });
  }
  onSubmit() {
    this.renewThisConn.renewal_price = this.conRenewForm.value.renewal_price;
    if (this.renewThisConn.renewal_price && this.renewThisConn.connection_id) {
      this.genericService.create('/connrenewal/create', this.renewThisConn).subscribe(data => {
        this.toaster.success('Connection renewed successfully');
        this.conRenewForm.reset();
      }, err => {
        this.toaster.error(err.error.err || err.error)
      })
    } else {
      this.toaster.warning('Connection Price is required')
    }
  }
  createAccountNamesArray() {
    for (let item of this.connections) {
      this.connectionsNames.push(item.customers.username);
    }
  }
  getconnections() {
    this.genericService.find('/connection/find?filters%5B%5D=1&doc=1').subscribe(data => {
        this.connections = data.connection;
        this.createAccountNamesArray();
    }, err => {
      this.toaster.error(err.error.err);
    })
  }
}
