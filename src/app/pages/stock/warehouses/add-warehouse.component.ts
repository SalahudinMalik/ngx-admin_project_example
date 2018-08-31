import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { GenericStockService } from "../../../@core/data/generic-stock.service";

@Component({
  selector: "ngx-modal",
  templateUrl: './add-warehouse.component.html'
})
export class AddWareHouse implements OnInit {
  public form: FormGroup;
  private modalData = { name: "", location: "" }

  constructor(private activeModal: NgbActiveModal, private formBuilder: FormBuilder, private toastr: ToastrService, public genericStockService: GenericStockService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      wareHouseName: [null, Validators.required],
      wareHouseLocation: [null, Validators.required]
    });
  }
  closeModal() {
    this.activeModal.close();
  }
  onSubmit() {
    this.modalData.name = this.form.value.wareHouseName;
    this.modalData.location = this.form.value.wareHouseLocation;
    this.genericStockService.create('/warehouse/create', this.modalData).subscribe(data => {
    }, err => {
    }, () => {
      this.activeModal.close(this.modalData);
    });
  }
}
