let CommonClient = require('../common_client');

class AttributeAndFeature extends CommonClient {

  async clickOnAction(groupActionSelector, actionSelector, action = 'edit', confirmationDialog = false) {
    if (action === 'delete') {
      await this.waitForAndClick(groupActionSelector);
      if (confirmationDialog) {
        await this.confirmationDialog();
      }
      await this.waitForAndClick(actionSelector);
    } else {
      await this.waitForAndClick(groupActionSelector);
      await this.waitForAndClick(actionSelector);
    }
  }

  async checkAttributeValues(selector, textToCheckWith, wait = 0) {
    await this.waitFor(wait);
    await this.waitFor(selector);
    await page.$$eval(selector, el => {
      let elements = [];
      let i = el.length;
      for (let j = 0; j < i; j++) {
        elements[j] = el[j].innerText;
      }
      return elements;
    }).then((elements) =>
      expect(elements).to.deep.equal(textToCheckWith));
  }
}

module.exports = AttributeAndFeature;