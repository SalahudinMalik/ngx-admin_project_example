import { Component, OnInit , OnDestroy} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgProgress } from '@ngx-progressbar/core';
import { ActivatedRoute } from '@angular/router';
import { BasestationService } from '../../../@core/data/basestation.service';
import { Basestation } from '../../../models/basestation.model';
import { DISABLED } from '@angular/forms/src/model';

@Component({
  selector: 'ngx-add-basestation',
  templateUrl: './add-basestation.component.html',
  styleUrls: ['./add-basestation.component.scss']
})
export class AddBaseStationComponent implements OnInit , OnDestroy {
  id: any;
  private sub: any;
  btnSave: boolean;
  public form: FormGroup;
  constructor(private fb: FormBuilder ,
    private BasestationService: BasestationService,
    private toastr: ToastrService,
    private ngProgress: NgProgress,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.btnSave = true;

    this.form = this.fb.group({
      name: [null, Validators.compose([Validators.required])],
      lat: [null, Validators.compose([Validators.required])],
      lng: [null, Validators.compose([Validators.required])],
      bandwidth: [null, Validators.compose([Validators.required])],
      maxusers: [null, Validators.compose([Validators.required])],

    });
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id']; // (+) converts string 'id' to a number
      console.log('this.id ' + this.id);
      if (this.id !== undefined) {
        this.BasestationService.getOneBasestation(this.id)
        .subscribe(data => {
          this.form.patchValue({
            name : data.name,
            lat: data.lat,
            lng: data.lng,
            bandwidth: data.bandwidth,
            maxusers: data.maxusers,

          });
         this.form.disable();
         this.btnSave = true;

         console.log('form.valid ' + this.form.valid + ' btnSave ' + this.btnSave)
        });

      }

      // In a real app: dispatch action to load the details here.
   });
    console.log('this.id ' + this.id);

  }
  onSubmit() {

    var date = new Date();


    const data = {
      name: this.form.value.name,
      lat: this.form.value.lat,
      lng: this.form.value.lng,
      bandwidth:this.form.value.bandwidth,
      maxusers:this.form.value.maxusers,
    }


      this.BasestationService.saveBasestation(data)
      .subscribe(
        data1 => {
            console.log('Data inserted')
            this.toastr.success('Data inserted successfully.');
        },
       error => {
        this.toastr.error('Data not inserted error occured.');
        }
      );

  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
