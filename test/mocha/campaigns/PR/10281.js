const authentication = require('../common_scenarios/authentication');
const {Menu} = require('../../selectors/BO/menu');
const {LogsPage} = require('../../selectors/BO/advancedParameters/logsPage');

/** This scenario is based on the bug described in this PR
 * https://github.com/PrestaShop/PrestaShop/pull/10281
 */

scenario('This scenario is based on the bugs described on this PR: https://github.com/PrestaShop/PrestaShop/pull/10281', client => {
  authentication.signInBO('10281');
  scenario('Check if the checkbox before each line does not exist', client => {
    test('should go to "Logs" page', async() => {
      await client.waitForAndClick(Menu.Configure.AdvancedParameters.advanced_parameters_menu, 1000);
      await client.waitForAndClick(Menu.Configure.AdvancedParameters.logs_submenu, 3000);
    });
    for (let i = 0; i < 2; i++) {
      test('should check if the first and the second checkboxes are not exist', () => client.isNotExisting(LogsPage.Logs.checkbox.replace('%D', i + 1), 1000));
    }
  }, 'common_client');
  scenario('Erase the Log list', client => {
    test('should erase the log list', async() => {
      await client.waitForAndClick(LogsPage.Logs.settings);
      await client.confirmationDialog();
      await client.waitForAndClick(LogsPage.Logs.erase_button);
    });
    test('should check that the log list is well deleted', () => client.checkTextValue(LogsPage.Logs.no_records_found, 'No records found'));
  }, 'common_client');
  scenario('check if the label and the field are aligned', client => {
    test('should get the bounding box of the label "Minimum severity level"', () => client.getBoundingBox(LogsPage.LogsByEmail.logs_by_email_label, 1000, 'labelValues'));
    test('should get the bounding box of the field', () => client.getBoundingBox(LogsPage.LogsByEmail.logs_by_email_input, 1000, 'fieldValues'));
    test('should check if the label and the field are aligned', async() => {
      global.tab['fieldValues'].y <= global.tab['labelValues'].y <= (global.tab['fieldValues'].y + global.tab['fieldValues'].height) || global.tab['labelValues'].y <= global.tab['fieldValues'].y <= (global.tab['labelValues'].y + global.tab['labelValues'].height) ? global.aligned = true : global.aligned = false;
      await expect(global.aligned).to.be.true;
    });
  }, 'common_client');
}, 'common_client', true);
