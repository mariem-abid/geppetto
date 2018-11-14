const authentication = require('../common_scenarios/authentication');
const {Menu} = require('../../selectors/BO/menu');
const {Localisation} = require('../../selectors/BO/improve/international/localizationPage');
const {CommonBO} = require('../../selectors/BO/commonBO');
const {HomePage} = require('../../selectors/FO/homePage');
const {ProductPageFO} = require('../../selectors/FO/productPage');


/** This scenario is based on the bug described in this PR
 * https://github.com/PrestaShop/PrestaShop/pull/11261
 */

scenario('This scenario is based on the bugs described on this PR: https://github.com/PrestaShop/PrestaShop/pull/11261', () => {
  authentication.signInBO('11261');
  scenario('Import the Spain pack', client => {
    test('should go to "Localization" page', async () => {
      await client.waitForAndClick(Menu.Improve.International.international_menu);
      await client.waitForAndClick(Menu.Improve.International.localization_submenu, 1000);
    });
    test('should choose the "Spain" pack ', () => client.waitForAndSelect(Localisation.LocalisationPage.impost_localization_pack_select, 'es', 2000));
    test('should click on "Import" buton ', () => client.waitForAndClick(Localisation.LocalisationPage.import_button));
    test('should check that the Spain pack is well imported ', async () => {
      await client.waitFor(1000, {waitUntil: 'load'});
      await client.checkTextValue(Localisation.LocalisationPage.alert_text, 'Localization pack imported successfully.');
    });
  }, 'common_client');
  scenario('Go to the Front Office and check the default language after the redirection to the home page from the product page', client => {
    test('should go to the Front Office', () => client.accessToFO(CommonBO.shopname_link, 1, 6000));
    test('should set the language of shop to "Español', async () => {
      await client.waitForAndClick(HomePage.language_selector);
      await client.waitForAndClick(HomePage.language_ES);
    });
    test('should get the URL', () => client.getBaseUrl('url'));
    test('should go to the product page', () => client.waitForAndClick(ProductPageFO.first_product));
    test('should go back to the Home page', () => client.waitForAndClick(HomePage.logo_home_page));
    test('should check that the language of the Front Office does not change', () => client.checkURL(global.tab['url']));
    test('should back to the Back Office', async () => {
      await client.closeWindow();
      await client.switchWindow(0);
    });
  }, 'common_client');
  authentication.signOutBO();
}, 'common_client', true);