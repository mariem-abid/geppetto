const {HomePage} = require('../../../selectors/FO/homePage');
const {SearchProduct} = require('../../../selectors/FO/SearchPage');
const {ProductPageFO} = require('../../../selectors/FO/productPage');
const {CheckoutOrderPage} = require('../../../selectors/FO/order/checkoutOrderPage');
const authentication = require('../../common_scenarios/authentication');
const discount = require('../../common_scenarios/catalog/discount');
const product = require('../../common_scenarios/catalog/product');

let cartRuleData = [
  {
    name: 'Percent1 50%',
    customer_email: 'pub@prestashop.com',
    minimum_amount: '20',
    type: 'percent',
    reduction: '50',
    confirmationDialog: 'true'

  },
  {
    name: 'Percent2 50%',
    customer_email: 'pub@prestashop.com',
    minimum_amount: '20',
    type: 'percent',
    reduction: '50',
    confirmationDialog: 'false'
  },
  {
    name: 'Amount €20',
    customer_email: 'pub@prestashop.com',
    minimum_amount: '20',
    type: 'amount',
    reduction: '20',
    confirmationDialog: 'false'
  }
];

let productData = {
  name: 'PV',
  quantity: "50",
  priceHT: '20',
  pictures: [
    'image_test.jpg',
  ],
  reference: 'product for the voucher'
};

scenario('Create a new "Cart Rule" in the Back Office', () => {
  authentication.signInBO('discount');
  for (let i = 0; i < cartRuleData.length; i++) {
    discount.createCartRule(cartRuleData[i], 'codePromo' + (i + 1));
    discount.checkCartRule(cartRuleData[i], 'codePromo' + (i + 1));
  }
  authentication.signOutBO();
}, 'common_client', true);

scenario('Create product in the Back Office', () => {
  authentication.signInBO('discount');
  product.createProduct(productData);
  authentication.signOutBO();
}, 'common_client', true);

/**
 * This scenario is based on the bug described in this ticket
 * http://forge.prestashop.com/browse/BOOM-2518
 **/

scenario('Check the total price after applying vouchers in the Front Office', () => {
  authentication.openShop('discount');
  authentication.signInFO();
  scenario('Check the total price of the shopping cart', client => {
    test('should set the shop language to "English"', () => client.switchShopLanguageInFo('en'));
    test('should search for the product "A"', () => client.searchByValue(HomePage.search_input, HomePage.search_button, productData.name + global.dateTime));
    test('should go to the product page', () => client.waitForAndClick(SearchProduct.product_result_name));
    test('should set the "Quantity" input', () => client.waitForAndSetValue(ProductPageFO.quantity_wanted_input, 3));
    test('should click on "ADD TO CART" button', () => client.waitForAndClick(ProductPageFO.add_to_cart_button));
    test('should click on "PROCEED TO CHECKOUT" modal button', () => client.waitForAndClick(ProductPageFO.proceed_to_checkout_modal_button, 2000));
    test('should click on "Have a promo code?" link', () => client.waitForAndClick(CheckoutOrderPage.promo_code_link, 4000));
    test('should set the "Promo code" input', () => client.setPromoCode(CheckoutOrderPage.promo_code_input, CheckoutOrderPage.promo_code_add_button, 'codePromo1'));
    test('should click on "Have a promo code?" link', () => client.waitForAndClick(CheckoutOrderPage.promo_code_link, 4000));
    test('should set the "Promo code" input', () => client.setPromoCode(CheckoutOrderPage.promo_code_input, CheckoutOrderPage.promo_code_add_button, 'codePromo2'));
    test('should check the total price after reduction', async() => {
      await client.getTextInVar(CheckoutOrderPage.cart_subtotal_products, "totalProducts",1000);
      await client.getTextInVar(CheckoutOrderPage.cart_subtotal_discount, "totalDiscount",1000);
      await client.checkTotalPrice(CheckoutOrderPage.cart_total);
    });
    test('should click on "Remove voucher" button', () => client.waitForAndClick(CheckoutOrderPage.remove_voucher_button));
    test('should click on "Have a promo code?" link', () => client.waitForAndClick(CheckoutOrderPage.promo_code_link, 4000));
    test('should set the "Promo code" input', () => client.setPromoCode(CheckoutOrderPage.promo_code_input, CheckoutOrderPage.promo_code_add_button, 'codePromo3'));
    test('should check the total price after reduction (BOOM-2518)', async () => {
      await client.getTextInVar(CheckoutOrderPage.cart_subtotal_products, "totalProducts",1000);
      await client.getTextInVar(CheckoutOrderPage.cart_subtotal_discount, "totalDiscount",1000);
      await client.checkTotalPrice(CheckoutOrderPage.cart_total, 'amount',1000);
    });
  }, 'catalog/discount');
  authentication.signOutFO();
}, 'common_client',true);

scenario('Delete "Cart Rule" in the Back Office', () => {
  authentication.signInBO('discount');
  for (let i = 0; i < cartRuleData.length; i++) {
    discount.deleteCartRule(cartRuleData[i]);
  }
  authentication.signOutBO();
}, 'common_client', true);
