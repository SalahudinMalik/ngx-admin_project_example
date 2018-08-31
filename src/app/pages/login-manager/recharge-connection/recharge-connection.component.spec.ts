import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RechargeConnectionComponent } from './recharge-connection.component';

describe('RechargeConnectionComponent', () => {
  let component: RechargeConnectionComponent;
  let fixture: ComponentFixture<RechargeConnectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RechargeConnectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RechargeConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
