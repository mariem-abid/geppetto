const authentication = require('../common_scenarios/authentication');
const product = require('../common_scenarios/catalog/product');
const {Catalog} = require('../../selectors/BO/catalog/products/catalog');
const {AddProduct} = require('../../selectors/BO/catalog/products/addProduct');
const {Menu} = require('../../selectors/BO/menu');

let productData = {
  name: 'P1',
  reference: 'P10233',
  quantity: '30',
  priceHT: '10',
  pictures: ['2.jpg']
};

/** This scenario is based on the bug described in this PR
 * https://github.com/PrestaShop/PrestaShop/pull/10233
 */

scenario('This scenario is based on the bugs described on this PR: https://github.com/PrestaShop/PrestaShop/pull/10233', client => {

  /**
   * This scenario is based on the bug described in this issue
   * https://github.com/PrestaShop/PrestaShop/issues/10231
   **/

  scenario('  This scenario is based on the bug described in this issue: https://github.com/PrestaShop/PrestaShop/issues/10231', client => {
    authentication.signInBO('10233');
    product.createProduct(productData);
    scenario('Search the created product in the Back Office', client => {
      product.searchProductInBo(productData.name + dateTime, client);
    }, 'common_client');
    scenario('Change the status of the created product in the list product page', client => {
      test('should disable the created product', () => client.waitForAndClick(Catalog.product_status_icon.replace("%NUMBER", 1).replace("%D", "enabled")));
      test('should check that the created product is well updated', () => client.checkTextValue(Catalog.green_validation, 'close\nProduct successfully deactivated.\n\n'));
      test('should click on "Reset" button', () => client.waitForAndClick(Catalog.reset_button));
    }, 'common_client');
    scenario('Delete the created product', client => {
      product.deleteProductInBo(client);
    }, 'common_client');
  }, 'common_client');

  /**
   * This scenario is based on the bug described in this issue
   * https://github.com/PrestaShop/PrestaShop/issues/10224
   **/

  scenario('  This scenario is based on the bug described in this issue: https://github.com/PrestaShop/PrestaShop/issues/10224', client => {
    scenario('Duplicate the first product', client => {
      test('should click on the "dropdown" icon', () => client.waitForAndClick(Catalog.dropdown_toggle.replace("%D", 1), 1000));
      test('should click on the "Duplicate" icon', () => client.waitForAndClick(Catalog.duplicate_button.replace("%D", 1)));
      test('should check that the product is well duplicate ', async() => {
        await client.checkAttributeValue(AddProduct.Basic_settings.name_input, 'value', 'copy', 'contain', 1000)
        await client.waitForAndClick(Menu.Sell.Catalog.products_submenu, 2000);
      });
    }, 'common_client');
    scenario('Search the duplicate product in the Back Office', client => {
      product.searchProductInBo('copy', client);
    }, 'common_client');
    scenario('Delete the duplicate product', client => {
      product.deleteProductInBo(client);
      test('should click on "Reset" button', () => client.waitForAndClick(Catalog.reset_button));
    }, 'common_client');
  }, 'common_client');
  
}, 'common_client', true);
