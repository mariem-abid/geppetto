const {Dashboard} = require('../../selectors/BO/dashboardPage');
const {HomePage} = require('../../selectors/FO/homePage');
const {ProductPageFO} = require('../../selectors/FO/productPage');
const {ShoppingCartPage} = require('../../selectors/FO/shoppingCartPage');
const {ShoppingCart} = require('../../selectors/BO/orderPage');
const {Menu} = require('../../selectors/BO/menu');

scenario('Test: PR-8977', client => {
  scenario('Login in the Back Office', client => {
    test('should open the browser', async () => {
      await client.open();
      await client.startTracing('9405');
    });
    test('shoud go to the Back office', () => client.accessToBO());
    test('shoud login successfully in the Back office', () => client.signInBO());
  }, 'common_client');
  scenario('Add products to the cart in the Front Office', () => {
    scenario('Go to the Front Office', client => {
      test('should go to the "Front Office"', async () => {
        await client.waitForAndClick(Dashboard.shop_name);
        await client.switchWindow(1);
      });
      test('should set the language of shop to "English"', () => client.switchShopLanguageInFo('en'));
    }, 'common_client');
    scenario('Add products to the cart', client => {
      test('should go to the first product page', () => client.waitForAndClick(ProductPageFO.first_product));
      test('should click on "ADD TO CART" button', () => client.waitForAndClick(ShoppingCartPage.add_to_cart_button));
      test('should click on "CONTINUE SHOPPING" button', () => client.waitForAndClick(ShoppingCartPage.continue_shopping_button, 2000));
      test('should go to "Home" page', () => client.waitForAndClick(HomePage.logo_home_page, 1000));
      test('should go to the second product page', () => client.waitForAndClick(ProductPageFO.second_product));
      test('should click on "ADD TO CART" button', () => client.waitForAndClick(ShoppingCartPage.add_to_cart_button));
      test('should click on "CONTINUE SHOPPING" button', () => client.waitForAndClick(ShoppingCartPage.continue_shopping_button, 1000));
      test('should go to "Home" page', () => client.waitForAndClick(HomePage.logo_home_page, 1000));
    }, 'common_client');
  }, 'common_client');
  scenario('Delete an abandoned shopping cart', client => {
    test('should go back to the Back office', () => client.switchWindow(0));
    test('should go to "Shopping cart" page', async () => {
      await client.waitForAndClick(Menu.Sell.Orders.orders_menu);
      await client.waitForAndClick(Menu.Sell.Orders.shopping_carts_submenu);
    });
    test('should check that the cart is not ordered yet', () => client.checkTextValue(ShoppingCart.check_order_id, 'Non ordered'));
    test('should click on "Dropdown" button', () => client.waitForAndClick(ShoppingCart.dropdown_button));
    test('should accept the confirmation alert', () => client.alertAccept());
    test('should click on "Delete" action', () => client.waitForAndClick(ShoppingCart.delete_button));
    test('should verify the appearance of the green validation', () => client.checkTextValue(ShoppingCart.success_panel, '× Successful deletion.'));
  }, 'common_client');
  scenario('Create a new order from the Front Office', client => {
    test('should go back to the Front office', () => {
      return promise
        .then(() => client.switchWindow(1))
    });
    commonOrder.createOrderFO();
  }, 'order');
}, 'common_client');

