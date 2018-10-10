const authentication = require('../common_scenarios/authentication');
const product = require('../common_scenarios/catalog/product');
const order = require('../common_scenarios/orders/order');
const {OrderPage} = require('../../selectors/BO/orders/orderPage');


let productData = {
  name: 'Product',
  reference: 'P9195',
  quantity: '30',
  priceHT: '10',
  pictures: [
    '1.png'
  ]
};
/** This scenario is based on the bug described in this PR
 * https://github.com/PrestaShop/PrestaShop/pull/9195
 */
scenario('This scenario is based on the bugs described on this PR: https://github.com/PrestaShop/PrestaShop/pull/10741', () => {
  authentication.signInBO('9195');
  product.createProduct(productData);
  order.createOrderBo(productData);
  scenario('Check if the quantity and the amount input are well aligned', client=> {
    test('should click on "Partial refund button"', () => client.waitForAndClick(OrderPage.partial_refund_button));
    test('should get the bounding box of "quantity" input', () => client.getBoundingBox(OrderPage.quantity_input, 1000, 'quantityInput'));
    test('should get the bounding box of "amount" input', () => client.getBoundingBox(OrderPage.amount_input, 1000, 'amountInput'));
    test('should the quantity and the amount input are well aligned', async() => {
      global.tab['quantityInput'].y === global.tab['amountInput'].y ? global.aligned = true : global.aligned = false;
      await expect(global.aligned).to.be.true;
    });
  }, 'common_client');
  authentication.signOutBO();
}, 'common_client', true);
