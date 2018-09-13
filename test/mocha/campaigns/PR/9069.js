const authentication = require('../common_scenarios/authentication');
const order = require('../common_scenarios/orders/order');
const orderSettings = require('../common_scenarios/shopParameters/orderSettings');
const {CommonBO} = require('../../selectors/BO/commonBO');


/** This scenario is based on the bug described in this PR
 * https://github.com/PrestaShop/PrestaShop/pull/9069
 */

scenario('This scenario is based on the bugs described on this PR: https://github.com/PrestaShop/PrestaShop/pull/9069', client => {
  authentication.signInBO('9069');

  /**
   * This scenario is based on the bug described in this ticket
   * http://forge.prestashop.com/browse/BOOM-5328
   **/

  scenario('This scenario is based on the bug described on this issue: http://forge.prestashop.com/browse/BOOM-5328', client => {
    orderSettings.enableAndDisableGiftWrapping();
    scenario('Check the price of the gift wrapping', client => {
      scenario('Go to the Front Office', client => {
        test('should go to the Front Office', () => client.accessToFO(CommonBO.shopname_link, 1, 4000));
        test('should set the language of shop to "English"', () => client.switchShopLanguageInFo('en'));
      }, 'common_client');
      order.createOrderFO(giftWrapping = true);
      scenario('Go back to the Back Office', client => {
        test('should go back  to the Back office', async() => {
          await client.closeWindow();
          await client.switchWindow(0);
        });
      }, 'common_client');
      orderSettings.enableAndDisableGiftWrapping(isEnabled = true);
    }, 'common_client');
  }, 'common_client');

  authentication.signOutBO();
}, 'common_client', true);
