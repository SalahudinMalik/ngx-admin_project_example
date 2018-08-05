import { DealersModule } from './user.module';

describe('DealersModule', () => {
  let dealersModule: DealersModule;

  beforeEach(() => {
    dealersModule = new DealersModule();
  });

  it('should create an instance', () => {
    expect(dealersModule).toBeTruthy();
  });
});
