const {Menu} = require('../../../../selectors/BO/menu');
const {ModulesCatalog} = require('../../../../selectors/BO/improve/modules/moduleCatalog');

module.exports = {
  async installModule(moduleName) {
    scenario('Install the '+moduleName +' module', client => {
      test('should go to "Module Catalog" page', async () => {
        await client.waitForAndClick(Menu.Improve.Modules.modules_menu);
        await client.waitForAndClick(Menu.Improve.Modules.module_catalog_submenu,1000);
      });
      test('should set the "Module Name" input', () => client.waitForAndType(ModulesCatalog.ModuleCatalog.module_name_input,moduleName));
      test('should click on "Search" button', () => client.waitForAndClick(ModulesCatalog.ModuleCatalog.search_button));
      test('should click on "Install" button', () => client.waitForAndClick(ModulesCatalog.ModuleCatalog.install_module_button.replace("%D",moduleName),1000));
      test('should check that the module is well installed', () => client.checkTextValue(ModulesCatalog.ModuleCatalog.success_message,"Install action on module "+moduleName+" succeeded."));
    }, 'common_client');
  }
};