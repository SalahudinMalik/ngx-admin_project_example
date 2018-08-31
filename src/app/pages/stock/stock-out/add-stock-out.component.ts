import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { GenericStockService } from "../../../@core/data/generic-stock.service";
import { UserService } from "../../../@core/data/appuser.service";

@Component({
    selector: "ngx-modal",
    templateUrl: './add-stock-out.component.html'
})
export class AddStockOut implements OnInit {
    public form: FormGroup;
    wareHouses: any;
    items: any;
    clientData: any;
    private modalData = {
        client_type: null,
        warehouse_id: null,
        client_id: null,
        item_id: null,
        description: null,
        area: '',
        invoice_no: '',
        quantity: 0,
        sale_date: null,
        sale_price: 0
    }
    constructor(private activeModal: NgbActiveModal, private formBuilder: FormBuilder, private toastr: ToastrService,
        public genericStockService: GenericStockService, genericService: GenericStockService, public userService: UserService) { }

    ngOnInit() {
        this.getWareHouses();
        this.getItems();
        this.form = this.formBuilder.group({
            clientType: [null, Validators.required],
            client: [null, Validators.required],
            wareHouse: [null, Validators.required],
            item: [null, Validators.required],
            date: [null, Validators.required],
            price: [null, Validators.required],
            quantity: [null, Validators.required],
            invoiceNo: [null, Validators.required],
            description: [null, Validators.required],
            area: [null, Validators.required],

        });
    }
    closeModal() {
        this.activeModal.close();
    }
    onSubmit() {
        this.modalData.client_type = this.form.value.clientType;
        this.modalData.client_id = this.form.value.client;
        this.modalData.warehouse_id = this.form.value.wareHouse;
        this.modalData.sale_price = this.form.value.price;
        this.modalData.sale_date = this.form.value.date;
        this.modalData.description = this.form.value.description;
        this.modalData.area = this.form.value.area;
        this.modalData.item_id = this.form.value.item;
        this.modalData.quantity = this.form.value.quantity;
        this.modalData.invoice_no = this.form.value.invoice_no;
        this.genericStockService.create('/stockout/create', this.modalData).subscribe(data => {
        }, err => {
        }, () => {
            this.activeModal.close(this.modalData);
        });
    }
    public getWareHouses() {
        this.genericStockService.find('/warehouse/find').subscribe(data => { this.wareHouses = data.warehouse });
    }
    public getItems() {
        this.genericStockService.find('/items/find').subscribe(data => { this.items = data.items });
    }
    public getSuppliers() {
        this.genericStockService.find('/supplier/find').subscribe(data => { this.clientData = data.supplier });
    }
    public getUsers() {
        this.userService.getAllUser(2).subscribe((data: any) => { this.clientData = data.users });
    }
    public getCustomers() {
        this.genericStockService.find('/customer/find').subscribe(data => { this.clientData = data.supplier });
    }

    typeChange() {
        const type = this.form.value.clientType;
        if (type == 0) {
            this.getUsers();
        }
        else if (type == 1) {
            this.getCustomers();
        }
        else if (type == 2) {
            this.getSuppliers();
        }
    }
}
