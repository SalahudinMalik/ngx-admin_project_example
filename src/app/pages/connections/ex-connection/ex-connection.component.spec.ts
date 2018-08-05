import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExConnectionComponent } from './ex-connection.component';

describe('ExConnectionComponent', () => {
  let component: ExConnectionComponent;
  let fixture: ComponentFixture<ExConnectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExConnectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
