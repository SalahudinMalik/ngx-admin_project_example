import { LoginManagerModule } from './login-manager.module';

describe('LoginManagerModule', () => {
  let loginManagerModule: LoginManagerModule;

  beforeEach(() => {
    loginManagerModule = new LoginManagerModule();
  });

  it('should create an instance', () => {
    expect(loginManagerModule).toBeTruthy();
  });
});
