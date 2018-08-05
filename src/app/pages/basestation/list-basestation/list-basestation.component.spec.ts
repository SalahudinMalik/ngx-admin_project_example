import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBaseStationComponent } from './list-basestation.component';

describe('ListPackageComponent', () => {
  let component: ListBaseStationComponent;
  let fixture: ComponentFixture<ListBaseStationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListBaseStationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBaseStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
