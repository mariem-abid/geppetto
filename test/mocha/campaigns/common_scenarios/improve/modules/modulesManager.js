const {Menu} = require('../../../../selectors/BO/menu');
const {ModulesManager} = require('../../../../selectors/BO/improve/modules/moduleManager');

module.exports = {
  async uninstallModule(moduleName) {
    scenario('Unstall the '+moduleName, client => {
      test('should go to "Module Manager" page', async () => {
        await client.waitForAndClick(Menu.Improve.Modules.modules_menu);
        await client.waitForAndClick(Menu.Improve.Modules.module_manager_submenu,1000);
      });
      test('should set the "Module Name" input', () => client.waitForAndType(ModulesManager.Modules.module_name_input,moduleName));
      test('should click on "Search" button', () => client.waitForAndClick(ModulesManager.Modules.search_button));
      test('should click on "dropdown" button', () => client.waitForAndClick(ModulesManager.Modules.dropdown_button));
      test('should click on "Uninstall" button', () => client.waitForAndClick(ModulesManager.Modules.uninstall_button));
      test('should click on "Yes, uninstall" button', () => client.waitForAndClick(ModulesManager.Modules.yes_uninstall_it_button.replace("%D",moduleName),1000));
      test('should check that the module is well uninstalled', () => client.checkTextValue(ModulesManager.Modules.success_message,"Uninstall action on module "+moduleName+" succeeded."));
      test('should close the green validation', () => client.waitForAndClick(ModulesManager.Modules.close_validation_button));
    }, 'common_client');
  }
};