const {Menu} = require('../../selectors/BO/menu');
const {AddProduct} = require('../../selectors/BO/catalog/products/addProduct');
const {Preferences} = require('../../selectors/BO/shopParameters/shopParameters');
const {MultiStorePage} = require('../../selectors/BO/advancedParameters/multistorePage');
const {Dashboard} = require('../../selectors/BO/dashboardPage');

module.exports = {
  async enableAndDisableMultistore(isEnabled = false) {
    scenario('Enable and disable shop in the Back Office', client => {
      test('should go to "Shop parameters" page', async() => {
        await client.waitForAndClick(Menu.Configure.ShopParameters.shop_parameters_menu, 2000);
        await client.waitForAndClick(Menu.Configure.ShopParameters.general_submenu, 2000);
      });
      test('should close the symfony toolbar', async() => {
        await page.waitFor(2000);
        const exist = await page.$(AddProduct.symfony_toolbar);
        if (exist !== null) {
          await page.click(AddProduct.symfony_toolbar);
        }
      });
      if (isEnabled) {
        test('should click on "No" button to disable multistore', () => client.waitForAndClick(Preferences.disable_multistore));
      } else {
        test('should click on "YES" button to disable multistore', () => client.waitForAndClick(Preferences.enable_multistore));
      }
      test('should click on "Save" button', () => client.waitForAndClick(Preferences.general_save_button));
      test('should verify the appearance of the green validation', () => client.checkTextValue(Preferences.success_box, "Successful update.", 'contain'));
    }, 'common_client');
  },
  async createShop(shopData) {
    scenario('Create a new Shop', client => {
      test('should go to "Multistore" page', async() => {
        await client.waitForAndClick(Menu.Configure.AdvancedParameters.advanced_parameters_menu, 2000);
        await client.waitForAndClick(Menu.Configure.AdvancedParameters.multistore_submenu, 2000);
      });
      test('should click on "Add a new shop" button', () => client.waitForAndClick(MultiStorePage.MultiStore.add_new_shop_button));
      test('should set the "Name" input', () => client.waitForAndType(MultiStorePage.Shop.shop_name_input, shopData.name, 2000));
      test('should click on "Save" button', () => client.waitForAndClick(MultiStorePage.Shop.save_button));
      test('should search the created shop', () => client.waitForAndType(MultiStorePage.Shop.search_shop_name_input, shopData.name));
      test('should click on "Search" button', () => client.waitForAndClick(MultiStorePage.Shop.search_button));
      test('should click on "Click here to set a URL for this shop." link', () => client.waitForAndClick(MultiStorePage.Shop.link_shop));
      test('should set the "Virtual URL" input', () => client.waitForAndType(MultiStorePage.ShopUrl.virtual_url_input, shopData.name));
      test('should click on "Save" button', () => client.waitForAndClick(MultiStorePage.ShopUrl.save_button));
      test('should click on "Reset" button', async() => {
        await client.waitForAndClick(MultiStorePage.MultistoreTree.shop_name.replace('%D', 1));
        await client.waitForAndClick(MultiStorePage.Shop.reset_button);
      });
    }, 'common_client');
  },
  async deleteCreatedShop(shopData,client){
      test('should search the created shop', async() => {
        await client.waitForAndClick(MultiStorePage.MultistoreTree.shop_name.replace('%D', 1), 1000);
        await client.clearInputAndSetValue(MultiStorePage.Shop.search_shop_name_input, shopData.name, 2000);
        await client.waitForAndClick(MultiStorePage.Shop.search_button, 1000);
      });
      test('should click on "Dropdown toggle > Delete" button', async() => {
        await client.waitForAndClick(MultiStorePage.Shop.dropdown_button);
        await client.confirmationDialog();
        await client.waitForAndClick(MultiStorePage.Shop.delete_button);
      });
      test('should click on "Reset" button', () => client.waitForAndClick(MultiStorePage.Shop.reset_button));
  },
  async switchToAllShops(client){
    test('should switch to "All shops"', async() => {
      await client.waitForAndClick(Dashboard.multistore_shop_name);
      await client.waitForAndClick(Dashboard.click_all_shops);
    });

  },
  async enableAndDisableShareAvailableQuantites(client, isEnable = false){ 
    test('should click on "Default" group', () => client.waitForAndClick(MultiStorePage.MultistoreTree.default_group));
    test('should click on "Edit" button', () => client.waitForAndClick(MultiStorePage.MultiStore.edit_button));
    if (isEnable) {
      test('should disable "Share available quantities to sell"', () => client.waitForAndClick(MultiStorePage.ShopGroup.share_available_quantities.replace("%D", "off")));
    }
    else {
      test('should enable "Share available quantities to sell"', () => client.waitForAndClick(MultiStorePage.ShopGroup.share_available_quantities.replace("%D", "on")));
    }
    test('should click on "Save" button', () => client.waitForAndClick(MultiStorePage.ShopGroup.save_button));
  }
};
