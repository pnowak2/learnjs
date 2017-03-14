import { E24CustomFormControlsPage } from './app.po';

describe('e24-custom-form-controls App', function() {
  let page: E24CustomFormControlsPage;

  beforeEach(() => {
    page = new E24CustomFormControlsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
