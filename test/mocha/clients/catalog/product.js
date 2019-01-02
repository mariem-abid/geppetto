let CommonClient = require('../common_client');

class Product extends CommonClient {

  async getCombinationId(selector) {
    await this.waitFor(selector);
    const id = await page.$eval(selector, (el, attribute) => el.getAttribute(attribute), 'data');
    global.combinationId = id;
  }

  async selectFeature(addProduct, name, value, wait = 0) {
    await this.waitForAndClick(addProduct.Feature.feature_select);
    await this.clearInputAndSetValue(addProduct.Feature.select_feature_created, name, 1000);
    await this.waitForAndClick(addProduct.Feature.result_feature_select.replace('%ID', 0));
    await this.waitFor(2000);
    await this.selectByVisibleText(addProduct.Feature.feature_value_select, 'Feature Value');
  }
}

module.exports = Product;