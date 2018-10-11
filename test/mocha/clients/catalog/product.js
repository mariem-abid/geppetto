let CommonClient = require('../common_client');

class Product extends CommonClient {

  async getCombinationId(selector) {
    await this.waitFor(selector);
    const id = await page.$eval(selector, (el, attribute) => el.getAttribute(attribute), 'data');
    global.combinationId = id;
  }

  async addTags(selector, value, wait = 0, options = {}){
    await page.focus(selector);
    await this.waitForAndSetValue(selector, value);
    await this.waitFor(wait);
    await this.keyboardPress('Enter');
  }
}

module.exports = Product;