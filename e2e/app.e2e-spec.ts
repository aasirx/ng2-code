import { Ng2CodePage } from './app.po';

describe('ng2-code App', () => {
  let page: Ng2CodePage;

  beforeEach(() => {
    page = new Ng2CodePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
