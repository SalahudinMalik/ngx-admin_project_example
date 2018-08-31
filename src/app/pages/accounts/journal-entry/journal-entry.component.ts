import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from "@angular/forms";
import { ToastrService } from '../../../../../node_modules/ngx-toastr';
import { GenericStockService } from '../../../@core/data/generic-stock.service';
import * as _ from 'lodash';
import { ActivatedRoute } from '../../../../../node_modules/@angular/router';

@Component({
  selector: 'journal-entry',
  templateUrl: './journal-entry.component.html',
  styleUrls: ['./journal-entry.component.scss']
})
export class JournalEntryComponent implements OnInit {
  public form: FormGroup;
  public entryTypes = ['Journal Entry', 'Cash Entry'];
  public series = ['JV', 'CV', 'BE'];
  public accounts: any;
  public totalDebit: number;
  public totalCredit: number;
  public creditORdebit: boolean = true;
  public savedReturnID: string;
  public creditDebitAtSameTime: boolean = false;
  public saved: boolean = false;
  public submitted: boolean = false;
  constructor(private formbuilder: FormBuilder, private toastr: ToastrService, private genericService: GenericStockService, private route: ActivatedRoute) { }

  public ngOnInit() {
    this.createForm();
    this.getAccounts();
    this.patchForUpdate()
    this.form.
      valueChanges.
      subscribe(form => {
        this.saved = false;
        this.submitted = false;
      });
  }
  public createForm() {
    this.form = this.formbuilder.group({
      entry_type: [null, Validators.required],
      date: [null, Validators.required],
      series: [null],
      company: [null],
      reference_type: [null],
      reference_date: [null],
      user_remarks: [null],
      status: ['Save'],
      journalentryaccount: this.formbuilder.array([this.formbuilder.group({ account: [null, Validators.required], debit: [0, Validators.required], credit: [0, Validators.required] })], Validators.required)
    });
  }
  get journalentryaccount() {
    return this.form.get('journalentryaccount') as FormArray;
  }
  addJEA() {
    this.journalentryaccount.push(this.formbuilder.group({
      account: [null, Validators.required],
      debit: [0, Validators.required],
      credit: [0, Validators.required]
    }));
  }
  deleteJEA(index) {
    this.journalentryaccount.removeAt(index);
  }
  saveJouranalEntry() {
    if (this.totalCredit && this.totalDebit && this.totalCredit == this.totalDebit && !this.creditDebitAtSameTime) {
      this.genericService.create('/journalentry/create', this.form.value).subscribe(data => {
        if (data.id && data.msg == "Your data is saved") {
          this.savedReturnID = data.id;
          this.saved = true;
          this.toastr.success('Jornal Entry Saved');
        }
        else if (data.id && data.msg == "Your data is updated") {
          this.savedReturnID = data.id;
          this.saved = true;
          this.toastr.success('Jornal Entry Updated');
        }

        else if (data.id && data.msg == "Your data is submitted") {
          this.toastr.success('Jornal Entry Submitted');
          this.form.reset();
          this.submitted = true;
          this.totalCredit = 0;
          this.totalDebit = 0;
        }
      }, err => {
        this.toastr.error(err.error.err || err.error);
      });
    } else if (this.totalCredit != this.totalDebit) {
      this.toastr.warning('Total Credit and Total Debit Should be Equal')
    } else if (this.creditDebitAtSameTime) {
      this.toastr.warning('You cannot credit and debit same account at the same time');
    }
    else if (!this.totalCredit || !this.totalDebit) {
      this.toastr.warning('Total Debit and Total Credit not Defined');
    }
  }
  getAccounts() {
    this.genericService.find('/account/find').subscribe(data => { this.accounts = data.account })
  }
  calTotalDebit() {
    this.totalDebit = _.sumBy(this.form.value.journalentryaccount, 'debit');
  }
  calTotalCredit() {
    this.totalCredit = _.sumBy(this.form.value.journalentryaccount, 'credit');
  }
  debitCreditChange(i) {
    if (this.form.value.journalentryaccount[i].debit > 0 && this.form.value.journalentryaccount[i].credit > 0) {
      this.creditDebitAtSameTime = true;
      this.toastr.warning('You cannot credit and debit same account at the same time');
    } else {
      this.creditDebitAtSameTime = false;
    }
  }
  onSubmit() {
    if (this.saved) {
      this.form.value.status = 'Submit'
      this.form.value.id = this.savedReturnID;
      this.saveJouranalEntry();
    } else {
      this.form.value.status = 'Save'
      this.form.value.id = this.savedReturnID;
      this.saveJouranalEntry();
    }
  }
  patchForUpdate() {
    this.route.params.subscribe(params => {
      const id = params["id"];
      if (id !== undefined) {
        this.genericService.findOne('/journalentry/findOne', id).subscribe(data => {
          this.form.patchValue({
            entry_type: data.entry_type,
            date: data.date,
            reference_date: data.reference_date,
            user_remarks: data.user_remarks
          });
          for (let item of data.journalentryaccount) {
            if (data.journalentryaccount.indexOf(item) == 0) {
              this.form.patchValue({ journalentryaccount: data.journalentryaccount });
            } else if (data.journalentryaccount.indexOf(item) > 0) {
              this.journalentryaccount.push(this.formbuilder.group({ account: [item.account], debit: [item.debit], credit: [item.credit] }));
              this.calTotalCredit();
              this.calTotalDebit();
            } else if (data.journalentryaccount.indexOf(item) == (data.journalentryaccount.length - 1)) {
              this.calTotalCredit();
              this.calTotalDebit();
            }
          }
          if (data.status_id == 1) {
            this.savedReturnID = data.id;
            this.saved = true;
          } else if (data.status_id == 16) {
            this.saved = true;
            this.submitted = true;
            this.form.disable();
          }
          this.form.
            valueChanges.
            subscribe(form => {
              this.saved = false;
              this.submitted = false;
              this.form.value.id = data.id;
            });
        });
      }
    });
  }
  newEntry() {
    this.savedReturnID = undefined;
    this.form.reset();
    this.form.enable();
    this.createForm();
    this.saved = false;
    this.submitted = false;
  }
}
