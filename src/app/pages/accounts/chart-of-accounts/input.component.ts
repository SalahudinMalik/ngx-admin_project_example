import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GenericStockService } from '../../../@core/data/generic-stock.service';
import { ToastrService } from '../../../../../node_modules/ngx-toastr';

@Component({
    selector: 'ngx-modal',
    templateUrl: './input.component.html',
})
export class InputComponent implements OnInit {
    public rootType = [
        'ASSET',
        'LIABILITY',
        'EQUITY',
        'INCOME',
        'EXPENSE'
    ];
    public accountType = [
        'BANK', 'CASH'
    ]
    public form: FormGroup;
    modalHeader: string;
    parent_id: number;
    root_type:number;
    constructor(private activeModal: NgbActiveModal, private genericService: GenericStockService, private fb: FormBuilder, private toastr: ToastrService) { }

    ngOnInit() {
        this.form = this.fb.group({
            name: [null, Validators.required],
            root_type: [this.root_type, Validators.required],
            account_type: [null, Validators.required],
            account_number: [null, Validators.required],
            is_group: [false, Validators.required],
            parent_id: [this.parent_id, Validators.required],
        });
    }

    okClick() {
        const dataa = {
            name: this.form.value.name,
            root_type: this.form.value.root_type,
            account_type: this.form.value.account_type,
            account_number: this.form.value.account_number,
            is_group: this.form.value.is_group,
            parent_id: this.form.value.parent_id,
        }
        this.genericService.create('/account/create', dataa).subscribe((data: any) => {
            this.toastr.success('Account Created');
            this.closeModal();
        }, err => {
            this.toastr.error(err.error.err || err.error);
        });
    }
    closeModal() {
        this.activeModal.close();
    }
}
