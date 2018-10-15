const authentication = require('../common_scenarios/authentication');
const {Menu} = require('../../selectors/BO/menu');
const {CommonBO} = require('../../selectors/BO/commonBO');
const {AddProduct} = require('../../selectors/BO/catalog/products/addProduct');
const {Catalog} = require('../../selectors/BO/catalog/products/catalog');
const {ProductPageFO} = require('../../selectors/FO/productPage');

let productData = {
  name: 'Product',
  reference: 'P10376',
  quantity: '30',
  priceHT: '10',
  pictures: '1.png',
  url: '123-456-789'
};
scenario('This scenario is based on the bugs described on this PR: https://github.com/PrestaShop/PrestaShop/pull/10376', () => {
  authentication.signInBO('10376');
  scenario('Create a simple product with an URL in the summary ', client => {
    test('should go to "Catalog" page', async() => {
      await client.waitForAndClick(Menu.Sell.Catalog.catalog_menu);
      await client.waitForAndClick(Menu.Sell.Catalog.products_submenu, 1000);
    });
    test('should click on "New product" button', () => client.waitForAndClick(Catalog.add_new_button, 2000));
    test('should set the "Name" input', () => client.waitForAndType(AddProduct.Basic_settings.name_input, productData.name + global.dateTime));
    test('should set the "Reference" input', () => client.waitForAndType(AddProduct.Basic_settings.reference_input, productData.reference));
    test('should set the "Quantity" input', () => client.waitForAndType(AddProduct.Basic_settings.quantity_input, productData.quantity, 2000));
    test('should set the "Price" input', () => client.clearInputAndSetValue(AddProduct.Basic_settings.price_input, productData.priceHT));
    test('should upload the product picture', () => client.uploadFile(AddProduct.Basic_settings.files_input, dataFileFolder, productData.pictures));
    test('should add a link in the summary', async() => {
      await client.waitForAndClick(AddProduct.tinymce_buttons.replace('%ID', '19'));
      await client.waitForAndType(AddProduct.TinymceLinkButtons.url_input, productData.url, 1000);
      await client.waitForAndClick(AddProduct.TinymceLinkButtons.confirm_button, 1000);
    });
    test('should close the symfony toolbar', async() => {
      await page.waitFor(2000);
      await client.isVisible(CommonBO.symfony_toolbar_close_button, 2000);
      if (global.visible) {
        await client.waitForAndClick(CommonBO.symfony_toolbar_close_button);
      }
    });
    test('should click on "Online"', () => client.waitForAndClick(AddProduct.online_switcher));
    test('should click on "Save" button', () => client.waitForAndClick(AddProduct.save_button));
    test('should check and close the green validation', async() => {
      await client.checkTextValue(AddProduct.validation_msg, 'Settings updated.');
      await client.waitForAndClick(AddProduct.close_validation_button);
    });
  }, 'common_client');
  scenario('Check that the description link is well created in the BO', client => {
    test('should check that the link is well created', () => client.checkTextEditor(AddProduct.summary_link_data, 'href="' + productData.url + '"', 1000));
  }, 'common_client');
  scenario('Go to the Front Office and check that the description link is well created in the FO', client => {
    test('should click on "Preview" button', () => client.waitForAndClick(AddProduct.preview_button));
    test('should click on "Preview" link', async() => {
      await client.switchWindow(1);
      await client.waitForAndClick(AddProduct.preview_link);
    });
    test('should check that the description link is well created in the FO', () => client.checkAttributeValue(ProductPageFO.product_description_link, 'href', productData.url, 1000));
  }, 'common_client');
  scenario('Go back to the Back Office', client => {
    test('should go back  to the Back Office "', async() => {
      await client.closeWindow();
      await client.switchWindow(0);
    });
    authentication.signOutBO();
  }, 'common_client');
}, 'common_client', true);
