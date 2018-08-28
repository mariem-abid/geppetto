const multiStore = require('../common_scenarios/multiStore');
const order = require('../common_scenarios/orders/order');
const authentication = require('../common_scenarios/authentication');
const product = require('../common_scenarios/catalog/product');
const {Menu} = require('../../selectors/BO/menu');
const {OrderPage} = require('../../selectors/BO/orders/orderPage');
const {CommonBO} = require('../../selectors/BO/commonBO');
const {Dashboard} = require('../../selectors/BO/dashboardPage');
const {MultiStorePage} = require('../../selectors/BO/advancedParameters/multistorePage');

let shopData = {
  name: 'secondShop'
};
let productData = {
  name: 'P1',
  reference: 'PR123456789',
  quantity: "10",
  priceHT: '50',
  /*type: 'combination',
   combinationsQuantities: {
   firstQuantity: '300',
   secondQuantity: '200'
   }*/
};

/** This scenario is based on the bug described in this PR
 * https://github.com/PrestaShop/PrestaShop/pull/9145
 */

scenario('This scenario is based on the bugs described on this PR: https://github.com/PrestaShop/PrestaShop/pull/9145', client => {

  /**
   * This scenario is based on the bug described in this ticket
   * http://forge.prestashop.com/browse/BOOM-4050
   **/

  scenario('This scenario is based on the bug described on this BOOM: https://forge.prestashop.com/browse/BOOM-4050', client => {
    scenario('Open the browser and login in the BackOffice', client => {
      test('should open the browser and start tracing', async() => {
        await client.open();
        await client.startTracing('9145');
      });
      test('should go to the Back office', () => client.accessToBO());
      test('should login successfully in the Back office', () => client.signInBO());
    }, 'common_client');
    multiStore.enableAndDisableMultistore();
    multiStore.createShop(shopData);
    scenario('Go to the Front Office', client => {
      test('should go to "Dashboard" page', () => client.waitForAndClick(Menu.dashboard_menu));
      test('should go to the "Front Office"', async() => {
        await client.waitForAndClick(CommonBO.multistore_link);
        await client.waitForAndClick(CommonBO.link_shop.replace('%D', 3));
        await client.switchWindow(1);
      });
      test('should set the language of shop to "English"', () => client.switchShopLanguageInFo('en'));
    }, 'common_client');
    order.createOrderFO();
    authentication.signOutFO();
    scenario('Change the status of the order to shipped in the multistore context', client => {
      test('should go back  to the Back office', async() => {
        await client.closeWindow();
        await client.switchWindow(0);
      });
      multiStore.switchToAllShops(client);
      test('should go to the orders page', async() => {
        await client.waitForAndClick(Menu.Sell.Orders.orders_menu, 2000);
        await client.waitForAndClick(Menu.Sell.Orders.orders_submenu, 1000);
      });
      test('should go to the created order', () => client.waitForAndClick(OrderPage.view_order_button.replace('%D', 1)));
      test('should change the status of the order to "shipped"', async() => {
        await client.waitForAndClick(OrderPage.choose_order_status);
        await client.waitForAndClick(OrderPage.order_status.replace('%D', 13), 1000);
      });
      test('should click on "UPDATE STATUS" button', () => client.waitForAndClick(OrderPage.update_status_button));
      test('should check that the status is well updated', () => client.checkTextValue(OrderPage.check_order_status.replace('%D', 1), 'Shipped'));
    }, 'common_client');
  }, 'common_client');

  /**
   * This scenario is based on the bug described in this ticket
   * http://forge.prestashop.com/browse/BOOM-3495
   **/

  scenario('This scenario is based on the bug described on this BOOM: https://forge.prestashop.com/browse/BOOM-3495', client => {
    scenario('Enable share available quantities between group stores', client => {
      test('should go to "Multistore" page', async() => {
        await client.waitForAndClick(Menu.Configure.AdvancedParameters.advanced_parameters_menu, 2000);
        await client.waitForAndClick(Menu.Configure.AdvancedParameters.multistore_submenu, 2000);
      });
      multiStore.enableAndDisableShareAvailableQuantites(client);
    }, 'common_client');
    product.createProduct(productData);
    scenario('Disable share available quantities between group stores', client => {
      test('should go to "Multistore" page', async() => {
        await client.waitForAndClick(Menu.Configure.AdvancedParameters.advanced_parameters_menu, 2000);
        await client.waitForAndClick(Menu.Configure.AdvancedParameters.multistore_submenu, 2000);
      });
      multiStore.enableAndDisableShareAvailableQuantites(client, isEnable = true);
    }, 'common_client');
    scenario('Delete the created shop', client => {
      multiStore.deleteCreatedShop(shopData, client);
    }, 'common_client');
    multiStore.enableAndDisableMultistore(isEnabled = true);
  }, 'common_client');

}, 'common_client', true);
