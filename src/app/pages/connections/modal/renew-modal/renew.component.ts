import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { NgForm } from "@angular/forms";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { ConnectionsService } from "../../../../@core/data/connections.service";

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
    private renewService: ConnectionsService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: [null, Validators.compose([Validators.required])],
      packageName: [null, Validators.compose([Validators.required])],
      price: [null, Validators.compose([Validators.required])],
      isWireless: [null, Validators.compose([Validators.required])]
      //   registrationDate: [null, Validators.compose([Validators.required])]
    });
  }
  // private cObj: CustomersListComponent =
  //  new CustomersListComponent(null , null , null , null , null , null , null , this.authService ) ;
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
    console.log(renew);
    this.renewService.renewConnection(renew).subscribe(
      data1 => {
        this.toastr.success("Successfully Renewed");

        this.activeModal.close();
      },
      error => {
        this.toastr.error("Renewal Error");
      }
    );
  }
}
