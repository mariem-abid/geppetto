const authentication = require('../common_scenarios/authentication');
const {Menu} = require('../../selectors/BO/menu');
const {Pages} = require('../../selectors/BO/improve/design/pages');

scenario('This scenario is based on the bug described on his PR: https://github.com/PrestaShop/PrestaShop/pull/9475', client => {
  authentication.signInBO('9475');
  scenario('Check the existence of the label and the input of the "Title"', client => {
    test('should go to "Design > Pages" page', async() => {
      await client.waitForAndClick(Menu.Improve.Design.design_menu);
      await client.waitForAndClick(Menu.Improve.Design.pages_submenu, 1000);
    });
    test('should click on "Add new page"', () => client.waitForAndClick(Pages.add_new_page_button));
    test('should check the existence of the label and the input of the "Title"', async() => {
      await client.isExisting(Pages.title_label);
      await client.isExisting(Pages.title_input);
    });
  }, 'common_client');
  authentication.signOutBO();
}, 'common_client',true);
