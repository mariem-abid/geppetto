let CommonClient = require('../common_client');

class Customer extends CommonClient {

  async searchByAddress(addresses, address) {
    if (global.visible) {
      await this.clearInputAndSetValue(addresses.addresses_filter_address_input_field, address);
      await this.keyboardPress('Enter');
      await this.waitFor(addresses.addresses_address_column.replace('%ROW', 1).replace('%COL', 5));
      await page.$eval(addresses.addresses_address_column.replace('%ROW', 1).replace('%COL', 5), el => el.innerText).then((text) => expect(text.trim).to.equal(("12 rue d'amsterdam" + address).trim));

    } else {
      await this.waitFor(addresses.addresses_address_column.replace('%ROW', 1).replace('%COL', 4));
      await page.$eval(addresses.addresses_address_column.replace('%ROW', 1).replace('%COL', 4), el => el.innerText).then((text) => expect(text.trim).to.equal(("12 rue d'amsterdam" + address).trim));
    }
  }
}

module.exports = Customer;