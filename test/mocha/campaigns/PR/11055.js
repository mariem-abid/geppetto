const authentication = require('../common_scenarios/authentication');
const {Menu} = require('../../selectors/BO/menu');
const {CommonBO} = require('../../selectors/BO/commonBO');
const {AddProduct} = require('../../selectors/BO/catalog/products/addProduct');
const {Catalog} = require('../../selectors/BO/catalog/products/catalog');
const {ProductPageFO} = require('../../selectors/FO/productPage');
const {HomePage} = require('../../selectors/FO/homePage');


let productData = {
  name: 'Product',
  reference: 'P11055',
  quantity: '50',
  priceHT: '10',
  pictures: '1.png',
  minimumQunatity: '10'
};

scenario('This scenario is based on the bugs described on this PR: https://github.com/PrestaShop/PrestaShop/pull/11055', () => {
  authentication.signInBO('11055');
  scenario('Create a simple product with a minimum quantity for sale', client => {
    test('should go to "Catalog" page', async () => {
      await client.waitForAndClick(Menu.Sell.Catalog.catalog_menu);
      await client.waitForAndClick(Menu.Sell.Catalog.products_submenu, 1000);
    });
    test('should click on "New product" button', () => client.waitForAndClick(Catalog.add_new_button, 2000));
    test('should set the "Name" input', () => client.waitForAndType(AddProduct.Basic_settings.name_input, productData.name + global.dateTime));
    test('should set the "Reference" input', () => client.waitForAndType(AddProduct.Basic_settings.reference_input, productData.reference));
    test('should set the "Quantity" input', () => client.clearInputAndSetValue(AddProduct.Basic_settings.quantity_input, productData.quantity, 2000));
    test('should set the "Price" input', () => client.clearInputAndSetValue(AddProduct.Basic_settings.price_input, productData.priceHT));
    test('should upload the product picture', () => client.uploadFile(AddProduct.Basic_settings.files_input, dataFileFolder, productData.pictures));
    test('should on "Quntities" link', () => client.waitForAndClick(AddProduct.quantity_combination_tab, 1000));
    test('should set the "Minimum quantity for sale" input', () => client.clearInputAndSetValue(AddProduct.Quantity.minimal_quantity_input, productData.minimumQunatity));
    test('should close the symfony toolbar', async () => {
      await page.waitFor(2000);
      await client.isVisible(CommonBO.symfony_toolbar_close_button, 2000);
      if (global.visible) {
        await client.waitForAndClick(CommonBO.symfony_toolbar_close_button);
      }
    });
    test('should click on "Online"', () => client.waitForAndClick(AddProduct.online_switcher));
    test('should click on "Save" button', () => client.waitForAndClick(AddProduct.save_button));
    test('should check and close the green validation', async () => {
      await client.checkTextValue(AddProduct.validation_msg, 'Settings updated.');
      await client.waitForAndClick(AddProduct.close_validation_button);
    });
  }, 'common_client');

  scenario('Go to the Front Office and check that the minimum quantity in quick view', client => {
    test('should go to the Front office', () => client.openShopURL());
    test('should go switch language to "English"', () => client.switchShopLanguageInFo('en'));
    test('should search for the created product', async () => {
      await client.waitForAndType(HomePage.search_input, productData.name + global.dateTime);
      await client.keyboardPress('Enter');
    });
    test('should click on "Quick view" button', async () => {
      await client.moveToElement(ProductPageFO.product_thumbnail.replace('%NAME', productData.name.toLowerCase() + global.dateTime), 'box', 2000);
      await client.waitForAndClick(ProductPageFO.quickView_button, 1000, {visibility: true});
    });
    test('should check the minimum quantity if it is equal to ' + productData.minimumQunatity, () => client.checkAttributeValue(ProductPageFO.quantity_wanted_input, 'value', productData.minimumQunatity, 'equal', 1000));
    test('should click on "Dropdown toggle" button', () => client.waitForAndClick(ProductPageFO.dropdown_toggle_button));
    test('should check the minimum quantity if it is equal to ' + productData.minimumQunatity + ' after the click', () => client.checkAttributeValue(ProductPageFO.quantity_wanted_input, 'value', productData.minimumQunatity, 'equal', 1000));
  }, 'common_client');

}, 'common_client', true);