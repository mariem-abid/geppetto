let CommonClient = require('../common_client');
const {AddProduct} = require('../../selectors/BO/catalog/products/addProduct');

class Product extends CommonClient {

  async getCombinationId(selector) {
    await this.waitFor(selector);
    const id = await page.$eval(selector, (el, attribute) => el.getAttribute(attribute), 'data');
    global.combinationId = id;
  }

  async setVariationsQuantity(value) {
    await this.waitFor(4000);
    await this.waitForAndSetValue(AddProduct.Combination.var_selected_quantitie, value);
    await this.waitForAndClick(AddProduct.Combination.save_quantitie_button, 1000);
  }
}

module.exports = Product;