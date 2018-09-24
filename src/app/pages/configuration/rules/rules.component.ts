import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '../../../../../node_modules/@angular/forms';
import { NgbModal } from '../../../../../node_modules/@ng-bootstrap/ng-bootstrap';
import { ToastrService } from '../../../../../node_modules/ngx-toastr';
import { GenericStockService } from '../../../@core/data/generic-stock.service';
import { FormulaComponent } from './formula.component';

@Component({
  selector: 'rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.scss']
})
export class RulesComponent implements OnInit {
  public form: FormGroup;
  public accounts: any;
  public accountsNames: any = [];
  formControlValue = '';
  constructor(
    private formbuilder: FormBuilder,
    public modalService: NgbModal,
    public toaster: ToastrService,
    public genericService: GenericStockService
  ) { }
  selectedAccount(s) {
    const pos = this.accounts.map(function (e) { return e.name; }).indexOf(s);
    const lengthOfWF = this.form.value.journalentryaccount.length;
    this.journalentryaccount.at(lengthOfWF - 1).patchValue({ account: this.accounts[pos].id });
  }
  ngOnInit() {
    this.getAccounts();
    this.createForm();
  }
  public createForm() {
    this.form = this.formbuilder.group({
      journalentryaccount: this.formbuilder.array([
        this.formbuilder.group({
          account: [null, Validators.required],
          wf_number: [null, Validators.required],
          debit: [null, Validators.required],
          credit: [null, Validators.required]
        })], Validators.required)
    });
  }
  get journalentryaccount() {
    return this.form.get('journalentryaccount') as FormArray;
  }
  addJEA() {
    const cNull = this.form.value.journalentryaccount[this.form.value.journalentryaccount.length - 1];
    if (cNull.account != null && cNull.debit != null && cNull.credit != null) {
      this.journalentryaccount.push(this.formbuilder.group({
        account: [null, Validators.required],
        wf_number: [null, Validators.required],
        debit: [0, Validators.required],
        credit: [0, Validators.required]
      }));
    } else {
      this.toaster.warning('Fill Current Work Flow First')
    }
  }
  deleteJEA(index) {
    this.journalentryaccount.removeAt(index);
  }
  createFormula(s, e) {
    (event.srcElement as HTMLElement).blur();
    e.preventDefault();
    const creditOrDebit = s;
    const lengthOfWF = this.form.value.journalentryaccount.length;
    const activeModal = this.modalService.open(FormulaComponent, {
      size: "lg",
      container: "nb-layout"
    });
    activeModal.componentInstance.dataArray = e.srcElement.value;
    activeModal.result.then(
      (data: any) => {
        if (creditOrDebit == 'debit') {
          this.journalentryaccount.at(lengthOfWF - 1).patchValue({ debit: data.trim() });
        }
        else {
          this.journalentryaccount.at(lengthOfWF - 1).patchValue({ credit: data.trim() });
        }
      }, () => {
        // consol
      });
  }
  onSubmit() {
    this.genericService.create('/workflow/createMultiple', { dataArray: this.form.value.journalentryaccount }).subscribe(data => {
        this.toaster.success('workflow add successfully');
        this.form.reset();
    },
   err =>{
    this.toaster.error(err.error.err || err.error);
   })
  }
  createAccountNamesArray() {
    for (let item of this.accounts) {
      this.accountsNames.push(item.name);
    }
  }
  getAccounts() {
    const abc = this.genericService.find('/account/find').subscribe(data => {
        this.accounts = data.account;
        this.createAccountNamesArray();
    }, err => {
      this.toaster.error(err.error.err);
    })
  }
}
