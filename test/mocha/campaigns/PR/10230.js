const authentication = require('../common_scenarios/authentication');
const modulesCatalog = require('../common_scenarios/improve/modules/modulesCatalog');
const modulesManager = require('../common_scenarios/improve/modules/modulesManager');
const {Menu} = require('../../selectors/BO/menu');
const {Catalog} = require('../../selectors/BO/catalog/products/catalog');
const {ProductPageFO} = require('../../selectors/FO/productPage');
const {CommonBO} = require('../../selectors/BO/commonBO');


/** This scenario is based on the bug described in this PR
 * https://github.com/PrestaShop/PrestaShop/pull/10230
 */

scenario('This scenario is based on the bugs described on this PR: https://github.com/PrestaShop/PrestaShop/pull/10230', client => {
  authentication.signInBO('10230');

  scenario('Install the "ps_productinfo" module and go to "Products" page', client => {
    modulesCatalog.installModule('ps_productinfo');
    scenario('Go to "Products" page', client => {
      test('should go to "Products" page', async() => {
        await client.waitForAndClick(Menu.Sell.Catalog.catalog_menu);
        await client.waitForAndClick(Menu.Sell.Catalog.products_submenu, 1000);
      });
      test('should check that the "Products" page is well displayed ', () => client.isExisting(Catalog.add_new_button, 1000));
    }, 'common_client');
    modulesManager.uninstallModule('ps_productinfo');
  }, 'common_client');

  /**
   * This scenario is based on the bug described in this issue
   * https://github.com/PrestaShop/PrestaShop/issues/10259
   **/

  scenario('This scenario is based on the bug described on this issue: https://github.com/PrestaShop/PrestaShop/issues/10259', () => {
    modulesCatalog.installModule('ps_categoryproducts');
    scenario('Go to the Front Office and click on the first product', client => {
      test('should go to the Front Office', () => client.accessToFO(CommonBO.shopname_link, 1, 6000));
      test('should set the language of shop to "English"', () => client.switchShopLanguageInFo('en'));
      test('should go to the first product page', () => client.waitForAndClick(ProductPageFO.first_product));
      test('should check that the "First Product" page is well displayed ', () => client.isExisting(ProductPageFO.add_to_cart_button, 1000));
      test('should go back  to the Back office', async() => {
        await client.closeWindow();
        await client.switchWindow(0);
      });
    }, 'common_client');
    modulesManager.uninstallModule('ps_categoryproducts');
  }, 'common_client');

  authentication.signOutBO();
}, 'common_client', true);
