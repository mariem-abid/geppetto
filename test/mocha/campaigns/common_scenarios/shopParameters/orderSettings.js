const {Menu} = require('../../../selectors/BO/menu');
const {OrderSettings} = require('../../../selectors/BO/shopParameters/orderSettings');

module.exports = {
  async enableAndDisableGiftWrapping(isEnable = false) {
    scenario((isEnable ? 'Disable' : 'Enable') + ' the "Offer gift wrapping"', client => {
      test('should go to "Order Settings" page', async() => {
        await client.waitForAndClick(Menu.Configure.ShopParameters.shop_parameters_menu);
        await client.waitForAndClick(Menu.Configure.ShopParameters.order_settings_submenu, 1000);
      });
      if (isEnable) {
        test('should disable "Offer gift wrapping" ', () => client.waitForAndClick(OrderSettings.GiftOptions.offer_gift_wrapping.replace('%D', '0'), 2000));
        test('should click on "Save" button ', () => client.waitForAndClick(OrderSettings.GiftOptions.save_button));
      }
      else {
        test('should enable "Offer gift wrapping" ', () => client.waitForAndClick(OrderSettings.GiftOptions.offer_gift_wrapping.replace('%D', '1'), 2000));
        test('should set "Gift-wrapping price" input ', () => client.clearInputAndSetValue(OrderSettings.GiftOptions.gift_wrapping_price_input, '3'));
        test('should click on "Save" button ', () => client.waitForAndClick(OrderSettings.GiftOptions.save_button));
        test('should go to "Dashboard" page', () => client.waitForAndClick(Menu.dashboard_menu));
      }
    }, 'common_client');
  }
}
