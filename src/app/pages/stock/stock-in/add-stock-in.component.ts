import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { GenericStockService } from "../../../@core/data/generic-stock.service";

@Component({
    selector: "ngx-modal",
    templateUrl: './add-stock-in.component.html'
})
export class AddStockIn implements OnInit {
    public form: FormGroup;
    private units: ['Nos', 'KG', 'Meter'];
    private unit: any;
    suppliers: any;
    wareHouses: any;
    items: any;
    selectedWareHouse: any;
    selectedSupplier: any;
    selectedItem: any;
    private modalData = {
        item_id: null,
        warehouse_id: null,
        supplier_id: null,
        bilty_no: null,
        cargo_service: '',
        invoice_no: '',
        quantity: 0,
        purchase_date: null,
        cost_price: 0
    }

    constructor(private activeModal: NgbActiveModal, private formBuilder: FormBuilder, private toastr: ToastrService,
        public genericStockService: GenericStockService, genericService: GenericStockService) { }

    ngOnInit() {
        this.getWareHouses();
        this.getSuppliers();
        this.getItems();
        this.form = this.formBuilder.group({
            supplier: [null, Validators.required],
            wareHouse: [null, Validators.required],
            item: [null, Validators.required],
            date: [null, Validators.required],
            price: [null, Validators.required],
            quantity: [null, Validators.required],
            invoiceNo: [null, Validators.required],
            cargoService: [null, Validators.required],
            biltyNo: [null, Validators.required],

        });
    }
    closeModal() {
        this.activeModal.close();
    }
    onSubmit() {
        this.modalData.item_id = this.form.value.item;
        this.modalData.warehouse_id = this.form.value.wareHouse;
        this.modalData.supplier_id = this.form.value.supplier;
        this.modalData.bilty_no = this.form.value.biltyNo;
        this.modalData.cargo_service = this.form.value.cargoService;
        this.modalData.invoice_no = this.form.value.invoiceNo;
        this.modalData.quantity = this.form.value.quantity;
        this.modalData.purchase_date = this.form.value.date;
        this.modalData.cost_price = this.form.value.price;
        this.genericStockService.create('/stockin/create', this.modalData).subscribe(data => {
        }, err => {
        }, () => {
            this.activeModal.close(this.modalData);
        });
    }
    public getWareHouses() {
        this.genericStockService.find('/warehouse/find').subscribe(data => { this.wareHouses = data.warehouse; 
         });
    }
    public getItems() {
        this.genericStockService.find('/items/find').subscribe(data => { this.items = data.items; 
         });
    }
    public getSuppliers() {
        this.genericStockService.find('/supplier/find').subscribe(data => { this.suppliers = data.supplier; 
        });
    }

}
