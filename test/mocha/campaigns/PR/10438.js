const customer = require('../common_scenarios/customers/customers');
const address = require('../common_scenarios/customers/addresses');
const {ProductPageFO} = require('../../selectors/FO/productPage');
const {CheckoutOrderPage} = require('../../selectors/FO/order/checkoutOrderPage');

let customerData = {
  first_name: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
  last_name: 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
  email_address: 'test@test.test',
  password: '123456789'
};

let addressData = {
  address: '12 rue d\'amsterdam',
  ZIP: '75009',
  city: 'Paris'
};

scenario('This scenario is based on the bug described on his PR: https://github.com/PrestaShop/PrestaShop/pull/10438', () => {
  scenario('Go to the Front Office', client => {
    test('should open the browser', async() => {
      await client.open();
      await client.startTracing('10438');
    });
    test('should go to the Front office', () => client.openShopURL());
    test('should set the language of shop to "English"', () => client.switchShopLanguageInFo('en'));
  }, 'common_client');
  customer.createCustomerFO(customerData);
  scenario('Add article to cart and go to checkout', client => {
    test('should go to the first product page', () => client.waitForAndClick(ProductPageFO.first_product));
    test('should click on "ADD TO CART" button', () => client.waitForAndClick(ProductPageFO.add_to_cart_button));
    test('should click on proceed to checkout button 1', () => client.waitForAndClick(ProductPageFO.proceed_to_checkout_modal_button, 2000));
    test('should click on proceed to checkout button 2', () => client.waitForAndClick(CheckoutOrderPage.proceed_to_checkout_button));
  }, 'common_client');
  address.createAddressFO(addressData);
  scenario('Check thaT "SHIPPING METHOD" page is well opened', client => {
    test('should check thaT "SHIPPING METHOD" page is well opened', () => client.isExisting(CheckoutOrderPage.checkout_step3_continue_button));
  }, 'common_client');
}, 'common_client', true);