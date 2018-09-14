const {Menu} = require('../../../selectors/BO/menu');
const {CustomerSettings} = require('../../../selectors/BO/shopParameters/customerSettings');
module.exports = {
  async enableAndDisableB2BMode(isEnable = false) {
    scenario((isEnable ? 'Disable' : 'Enable') + ' the "Offer gift wrapping"', client => {
      test('should go to "Customer Settings" page', async() => {
        await client.waitForAndClick(Menu.Configure.ShopParameters.shop_parameters_menu);
        await client.waitForAndClick(Menu.Configure.ShopParameters.customer_settings_submenu, 1000);
      });
      if (isEnable) {
        test('should disable "B2B mode" ', () => client.waitForAndClick(CustomerSettings.Customers.enable_B2B_mode.replace('%D', '0'), 2000));
      }
      else {
        test('should enable "B2B mode" ', () => client.waitForAndClick(CustomerSettings.Customers.enable_B2B_mode.replace('%D', '1'), 2000));
      }
      test('should click on "Save" button ', () => client.waitForAndClick(CustomerSettings.Customers.save_button));
      test('should check that the B2B mode is well updated" ', () => client.checkTextValue(CustomerSettings.Customers.green_validation,'Update successful'));

    }, 'common_client');
  }
}
