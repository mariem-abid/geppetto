let CommonClient = require('../common_client');

class Discount extends CommonClient {

  async searchByName(inputSelector, buttonSelector, name, wait = 0) {
    if (global.visible) {
      await this.waitForAndSetValue(inputSelector, name, wait);
      await this.waitForAndClick(buttonSelector);
    }
  }

  /**
   * This function allows to select a customer
   * @param selectorInput
   * @param selectorOption
   * @param value
   * @returns {*}
   */

  async chooseCustomer(selectorInput, selectorOption, value, wait = 0) {
    await this.waitForAndSetValue(selectorInput, value, wait);
    await this.waitForAndClick(selectorInput);
    await page.keyboard.press('ArrowDown');
    await this.waitForAndClick(selectorOption);
  }

  async setPromoCode(selectorInput, selectorButton, value) {
    await this.waitForAndSetValue(selectorInput, tab[value], 2000);
    await this.waitForAndClick(selectorButton, 2000);
  }

  async checkTotalPrice(selector, option = 'percent',wait=0) {
    await this.waitFor(wait);
    await page.$eval(selector, el => el.innerText).then((text) => {
      if (option === 'amount') {
        expect(text.split('€')[1]).to.be.equal(((tab["totalProducts"].split('€')[1] * 0.5) - 24).toPrecision(3).toString());
      } else {
        expect(text.split('€')[1]).to.be.equal(((tab["totalProducts"].split('€')[1] * 0.5) * 0.5).toPrecision(4).toString());
      }
    });
  }
}

module.exports = Discount;