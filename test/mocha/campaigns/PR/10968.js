const authentication = require('../common_scenarios/authentication');
const preferences = require('../common_scenarios/shopParameters/preferences');
const multistore = require('../common_scenarios/advancedParameters/multistore');
const {Menu} = require('../../selectors/BO/menu');
const {PreferencesPage} = require('../../selectors/BO/shopParameters/preferences');

let shopData = {
  name: 'secondShop',
  virtual_url: 'secondShop'

};

/** This scenario is based on the bug described in this PR
 * https://github.com/PrestaShop/PrestaShop/pull/10968
 */

scenario('This scenario is based on the bugs described on this PR: https://github.com/PrestaShop/PrestaShop/pull/10968', () => {
  authentication.signInBO('10968');
  preferences.enableOrDisableMultistore();
  multistore.createShop(shopData);
  multistore.editUrlShopWithSearch(shopData);
  preferences.checkSelectorExistence(PreferencesPage.increase_front_office_security_disabled, 'not  able to configure in a single shop with Multistore is enabled');
  scenario('Go to the dashboard page and switch to "All shops', client => {
    test('should go to the dashboard page', () => client.waitForAndClick(Menu.dashboard_menu, 1000));
    multistore.switchToAllShops(client);
  }, 'common_client');
  preferences.checkSelectorExistence(PreferencesPage.increase_front_office_security_enabled, 'able to configure in "All shops" context');
  multistore.deleteShopWithSearch(shopData);
  preferences.enableOrDisableMultistore(true);
  scenario('Go to the dashboard page and switch to "All shops', client => {
    test('should go to the dashboard page', () => client.waitForAndClick(Menu.dashboard_menu, 1000));
  }, 'common_client');
  preferences.checkSelectorExistence(PreferencesPage.increase_front_office_security_enabled, 'able to configure in a single shop with Multistore is disabled');
  authentication.signOutBO();
}, 'common_client',true);
