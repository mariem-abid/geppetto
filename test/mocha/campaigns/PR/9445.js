const {ProductPage} = require('../../selectors/BO/catalog/productsPage');
const {Menu} = require('../../selectors/BO/menu');
const {HomePage} = require('../../selectors/FO/homePage');
const {CommonBO} = require('../../selectors/BO/commonBO');
const {ProductPageFO} = require('../../selectors/FO/productPage');
const {ShoppingCartPage} = require('../../selectors/FO/shoppingCartPage');

let productData = {
  name: 'Product',
  reference: 'P9445',
  quantity: '10',
  price: '50'
};

/** This scenario is based on the bug described in this PR
 * https://github.com/PrestaShop/PrestaShop/pull/9433
 */

scenario('Test PR-9445', () => {
  scenario('Login in the Back Office', client => {
    test('should open the browser', async () => {
      await client.open();
      await client.startTracing('9445');
    });
    test('shoud go to the Back office', () => client.accessToBO());
    test('shoud login successfully in the Back office', () => client.signInBO());
  }, 'common_client');
  scenario('Create a new product in the Back Office', client => {
    test('should go to "Catalog" page', async () => {
      await client.waitForAndClick(Menu.Sell.Catalog.catalog_menu, 2000);
      await client.waitForAndClick(Menu.Sell.Catalog.products_submenu, 2000);
    });
    test('should click on "New product" button', () => client.waitForAndClick(ProductPage.new_product_button, 1000));
    test('should set the "Name" input', () => client.waitForAndType(ProductPage.product_name_input, productData.name + global.dateTime, 1000));
    test('should set the "Quantity" input', () => client.waitForAndType(ProductPage.quantity_input, productData.quantity, 1000));
    test('should set the "Reference" input', () => client.waitForAndType(ProductPage.product_reference, productData.reference, 1000));
    test('should set the "Price" input', () => client.waitForAndType(ProductPage.price_input, productData.price, 1000));
    test('should close the symfony toolbar', async () => {
      await page.waitFor(2000);
      const exist = await page.$(ProductPage.symfony_toolbar, {visible: true});
      if (exist !== null) {
        await page.click(ProductPage.symfony_toolbar);
      }
    });
    test('should switch the product "online"', () => client.waitForAndClick(ProductPage.product_online_toggle, 1000));
    test('should click on "Save" button', () => client.waitForAndClick(ProductPage.save_button, 1000));
    test('should verify the appearance of the green validation', () => client.checkTextValue(ProductPage.validation_msg, 'Settings updated.'));
    test('should close the green validation', () => client.waitForAndClick(ProductPage.close_validation_button, 4000));
  }, 'common_client');
  scenario('Order a product with the exact number of products available', client => {
    test('should go to the Front Office', () => client.accessToFO(CommonBO.shopname_link, 1));
    test('should set the language of shop to "English"', () => client.switchShopLanguageInFo('en'));
    test('should search for the created product', async () => {
      await client.waitForAndClick(HomePage.search_input, 2000);
      await client.waitForAndType(HomePage.search_input, productData.name + global.dateTime, 2000);
      await client.waitForAndClick(HomePage.search_button, 2000);
    });
    test('should go to the product page"', () => client.waitForAndClick(HomePage.product_result_name, 2000));
    test('should set the "Quantity" input', () => client.eval(ProductPageFO.quantity_input, 100, 1000));
    //test('should set the "Quantity" input', () => client.eval(ProductPageFO.quantity_input, productData.quantity, 1000));
    test('should click on "ADD TO CART" button', () => client.waitForAndClick(ShoppingCartPage.add_to_cart_button, 2000));
  }, 'common_client');
}, 'common_client', true);
