import { NotificationComponent } from "./notification.component";

describe("DealerPackagesModule", () => {
  let notificationsModule: NotificationComponent;

  beforeEach(() => {
    notificationsModule = new NotificationComponent();
  });

  it("should create an instance", () => {
    expect(notificationsModule).toBeTruthy();
  });
});
