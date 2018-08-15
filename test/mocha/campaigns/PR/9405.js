const {ProductPage} = require('../../selectors/FO/productPage');
const {ShoppingCartPage} = require('../../selectors/FO/shoppingCartPage');

let quantity = '0';
scenario('Test: PR-9405', client => {
  test('should open the browser', async () => {
    await client.open();
    await client.startTracing('9405');
  });
  test('should go to the front office', () => client.accessToFo());
  test('should set the language of shop to "English"', () => client.switchShopLanguageInFo('en'));
  test('should go to the first product page', () => client.waitForAndClick(ProductPage.first_product));
  test('should set the quantity input by clicking on "arrow up button"', () => client.waitForAndClick(ShoppingCartPage.arrow_button_up));
  test('should click on "ADD TO CART" button', () => client.waitForAndClick(ShoppingCartPage.add_to_cart_button));
  test('should click on "PROCEED TO CHECKOUT" button', () => client.waitForAndClick(ShoppingCartPage.proceed_to_checkout_button, 2000, {visible: true}));
  test('should set the quantity equal to  "0"', async () => {
    await client.eval(ShoppingCartPage.quantity_input, quantity);
    await client.waitForAndClick(ShoppingCartPage.quantity_input);
    await client.keyboard('press', 'Enter');
  });
  test('should check that the quantity is equal to ' + quantity, () => client.checkTextValue(ShoppingCartPage.cart_products_count, quantity, 'contain', 2000));
  test('should click on the product name', () => client.waitForAndClick(ShoppingCartPage.product_name));
  test('should check the existence of the "block cart"', () => client.waitFor(ShoppingCartPage.block_cart, {
    timeout: 5000,
    visibility: true
  }));
}, 'common_client');
