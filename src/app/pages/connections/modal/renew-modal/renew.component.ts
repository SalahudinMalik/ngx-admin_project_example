import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { NgForm } from "@angular/forms";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { GenericStockService } from "../../../../@core/data/generic-stock.service";

@Component({
  selector: "ngx-modal",
  templateUrl: "./renew.component.html"
})
export class RenewComponent implements OnInit {
  modalHeader: string;
  price: any;
  public form: FormGroup;
  modalContent: any;

  constructor(
    private activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private toastr: ToastrService,
    public genericService: GenericStockService
  ) { }
  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.form = this.fb.group({
      name: [null, Validators.required],
      packageName: [null, Validators.required],
      price: [null, Validators.required],
      isWireless: [null, Validators.required]
    });
  }
  closeModal() {
    this.activeModal.close();
  }
  onSubmit() {
    const date = new Date();
    const renew = {
      activation_date: date.toISOString(),
      connection_id: this.modalContent.id,
      renewal_price: this.price
    };
    this.genericService.create('/connrenewal/create', renew).subscribe(
      data1 => {
        this.toastr.success("Successfully Renewed");
        this.activeModal.close();
      },
      err => {
        this.toastr.error(err.error.err || err.error);
      }
    );
  }
}
