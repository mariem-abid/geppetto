const authentication = require('../common_scenarios/authentication');
const product = require('../common_scenarios/catalog/product');

let productData = {
  name: 'Product',
  reference: 'P10856',
  quantity: '30',
  type: 'standard',
  priceHT: '10',
  pictures: [
    '1.png'
  ],
  options: {
    tags: 'tags'
  }
};
/** This scenario is based on the bug described in this PR
 * https://github.com/PrestaShop/PrestaShop/pull/10856
 */
scenario('This scenario is based on the bugs described on this PR: https://github.com/PrestaShop/PrestaShop/pull/10856', () => {

  authentication.signInBO('10856');
  product.createProduct(productData);
  authentication.signOutBO();
}, 'common_client', true);
