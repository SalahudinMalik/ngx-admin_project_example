import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocVerificationComponent } from './doc-verification.component';

describe('DocVerificationComponent', () => {
  let component: DocVerificationComponent;
  let fixture: ComponentFixture<DocVerificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocVerificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
