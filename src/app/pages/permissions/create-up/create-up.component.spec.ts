import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpComponent } from './create-up.component';

describe('CreateUpComponent', () => {
  let component: CreateUpComponent;
  let fixture: ComponentFixture<CreateUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
