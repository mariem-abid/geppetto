const {HomePage} = require('../../selectors/FO/homePage');
const {OrderHistoryPage} = require('../../selectors/FO/order/orderHistoryPage');

/** This scenario is based on the bug described in this PR
 * https://github.com/PrestaShop/PrestaShop/pull/9367
 */

scenario('Test: PR-9367', client => {
  scenario('Login in the Front Office', client => {
    test('should open the browser', async () => {
      await client.open();
      await client.startTracing('9367');
    });
    test('shoud go to the Front office', () => client.openShopURL());
    test('should set the language of shop to "English"', () => client.switchShopLanguageInFo('en'));
    test('shoud login successfully in the Front office', () => client.signInFO());
    test('shoud click on "ORDER HISTORY AND DETAILS"', () => client.waitForAndClick(HomePage.order_history_and_details_button));
    test('shoud click on "DETAILS" button of the first order', () => client.waitForAndClick(OrderHistoryPage.details_button.replace('%P', 1).replace('%D', 1)));
    test('shoud check that the url contains the language', () => client.checkURL('en'));
    test('shoud logout successfully in the Front office', () => client.signOutFO());
  }, 'common_client');
}, 'common_client', true);
