import { ChatReduxPage } from './app.po';

describe('chat-redux App', function() {
  let page: ChatReduxPage;

  beforeEach(() => {
    page = new ChatReduxPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
