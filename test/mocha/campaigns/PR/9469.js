const {ProductPageFO} = require('../../selectors/FO/productPage');
const {ShoppingCartPage} = require('../../selectors/FO/shoppingCartPage');

/** This scenario is based on the bug described in this PR
 * https://github.com/PrestaShop/PrestaShop/pull/9469
 */

scenario('Test PR-9469', client => {
  test('should open the browser', async() => {
    await client.open();
    await client.startTracing('9469');
  });
  test('shoud go to the Front office', () => client.openShopURL());
  test('should set the language of shop to "English"', () => client.switchShopLanguageInFo('en'));
  test('should go to the first product page', () => client.waitForAndClick(ProductPageFO.first_product));
  test('should click on "Product Details', () => client.waitForAndClick(ShoppingCartPage.product_details_button));
  test('should  check that "Specific References" does not appear', () => client.isNotExisting(ShoppingCartPage.specific_references));
}, 'common_client', true);
