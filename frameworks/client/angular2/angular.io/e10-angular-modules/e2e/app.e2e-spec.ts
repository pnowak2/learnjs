import { E10AngularModulesPage } from './app.po';

describe('e10-angular-modules App', function() {
  let page: E10AngularModulesPage;

  beforeEach(() => {
    page = new E10AngularModulesPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
