import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDealerPackagesComponent } from './add-dealer-packages.component';

describe('AddDealerPackagesComponent', () => {
  let component: AddDealerPackagesComponent;
  let fixture: ComponentFixture<AddDealerPackagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDealerPackagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDealerPackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
