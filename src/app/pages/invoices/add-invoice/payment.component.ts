import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GenericStockService } from '../../../@core/data/generic-stock.service';

@Component({
    selector: 'ngx-payment',
    templateUrl: './payment.component.html',
})

export class PaymentComponent implements OnInit {

    modalHeader: string;
    modalContent: any;
    modalAmount: any;
    constructor(private activeModal: NgbActiveModal, private genericService: GenericStockService) {

    }

    ngOnInit() {

    }
    closeModal() {
        this.activeModal.close();
    }
    submit() {
        if (this.modalAmount > 0) {
            this.genericService.create('/invoices/payment', {id:this.modalContent})
                .subscribe((res: any) => {
                    //   this.toastr.success(res);
                    this.activeModal.close({ status: true, msg: 'Payment made successfully' });
                },
                    error => {
                        this.activeModal.close({ status: false, msg: 'Error  while making payment' });
                    });
        }

    }
}