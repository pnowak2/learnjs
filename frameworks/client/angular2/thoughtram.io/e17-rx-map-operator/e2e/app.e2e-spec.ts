import { E17RxMapOperatorPage } from './app.po';

describe('e17-rx-map-operator App', function() {
  let page: E17RxMapOperatorPage;

  beforeEach(() => {
    page = new E17RxMapOperatorPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
