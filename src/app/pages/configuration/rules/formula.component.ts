import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '../../../../../node_modules/@angular/forms';
import { NgbModal, NgbActiveModal } from '../../../../../node_modules/@ng-bootstrap/ng-bootstrap';
import { ToastrService } from '../../../../../node_modules/ngx-toastr';
import * as _ from 'lodash';
@Component({
    selector: 'ngx-formula',
    templateUrl: './formula.component.html',
    styleUrls: ['./formula.component.scss']
})
export class FormulaComponent implements OnInit {
    public form: FormGroup;
    public dataArray: any;
    variables = [
        { name: '0', variable: "0" },
        { name: 'Amount', variable: "amount" },
        { name: 'Cost Price', variable: "cost_price" },
        { name: 'Dealer Price', variable: "dealer_price" },
        { name: 'Package Price', variable: "package_price" }
    ]
    operators = [
        "+", "-",
    ]
    constructor(private formbuilder: FormBuilder, public modalService: NgbModal, public toaster: ToastrService, public activeModal: NgbActiveModal) { }

    ngOnInit() {
        this.createForm();
        if (this.dataArray) {
            
            this.dataArray = _.chunk(this.dataArray.split(' ').filter(Boolean), 2);
            for (let item of this.dataArray) {
                if (this.dataArray.indexOf(item) == 0 && item.length == 2) {
                    this.formulaentry.at(0).patchValue({ variable: item[0], operator: item[1] });
                } else if (this.dataArray.indexOf(item) > 0 && item.length == 2) {
                    this.formulaentry.push(this.formbuilder.group({ variable: item[0], operator: item[1] }));
                } else {
                    this.formulaentry.push(this.formbuilder.group({ variable: item[0] }));
                }
            }
        }
    }
    public createForm() {
        this.form = this.formbuilder.group({
            formulaentry: this.formbuilder.array([this.formbuilder.group({ variable: [null, Validators.required], operator: ['+', Validators.required], })], Validators.required)
        });
    }
    get formulaentry() {
        return this.form.get('formulaentry') as FormArray;
    }
    addJEA() {
        const checkNull = this.form.value.formulaentry[this.form.value.formulaentry.length - 1];
        if (checkNull.variable != null) {
            this.formulaentry.push(this.formbuilder.group({ variable: [null, Validators.required], operator: '+', }));
        } else {
            this.toaster.warning('Please select Variable')
        }
    }
    deleteJEA(index) {
        this.formulaentry.removeAt(index);
    }
    onSubmit() {
        this.formulaentry.at(this.form.value.formulaentry.length - 1).patchValue({ operator: "+" });
        let formula: string = '';
        for (let item of this.form.value.formulaentry) {
            const x = item.variable + ' ' + ' ' + item.operator;
            formula = formula + x + ' ';
        }
        formula = formula.substring(0, formula.length - 2)
        if(formula!=undefined&& formula!=''){
            this.activeModal.close(formula);
        }else{
            this.activeModal.close();
        }
    }
}