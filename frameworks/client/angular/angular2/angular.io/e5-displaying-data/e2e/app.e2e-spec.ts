import { E5DisplayingDataPage } from './app.po';

describe('e5-displaying-data App', function() {
  let page: E5DisplayingDataPage;

  beforeEach(() => {
    page = new E5DisplayingDataPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
