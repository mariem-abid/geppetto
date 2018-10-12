const authentication = require('../common_scenarios/authentication');
const trafficAndSeo = require('../common_scenarios/shopParameters/trafficAndSeo');
const {Dashboard} = require('../../selectors/BO/dashboardPage');
const {CommonBO} = require('../../selectors/BO/commonBO');
const {HomePage} = require('../../selectors/FO/homePage');
const {ProductPageFO} = require('../../selectors/FO/productPage');
const {Menu} = require('../../selectors/BO/menu');

/** This scenario is based on the bug described in this PR
 * https://github.com/PrestaShop/PrestaShop/pull/9214
 */

scenario('This scenario is based on the bugs described on this PR: https://github.com/PrestaShop/PrestaShop/pull/9214', () => {

  /**
   * This scenario is based on the bug described in this ticket
   * http://forge.prestashop.com/browse/BOOM-4847
   **/
  
  scenario('This scenario is based on the bug described on this BOOM: https://forge.prestashop.com/browse/BOOM-4847', () => {
    authentication.signInBO('9214');
    scenario('Check the visibility of the onboarding', client => {
      test('should close the "Onboarding" if exists', async() => {
        await client.isVisible(Dashboard.onbording_stop_button, 2000);
        if (global.visible) {
          await client.waitForAndClick(Dashboard.onbording_stop_button);
        }
      });
    }, 'common_client');
    trafficAndSeo.disableOrEnableFriendlyUrl(false);
    scenario('Go to the Front Office', client => {
      test('should go to the "Front Office"', async() => {
        await client.waitForAndClick(Menu.dashboard_menu);
        await client.waitForAndClick(CommonBO.shopname_link, 1000);
        await client.switchWindow(1);
      });
      test('should set the language of shop to "English"', () => client.switchShopLanguageInFo('en'));
    }, 'common_client');
    scenario('Navigate between pages in categories when the friendly url is disabled', client => {
      test('should click on "All products" link', () => client.waitForAndClick(HomePage.all_products_link));
      test('should click on "Next" pagination', async() => {
        await client.isVisible(ProductPageFO.next_pagination, 2000);
        if (global.visible) {
          await client.waitForAndClick(ProductPageFO.next_pagination);
        }
      });
      test('should check if the pagination between pages is done', () => client.checkURL('page=2', 1000));
    }, 'common_client');
    scenario('Go back to the Back Office', client => {
      test('should go back to the Back Office', async() => {
        await client.closeWindow();
        await client.switchWindow(0);
      });
    }, 'common_client');
    trafficAndSeo.disableOrEnableFriendlyUrl();
    authentication.signOutBO();
  }, 'common_client');
}, 'common_client', true);