const authentication = require('../common_scenarios/authentication');
const {Menu} = require('../../selectors/BO/menu');
const {CommonBO} = require('../../selectors/BO/commonBO');
const {Dashboard} = require('../../selectors/BO/dashboardPage');

/** This scenario is based on the bug described in this PR
 * https://github.com/PrestaShop/PrestaShop/pull/10949
 */
scenario('This scenario is based on the bugs described on this PR: https://github.com/PrestaShop/PrestaShop/pull/10949', () => {
  authentication.signInBO('10949');
  scenario('Check that the Help message header is correctly displayed in: Attributes & Features page, Brand & Suppliers page, Discounts page, Theme & logo page, Locations page, Taxes page, Contact page, Search page, and Team page', client => {
    scenario('Check that the Help message header is correctly displayed in "Attributes & Features" page', client => {
      test('should go to "Attributes & Features" page', async() => {
        await client.waitForAndClick(Menu.Sell.Catalog.catalog_menu);
        await client.waitForAndClick(Menu.Sell.Catalog.attributes_features_submenu, 1000);
      });
      test('should open the help message ', () => client.waitForAndClick(CommonBO.help_icon.replace('%D', 'help')));
      test('should check that the Help message header is correctly displayed ', () => client.isVisible(CommonBO.help_message_header, 2000));
      test('should close the help message ', () => client.waitForAndClick(CommonBO.help_icon.replace('%D', 'close'), 1000));
      test('should go to the Dashboard ', () => client.waitForAndClick(Menu.dashboard_menu));
    }, 'common_client');
    scenario('Check that the Help message header is correctly displayed in "Brand & Suppliers" page', client => {
      test('should go to "Brand & Suppliers" page', async() => {
        await client.waitForAndClick(Menu.Sell.Catalog.catalog_menu);
        await client.waitForAndClick(Menu.Sell.Catalog.manufacturers_submenu, 1000);
      });
      test('should open the help message ', () => client.waitForAndClick(CommonBO.help_icon.replace('%D', 'help')));
      test('should check that the Help message header is correctly displayed ', () => client.isVisible(CommonBO.help_message_header, 2000));
      test('should close the help message ', () => client.waitForAndClick(CommonBO.help_icon.replace('%D', 'close'), 1000));
      test('should go to the Dashboard ', () => client.waitForAndClick(Menu.dashboard_menu));
    }, 'common_client');
    scenario('Check that the Help message header is correctly displayed in "Discounts" page', client => {
      test('should go to "Discounts" page', async() => {
        await client.waitForAndClick(Menu.Sell.Catalog.catalog_menu);
        await client.waitForAndClick(Menu.Sell.Catalog.discounts_submenu, 1000);
      });
      test('should open the help message ', () => client.waitForAndClick(CommonBO.help_icon.replace('%D', 'help')));
      test('should check that the Help message header is correctly displayed ', () => client.isVisible(CommonBO.help_message_header, 2000));
      test('should close the help message ', () => client.waitForAndClick(CommonBO.help_icon.replace('%D', 'close'), 1000));
      test('should go to the Dashboard ', () => client.waitForAndClick(Menu.dashboard_menu));
    }, 'common_client');
    scenario('Check that the Help message header is correctly displayed in "Theme & logo page" page', client => {
      test('should go to "Theme & logo page" page', async() => {
        await client.waitForAndClick(Menu.Improve.Design.design_menu);
        await client.waitForAndClick(Menu.Improve.Design.theme_logo_submenu, 1000);
      });
      test('should open the help message ', () => client.waitForAndClick(CommonBO.help_icon.replace('%D', 'help')));
      test('should check that the Help message header is correctly displayed ', () => client.isVisible(CommonBO.help_message_header, 2000));
      test('should close the help message ', () => client.waitForAndClick(CommonBO.help_icon.replace('%D', 'close'), 1000));
      test('should go to the Dashboard ', () => client.waitForAndClick(Menu.dashboard_menu));
    }, 'common_client');
    scenario('Check that the Help message header is correctly displayed in "Locations" page', client => {
      test('should go to "Locations" page', async() => {
        await client.waitForAndClick(Menu.Improve.International.international_menu);
        await client.waitForAndClick(Menu.Improve.International.locations_submenu, 1000);
      });
      test('should open the help message ', () => client.waitForAndClick(CommonBO.help_icon.replace('%D', 'help')));
      test('should check that the Help message header is correctly displayed ', () => client.isVisible(CommonBO.help_message_header, 2000));
      test('should close the help message ', () => client.waitForAndClick(CommonBO.help_icon.replace('%D', 'close'), 1000));
      test('should go to the Dashboard ', () => client.waitForAndClick(Menu.dashboard_menu));
    }, 'common_client');
    scenario('Check that the Help message header is correctly displayed in "Taxes" page', client => {
      test('should go to "Taxes" page', async() => {
        await client.waitForAndClick(Menu.Improve.International.international_menu);
        await client.waitForAndClick(Menu.Improve.International.taxes_submenu, 1000);
      });
      test('should open the help message ', () => client.waitForAndClick(CommonBO.help_icon.replace('%D', 'help')));
      test('should check that the Help message header is correctly displayed ', () => client.isVisible(CommonBO.help_message_header, 2000));
      test('should close the help message ', () => client.waitForAndClick(CommonBO.help_icon.replace('%D', 'close'), 1000));
      test('should go to the Dashboard ', () => client.waitForAndClick(Menu.dashboard_menu));
    }, 'common_client');
    scenario('Check the visibility of the onboarding', client => {
      test('should close the "Onboarding" if exists', async() => {
        await client.isVisible(Dashboard.onbording_stop_button, 2000);
        if (global.visible) {
          await client.waitForAndClick(Dashboard.onbording_stop_button);
        }
      });
    }, 'common_client');
    scenario('Check that the Help message header is correctly displayed in "Contact" page', client => {
      test('should go to "Contact" page', async() => {
        await client.waitForAndClick(Menu.Configure.ShopParameters.shop_parameters_menu);
        await client.waitForAndClick(Menu.Configure.ShopParameters.contact_submenu, 1000);
      });
      test('should open the help message ', () => client.waitForAndClick(CommonBO.help_icon.replace('%D', 'help')));
      test('should check that the Help message header is correctly displayed ', () => client.isVisible(CommonBO.help_message_header, 2000));
      test('should close the help message ', () => client.waitForAndClick(CommonBO.help_icon.replace('%D', 'close'), 1000));
      test('should go to the Dashboard ', () => client.waitForAndClick(Menu.dashboard_menu));
    }, 'common_client');
    scenario('Check that the Help message header is correctly displayed in "Search" page', client => {
      test('should go to "Search" page', async() => {
        await client.waitForAndClick(Menu.Configure.ShopParameters.shop_parameters_menu);
        await client.waitForAndClick(Menu.Configure.ShopParameters.search_submenu, 1000);
      });
      test('should open the help message ', () => client.waitForAndClick(CommonBO.help_icon.replace('%D', 'help')));
      test('should check that the Help message header is correctly displayed ', () => client.isVisible(CommonBO.help_message_header, 2000));
      test('should close the help message ', () => client.waitForAndClick(CommonBO.help_icon.replace('%D', 'close'), 1000));
      test('should go to the Dashboard ', () => client.waitForAndClick(Menu.dashboard_menu));
    }, 'common_client');
    scenario('Check that the Help message header is correctly displayed in "Team" page', client => {
      test('should go to "Team" page', async() => {
        await client.waitForAndClick(Menu.Configure.AdvancedParameters.advanced_parameters_menu);
        await client.waitForAndClick(Menu.Configure.AdvancedParameters.team_submenu, 1000);
      });
      test('should open the help message ', () => client.waitForAndClick(CommonBO.help_icon.replace('%D', 'help')));
      test('should check that the Help message header is correctly displayed ', () => client.isVisible(CommonBO.help_message_header, 2000));
      test('should close the help message ', () => client.waitForAndClick(CommonBO.help_icon.replace('%D', 'close'), 1000));
    }, 'common_client');
  }, 'common_client');
  authentication.signOutBO();
}, 'common_client',true);