let CommonClient = require('../common_client');
const {Catalog} = require('../../selectors/BO/catalog/products/catalog');

class CheckProductBO extends CommonClient {

  async searchProductByName(productName) {
    await this.clearInputAndSetValue(Catalog.filter_input.replace("%NAME", "name"), productName);
    await this.waitForAndClick(Catalog.submit_filter_button);
  }
}

module.exports = CheckProductBO;