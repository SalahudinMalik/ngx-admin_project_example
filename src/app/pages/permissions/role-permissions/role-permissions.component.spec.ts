import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { RolePermissionsComponent } from "./role-permissions.component";

describe("PermissionListComponet", () => {
  let component: RolePermissionsComponent;
  let fixture: ComponentFixture<RolePermissionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RolePermissionsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolePermissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
