const authentication = require('../common_scenarios/authentication');
const {Menu} = require('../../selectors/BO/menu');
const {InformationPage} = require('../../selectors/BO/advancedParameters/information');


/** This scenario is based on the bug described in this PR
 * https://github.com/PrestaShop/PrestaShop/pull/9198
 */

scenario('This scenario is based on the bugs described on this PR: https://github.com/PrestaShop/PrestaShop/pull/9198', () => {
  authentication.signInBO('9198');
  scenario('Check that the "Information" page is well opened', client => {
    test('should go to "Catalog" page', async() => {
      await client.waitForAndClick(Menu.Configure.AdvancedParameters.advanced_parameters_menu);
      await client.waitForAndClick(Menu.Configure.AdvancedParameters.information_submenu, 1000);
    });
      test('should check that the "Information" page is well opened', () => client.checkTextValue(InformationPage.title_page,'Information','equal', 2000));
  }, 'common_client');
  authentication.signOutBO();
}, 'common_client',true);
