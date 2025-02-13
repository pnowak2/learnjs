import { E11ObservablesPart2Page } from './app.po';

describe('e11-observables-part2 App', function() {
  let page: E11ObservablesPart2Page;

  beforeEach(() => {
    page = new E11ObservablesPart2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
