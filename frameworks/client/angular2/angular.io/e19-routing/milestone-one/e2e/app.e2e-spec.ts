import { MilestoneOnePage } from './app.po';

describe('milestone-one App', () => {
  let page: MilestoneOnePage;

  beforeEach(() => {
    page = new MilestoneOnePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
