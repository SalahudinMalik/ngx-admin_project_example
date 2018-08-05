import { BaseStationComponent } from './basestation.component';

describe('ComplainModule', () => {
  let complainModule: BaseStationComponent;

  beforeEach(() => {
    complainModule = new BaseStationComponent();
  });

  it('should create an instance', () => {
    expect(complainModule).toBeTruthy();
  });
});
