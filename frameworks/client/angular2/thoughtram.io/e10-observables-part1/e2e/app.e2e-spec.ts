import { E10ObservablesPart1Page } from './app.po';

describe('e10-observables-part1 App', function() {
  let page: E10ObservablesPart1Page;

  beforeEach(() => {
    page = new E10ObservablesPart1Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
