const {HomePage} = require('../../../selectors/FO/homePage');
const {SearchProduct} = require('../../../selectors/FO/SearchPage');
const {ProductPageFO} = require('../../../selectors/FO/productPage');
const {AddProduct, ProductList} = require('../../../selectors/BO/catalog/products/addProduct');
const {CommonBO} = require('../../../selectors/BO/commonBO');
const {Menu} = require('../../../selectors/BO/menu');
const authentication = require('../../common_scenarios/authentication');
const product = require('../../common_scenarios/catalog/product');
const discount = require('../../common_scenarios/catalog/discount');

let productData = {
  name: 'SP',
  reference: 'Product with specific price',
  quantity: "10",
  priceHT: '5',
  pictures: [
    'image_test.jpg',
  ],
  pricing: {
    unitPrice: "10",
    unity: "1",
    wholesale: "5",
    type: 'percentage',
    discount: '19.6'
  }
};

let catalogPriceRule = {
  name: 'discount',
  type: "percentage",
  reduction: '19.666666'
};

/**
 * This scenario is based on the bug described in this ticket
 * http://forge.prestashop.com/browse/BOOM-3838
 **/

scenario('Create "Product"', () => {
  authentication.signInBO('discount');
  product.createProduct(productData);
  authentication.signOutBO();
}, 'common_client', true);


scenario('Check "Specific price"', () => {
  authentication.openShop('discount');
  authentication.signInFO();
  scenario('Check the created "Specific price" in the Front Office', client => {
    test('should set the shop language to "English"', () => client.switchShopLanguageInFo('en'));
    test('should search for the product', () => client.searchByValue(HomePage.search_input, HomePage.search_button, productData["name"] + global.dateTime));
    test('should verify that the discount is equal to "-19.6%" (BOOM-3838)', () => client.checkTextValue(SearchProduct.product_result_discount, '-19.6%', 'equal', 1000));
    test('should go to the product page', () => client.waitForAndClick(SearchProduct.product_result_name));
    test('should verify that the discount is equal to "-19.6%" (BOOM-3838)', () => client.checkTextValue(ProductPageFO.product_discount_details, 'SAVE 19.6%'));
    test('should click on "Add to cart" button  ', () => client.waitForAndClick(ProductPageFO.add_to_cart_button));
    test('should click on "Proceed to checkout" button', () => client.waitForAndClick(ProductPageFO.proceed_to_checkout_modal_button, 2000));
    test('should verify that the discount is equal to "-19.6%" (BOOM-3838)', () => client.checkTextValue(ProductPageFO.product_discount_details, '-19.6%', 'equal', 1000));
  }, 'common_client');
  authentication.signOutFO();
}, 'common_client', true);

scenario('Create "Catalog price rule"', () => {
  authentication.signInBO('discount');
  scenario('Delete the created specific price', client => {
    test('should go to "Products" page', () => client.goToSubtabMenuPage(Menu.Sell.Catalog.catalog_menu_link, Menu.Sell.Catalog.products_submenu_link));
    test('should close the symfony toolbar', async () => {
      await page.waitFor(2000);
      await client.isVisible(CommonBO.symfony_toolbar_close_button, 2000);
      if (global.visible) {
        await client.waitForAndClick(CommonBO.symfony_toolbar_close_button);
      }
    });
    test('should search for the created product', () => client.searchProductByName(productData["name"] + global.dateTime));
    test('should click on "Edit" button', () => client.waitForAndClick(ProductList.products_edit_link.replace('%ROW', 1)));
    test('should click on "Pricing" tab', () => client.waitForAndClick(AddProduct.Pricing.product_pricing_tab));
    test('should click on "Delete" button of specific price', async () => {
      await client.scrollIntoView(AddProduct.Pricing.products_delete_edit_specific_price_link.replace('%ROW', 1).replace('%COL', 11));
      await client.waitForAndClick(AddProduct.Pricing.products_delete_edit_specific_price_link.replace('%ROW', 1).replace('%COL', 11), 2000);
    });
    test('should click on "Yes" of modal button', () => client.waitForAndClick(AddProduct.Pricing.continue_confirmation, 1000));
    test('should verify the appearance of the green validation', () => client.checkTextValue(AddProduct.validation_msg, 'Successful deletion'));
    test('should click on "Save" button', () => client.waitForAndClick(AddProduct.save_button, 3000));
  }, 'catalog/checkProduct');
  discount.createCatalogPriceRules(catalogPriceRule["name"] + global.dateTime, catalogPriceRule["type"], catalogPriceRule["reduction"]);
  scenario('Logout from the Back Office', client => {
    test('should logout successfully from the Back Office', () => client.signOutBO());
  }, 'common_client');
}, 'common_client', true);

scenario('Check "Catalog price rule"', () => {
  authentication.openShop('discount');
  authentication.signInFO();
  scenario('Check the created "Catalog price rule" in the Front Office', client => {
    test('should set the shop language to "English"', () => client.switchShopLanguageInFo('en'));
    test('should search for the product', () => client.searchByValue(HomePage.search_input, HomePage.search_button, productData["name"] + global.dateTime));
    test('should verify that the discount is equal to "-19.67%" (BOOM-3838)', () => client.checkTextValue(SearchProduct.product_result_discount, '-19.67%'));
    test('should go to the product page', () => client.waitForAndClick(SearchProduct.product_result_name));
    test('should verify that the discount is equal to "-19.67%" (BOOM-3838)', () => client.checkTextValue(ProductPageFO.product_discount_details, 'SAVE 19.67%'));
    test('should click on "Add to cart" button  ', () => client.waitForAndClick(ProductPageFO.add_to_cart_button));
    test('should click on "Proceed to checkout" button', () => client.waitForAndClick(ProductPageFO.proceed_to_checkout_modal_button, 2000));
    test('should verify that the discount is equal to "-19.67%" (BOOM-3838)', () => client.checkTextValue(ProductPageFO.product_discount_details, '-19.67%'));
  }, 'common_client');
  authentication.signOutFO();
}, 'common_client', true);

scenario('Delete "Catalog price rule"', () => {
  authentication.signInBO('discount');
  discount.deleteCatalogPriceRules(catalogPriceRule["name"] + global.dateTime);
  authentication.signOutBO();
}, 'common_client', true);
