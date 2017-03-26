import { E16ReactiveFormsPage } from './app.po';

describe('e16-reactive-forms App', function() {
  let page: E16ReactiveFormsPage;

  beforeEach(() => {
    page = new E16ReactiveFormsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
