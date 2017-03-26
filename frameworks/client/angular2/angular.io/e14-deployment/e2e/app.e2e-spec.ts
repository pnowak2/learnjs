import { E14DeploymentPage } from './app.po';

describe('e14-deployment App', function() {
  let page: E14DeploymentPage;

  beforeEach(() => {
    page = new E14DeploymentPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
