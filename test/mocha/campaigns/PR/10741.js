const authentication = require('../common_scenarios/authentication');
const importScenario = require('../common_scenarios/advancedParameters/import');
const {Menu} = require('../../selectors/BO/menu');
const {ImportPage} = require('../../selectors/BO/configure/advancedParameters/importPage');


/** This scenario is based on the bug described in this PR
 * https://github.com/PrestaShop/PrestaShop/pull/10741
 */

scenario('This scenario is based on the bugs described on this PR: https://github.com/PrestaShop/PrestaShop/pull/10741', () => {
  authentication.signInBO('10741');
  scenario('Check if the elements of the import page are well aligned', client => {
    test('should go to "Import" page', async() => {
      await client.waitForAndClick(Menu.Configure.AdvancedParameters.advanced_parameters_menu, 1000);
      await client.waitForAndClick(Menu.Configure.AdvancedParameters.import_submenu, 3000);
    });
    test('should get the bounding box of "alert info"', () => client.getBoundingBox(ImportPage.alert_info, 1000, 'alertInfo'));
    test('should get the bounding box of "custom select"', () => client.getBoundingBox(ImportPage.custom_select, 1000, 'customSelect'));
    test('should get the bounding box of "alert warning"', () => client.getBoundingBox(ImportPage.alert_warning, 1000, 'alertWarning'));
    test('should get the bounding box of "language of the file"', () => client.getBoundingBox(ImportPage.language_file_select, 1000, 'languageFileSelect'));
    test('should get the bounding box of "field separator"', () => client.getBoundingBox(ImportPage.field_separator_input, 1000, 'fieldSeparator'));
    test('should get the bounding box of "multiple value separator"', () => client.getBoundingBox(ImportPage.multiple_value_separator_input, 1000, 'multipleValueSeparator'));

    importScenario.checkAlignment('alert info', 'custom select', 'alertInfo', 'customSelect');
    importScenario.checkAlignment('alert info', 'language of the file', 'alertInfo', 'languageFileSelect');
    importScenario.checkAlignment('alert info', 'field separator', 'alertInfo', 'fieldSeparator');
    importScenario.checkAlignment('alert info', 'multiple value separator', 'alertInfo', 'multipleValueSeparator');
  }, 'common_client');
  authentication.signOutBO();
}, 'common_client', true);

