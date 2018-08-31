import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenewPageComponent } from './renew.component';

describe('RenewComponent', () => {
  let component: RenewPageComponent;
  let fixture: ComponentFixture<RenewPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenewPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
