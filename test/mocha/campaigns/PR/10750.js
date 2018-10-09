const authentication = require('../common_scenarios/authentication');
const product = require('../common_scenarios/catalog/product');
const {Menu} = require('../../selectors/BO/menu');
const {AddProduct} = require('../../selectors/BO/catalog/products/addProduct');
const {Catalog} = require('../../selectors/BO/catalog/products/catalog');
const {CommonBO} = require('../../selectors/BO/commonBO');
const {ProductPageFO} = require('../../selectors/FO/productPage');

let productData = [{
  name: 'SimpleProduct',
  quantity: '10',
  priceHT: '20',
  pictures: '1.png'
}, {
  name: 'CombinationProduct',
  reference: 'P10750',
  pictures: '2.jpg',
  referenceFirstCombination: 'First combination',
  referenceSecondCombination: 'Second combination'
}];
scenario('This scenario is based on the bugs described on this PR: https://github.com/PrestaShop/PrestaShop/pull/10750', () => {

  /**
   * This scenario is based on the bug described in this ticket
   * https://github.com/PrestaShop/PrestaShop/issues/10749
   **/

  scenario('This scenario is based on the bug described on this issue: https://github.com/PrestaShop/PrestaShop/issues/10749', () => {
    authentication.signInBO('10750');
    scenario('Create a simple product without reference', client => {
      test('should go to "Catalog" page', async() => {
        await client.waitForAndClick(Menu.Sell.Catalog.catalog_menu);
        await client.waitForAndClick(Menu.Sell.Catalog.products_submenu, 1000);
      });
     test('should click on "New product" button', () => client.waitForAndClick(Catalog.add_new_button, 2000));
      test('should set the "Name" input', () => client.waitForAndType(AddProduct.Basic_settings.name_input, productData[0].name + global.dateTime));
       test('should set the "Quantity" input', () => client.clearInputAndSetValue(AddProduct.Basic_settings.quantity_input, productData[0].quantity, 2000));
      test('should set the "Price" input', () => client.clearInputAndSetValue(AddProduct.Basic_settings.price_input, productData[0].priceHT));
       test('should upload the product picture', () => client.uploadFile(AddProduct.Basic_settings.files_input, dataFileFolder, productData[0].pictures));
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
       scenario('Go to the Front Office and check if the "Reference" is not displayed', client => {
     test('should click on "Preview" button', () => client.waitForAndClick(AddProduct.preview_button));
     test('should click on "Preview" link', async() => {
     await client.switchWindow(1);
     await client.waitForAndClick(AddProduct.preview_link);
     });
     test('should check if the "Reference" is not displayed', () => client.isNotExisting(ProductPageFO.product_reference_label));
     }, 'common_client');
     product.backToBoAndDeleteProduct('first');
     }, 'common_client');


  /**
   * This scenario is based on the bug described in this ticket
   * https://github.com/PrestaShop/PrestaShop/issues/10809
   **/

  scenario('This scenario is based on the bug described on this issue: https://github.com/PrestaShop/PrestaShop/issues/10809', () => {
    scenario('Create a product with combinations and each one have a specific reference', client => {
      test('should click on "New product" button', () => client.waitForAndClick(Catalog.add_new_button, 2000));
      test('should set the "Name" input', () => client.waitForAndType(AddProduct.Basic_settings.name_input, productData[1].name + global.dateTime));
      test('should set the "Reference" input', () => client.waitForAndType(AddProduct.Basic_settings.reference_input, productData[1].reference));
      test('should select the "Product with combination" radio button', () => client.waitForAndClick(AddProduct.Basic_settings.combination_radio_button));
      test('should upload the product picture', () => client.uploadFile(AddProduct.Basic_settings.files_input, dataFileFolder, productData[1].pictures));
      test('should go to "Combinations" tab', () => client.waitForAndClick(AddProduct.quantity_combination_tab));
      test('should choose the combinations', async() => {
        await client.waitForAndClick(AddProduct.Combination.attribute_size_checkbox_button.replace('%ID', 1), 1000); // combination size s
        await client.waitForAndClick(AddProduct.Combination.attribute_size_checkbox_button.replace('%ID', 2), 1000); // combination size m
      });
      test('should click on "Generate" button', () => client.waitForAndClick(AddProduct.Combination.generate_combination_button, 3000));
      test('should verify the appearance of the green validation', async() => {
        await client.checkTextValue(AddProduct.validation_msg, 'Settings updated.');
        await client.waitForAndClick(AddProduct.close_validation_button);
      });
      test('should click on "Edit" icon for the first combination', async() => {
        await client.getCombinationId(AddProduct.Combination.combination_tr.replace('%POS', 1));
        await client.waitForAndClick(AddProduct.Combination.edit_combination_icon.replace('%ID', global.combinationId), 2000);
      });
      test('should set the "Reference" input for the first combination ', () => client.waitForAndType(AddProduct.Combination.reference_input.replace('%ID', global.combinationId), productData[1].referenceFirstCombination, 2000));
      test('should click on "Back to product" button', () => client.waitForAndClick(AddProduct.Combination.back_to_product_button.replace('%ID', global.combinationId)));
      test('should click on "Edit" icon for the second combination', async() => {
        await client.getCombinationId(AddProduct.Combination.combination_tr.replace('%POS', 2));
        await client.waitForAndClick(AddProduct.Combination.edit_combination_icon.replace('%ID', global.combinationId), 2000);
      });
      test('should set the "Reference" input for the second combination ', () => client.waitForAndType(AddProduct.Combination.reference_input.replace('%ID', global.combinationId), productData[1].referenceSecondCombination, 2000));
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
    }, 'catalog/product');
    scenario('Go to the Front Office and check the references of the combinations', client => {
      test('should click on "Preview" button', () => client.waitForAndClick(AddProduct.preview_button));
      test('should click on "Preview" link', async() => {
        await client.switchWindow(1);
        await client.waitForAndClick(AddProduct.preview_link);
      });
      test('should check the reference of the first combination', () => client.checkTextValue(ProductPageFO.product_reference_text, productData[1].referenceFirstCombination));
      test('should choose the size "M"', () => client.waitForAndSelect(ProductPageFO.combination_select,"2"));
      test('should check the reference of the second combination', () => client.checkTextValue(ProductPageFO.product_reference_text, productData[1].referenceSecondCombination));
    }, 'common_client');
    product.backToBoAndDeleteProduct('second');
  }, 'common_client');

  authentication.signOutBO();

}, 'common_client',true);