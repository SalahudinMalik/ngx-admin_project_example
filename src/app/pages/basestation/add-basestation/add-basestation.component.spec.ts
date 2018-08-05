import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBaseStationComponent } from './add-basestation.component';

describe('AddComplainComponent', () => {
  let component: AddBaseStationComponent;
  let fixture: ComponentFixture<AddBaseStationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBaseStationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBaseStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
