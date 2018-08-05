import { DealerPackagesModule } from './dealer-packages.module';

describe('DealerPackagesModule', () => {
  let dealerPackagesModule: DealerPackagesModule;

  beforeEach(() => {
    dealerPackagesModule = new DealerPackagesModule();
  });

  it('should create an instance', () => {
    expect(dealerPackagesModule).toBeTruthy();
  });
});
