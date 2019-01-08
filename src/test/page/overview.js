'use strict';

const Page = require('./page');
const OVERVIEW_PAGE_TITLE = 'GOV.UK - The best place to find government services and information';

class Overview extends Page {
  constructor(driver) {
    super(driver);
  }

  async open(appURL) {
    await super.open(appURL);
    return await this.waitForPageLoad();
  }

  async waitForPageLoad() {
    return await this.waitForPageWithTitle(OVERVIEW_PAGE_TITLE);
  }

  async getStartButton() {
    return await this.findByClassName('govuk-button--start');
  }

  async clickStartButton() {
    const startButton = await this.getStartButton();
    return await startButton.click();
  }
}

module.exports = Overview;
