const authentication = require('../common_scenarios/authentication');
const customerSettings = require('../common_scenarios/shopParameters/customerSettings');
const {Menu} = require('../../selectors/BO/menu');
const {Outstanding} = require('../../selectors/BO/catalog/customers/outstanding');

scenario('This scenario is based on the bug described on his PR: https://github.com/PrestaShop/PrestaShop/pull/10295', client => {
  authentication.signInBO('10295');
  customerSettings.enableAndDisableB2BMode();
  scenario('Check the company name in outstanding orders', client => {
    test('should go to "Customer Settings" page', async() => {
      await client.waitForAndClick(Menu.Sell.Customers.customers_menu);
      await client.waitForAndClick(Menu.Sell.Customers.outstanding_submenu, 1000);
    });
    test('should check the company name in outstanding orders', () => client.isExisting(Outstanding.company_title, 1000));
  }, 'common_client');
  customerSettings.enableAndDisableB2BMode(isEnable = true);

}, 'common_client',true);
