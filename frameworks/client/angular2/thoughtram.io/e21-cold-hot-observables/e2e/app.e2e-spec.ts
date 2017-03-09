import { E21ColdHotObservablesPage } from './app.po';

describe('e21-cold-hot-observables App', function() {
  let page: E21ColdHotObservablesPage;

  beforeEach(() => {
    page = new E21ColdHotObservablesPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
