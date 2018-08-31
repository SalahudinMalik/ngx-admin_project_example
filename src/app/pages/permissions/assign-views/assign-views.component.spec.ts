import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignViewsComponent } from './assign-views.component';

describe('AssignViewsComponent', () => {
  let component: AssignViewsComponent;
  let fixture: ComponentFixture<AssignViewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignViewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignViewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
