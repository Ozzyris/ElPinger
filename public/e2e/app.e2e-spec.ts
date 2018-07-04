import { PingMasterPage } from './app.po';

describe('ping-master App', () => {
  let page: PingMasterPage;

  beforeEach(() => {
    page = new PingMasterPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
