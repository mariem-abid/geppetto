const authentication = require('../common_scenarios/authentication');
const customer = require('../common_scenarios/customers/customers');
const address = require('../common_scenarios/customers/addresses');
const order = require('../common_scenarios/orders/order');
const shoppingCarts = require('../common_scenarios/orders/shoppingCarts');

let customerData = [{
  first_name: 'test',
  last_name: 'test',
  email_address: 'test@test.test',
  pwd: '123456789'
}, {
  first_name: 'Test',
  last_name: 'Test',
  email_address: 'test@test.fr',
  pwd: '123456789'
}];


/** This scenario is based on the bug described in this PR
 * https://github.com/PrestaShop/PrestaShop/pull/11416
 */

scenario('This scenario is based on the bug described on this PR: https://github.com/PrestaShop/PrestaShop/pull/11416', () => {
  scenario('Check that "Shopping carts" page is well opened if the customer is deleted', client => {
    scenario('Create a customer and an order in the Front Office', client => {
      authentication.openShop('11416');
      scenario('Set the language of shop to "English"', client => {
        test('should set the language of shop to "English"', () => client.switchShopLanguageInFo('en'));
      }, 'common_client');
      customer.createCustomerFO(customerData[0]);
      order.createOrderFO("", login = customerData[0].email_address, pwd = customerData[0].pwd);
      authentication.signOutFO();
    }, 'common_client', true);
    scenario('Delete the created customer and check that "Shopping carts" page is well opened', client => {
      authentication.signInBO('11416');
      customer.deleteCustomerBO(customerData[0]);
      shoppingCarts.checkShoppingCartsPage();
    }, 'common_client');
    authentication.signOutBO();
  }, 'common_client', true);

  scenario('Check that "Shopping carts" page is well opened if the customer address is deleted', client => {
    scenario('Create a customer and an order in the Front Office', client => {
      authentication.openShop('11416');
      scenario('Set the language of shop to "English"', client => {
        test('should set the language of shop to "English"', () => client.switchShopLanguageInFo('en'));
      }, 'common_client');
      customer.createCustomerFO(customerData[1]);
      order.createOrderFO("", login = customerData[1].email_address, pwd = customerData[1].pwd);
      authentication.signOutFO();
    }, 'common_client', true);
    scenario('Delete the customer address and check that "Shopping carts" page is well opened', client => {
      authentication.signInBO('11416');
      address.deleteAddressBO(customerData[1]);
      shoppingCarts.checkShoppingCartsPage();
    }, 'common_client');
    authentication.signOutBO();
  }, 'common_client');
}, 'common_client', true);
