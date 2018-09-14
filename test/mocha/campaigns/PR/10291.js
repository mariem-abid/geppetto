const authentication = require('../common_scenarios/authentication');
const {Menu} = require('../../selectors/BO/menu');
const {Categories} = require('../../selectors/BO/catalog/categories');


scenario('This scenario is based on the bug described on his PR: https://github.com/PrestaShop/PrestaShop/pull/10291', client => {
  authentication.signInBO('9475');
  scenario('Check if the textarea of the meta description is correctly displayed', client => {
    test('should go to "Categories" page', async() => {
      await client.waitForAndClick(Menu.Sell.Catalog.catalog_menu);
      await client.waitForAndClick(Menu.Sell.Catalog.category_submenu, 1000);
    });
    test('should click on "Home edit" button', () => client.waitForAndClick(Categories.edit_home_button));
    test('should get the bounding box of "meta title input group"', () => client.getBoundingBox(Categories.input_group.replace('%D', 6), 1000, 'metaTitleInput'));
    test('should get the bounding box of "meta description input', () => client.getBoundingBox(Categories.input_group.replace('%D', 7), 1000, 'metaTitleInput'));
    test('should Check if the textarea of the meta description is correctly displayed', async() => {
      global.tab['metaTitleInput'].width === global.tab['metaTitleInput'].width ? global.correctlyDisplayed = true : global.correctlyDisplayed = false;
      await expect(global.correctlyDisplayed).to.be.true;
    });
  }, 'common_client');
  authentication.signOutBO();
}, 'common_client', true);
