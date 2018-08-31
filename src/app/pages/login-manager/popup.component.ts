import { Component } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'ngx-popup',
    template: `
    <div class="modal-header">
    <span>{{ modalHeader }}</span>
    <button class="close" aria-label="Close" (click)="closeModal()">
        <span aria-hidden="true">&times;</span>
    </button>
</div>
<div class="modal-body">
            <div class="form-group" *ngIf="modalReject != undefined">
              <label>Rejection Reason</label>
              <select class="form-control" [(ngModel)] = "rejectReason">
                <option value="0">CNIC not Match</option>
                <option value="1">Location Error</option>
                <option value="2">Reg Form Error</option>
              </select>
            </div>
    <button type="button" (click)="ClickedOk()" class="btn btn-primary btn-block"> OK </button>
    </div>
    `,
})
export class PopupComponent{
    modalHeader: string;
    modalContent: any;
    modalReject:any;
    rejectReason:any;
    constructor(
        private activeModal: NgbActiveModal,
      ) { }

      closeModal() {
        this.activeModal.close();
      }
      ClickedOk(){
        if(this.modalReject){
            
            this.activeModal.close(this.rejectReason);
        }
        else
            this.activeModal.close();
      }
}