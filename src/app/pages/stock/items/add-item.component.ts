import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { GenericStockService } from "../../../@core/data/generic-stock.service";

@Component({
    selector: "ngx-modal",
    templateUrl: './add-item.component.html'
})
export class AddItem implements OnInit {
    public form: FormGroup;
    private units: ['Nos', 'KG', 'Meter'];
    private unit: any;
    private modalData = { name: "", code: "", unit: 0, description: '' }

    constructor(private activeModal: NgbActiveModal, private formBuilder: FormBuilder, private toastr: ToastrService, public genericStockService: GenericStockService) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            name: [null, Validators.required],
            code: [null, Validators.required],
            unit: [null, Validators.required],
            description: [null, Validators.required],

        });
    }
    closeModal() {
        this.activeModal.close();
    }
    onSubmit() {
        this.modalData.name = this.form.value.name;
        this.modalData.code = this.form.value.code;
        this.modalData.unit = parseInt(this.form.value.unit);
        this.modalData.description = this.form.value.description;
        this.genericStockService.create('/items/create', this.modalData).subscribe(data => {
        }, err => {
        }, () => {
            this.activeModal.close(this.modalData);
        });
    }
    dealerChange(){}
}
