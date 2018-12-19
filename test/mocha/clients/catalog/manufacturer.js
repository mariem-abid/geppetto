let CommonClient = require('../common_client');

class Manufacturer extends CommonClient {

  async addMetaKeywords(selector,wait = 0, options = {}) {
    await page.focus(selector);
    await this.waitForAndSetValue(selector,"key words");
    await this.waitFor(wait);
    await this.keyboardPress('Enter');
  }
}

module.exports = Manufacturer;