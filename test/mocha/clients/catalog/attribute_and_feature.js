let CommonClient = require('../common_client');

class AttributeAndFeature extends CommonClient {

  async clickOnAction(groupActionSelector, actionSelector, action = 'edit') {
    if (action === 'delete') {
      await this.waitForAndClick(groupActionSelector);
      await this.confirmationDialog();
      await this.waitForAndClick(actionSelector);
    } else {
      await this.waitForAndClick(groupActionSelector);
      await this.waitForAndClick(actionSelector);
    }
  }
}

module.exports = AttributeAndFeature;