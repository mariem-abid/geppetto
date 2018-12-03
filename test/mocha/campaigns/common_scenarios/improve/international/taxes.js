const {Menu} = require('../../../../selectors/BO/menu');
const {TaxesPage} = require('../../../../selectors/BO/improve/international/taxesPage');

module.exports = {
  async createTaxRule(name, value) {
    scenario('Create a new "Tax rule"', client => {
      test('should go to "Taxes" page', () => client.goToSubtabMenuPage(Menu.Improve.International.international_menu_link, Menu.Improve.International.taxes_submenu_link));
      test('should click on "Tax Rules" tab', () => client.waitForAndClick(TaxesPage.taxes_tax_rules_tab));
      test('should click on "Add new tax rules group" button', () => client.waitForAndClick(TaxesPage.TaxRulesPage.taxes_add_tax_rule_link));
      test('should set the "Name" input', () => client.waitForAndSetValue(TaxesPage.TaxRulesPage.taxes_tax_rule_name_input_field, name + global.dateTime));
      test('should enable the tax rule', () => client.waitForAndClick(TaxesPage.TaxRulesPage.taxes_tax_rule_enable_yes_label));
      test('should click on "Save and stay" button', () => client.waitForAndClick(TaxesPage.TaxRulesPage.taxes_tax_rule_first_save_and_stay_button));
      test('should verify the appearance of the green validation', () => client.checkTextValue(TaxesPage.TaxRulesPage.taxes_success_alert, '× Successful creation.'));
      test('should select the "VAT IE 23%" from the tax dropdown list', () => client.waitForAndSelect(TaxesPage.TaxRulesPage.taxes_tax_rule_tax_select, value));
      test('should click on "Save and stay" button', () => client.waitForAndClick(TaxesPage.TaxRulesPage.taxes_tax_rule_second_save_and_stay_button, 3000));
      test('should verify the appearance of the green validation', () => client.checkTextValue(TaxesPage.TaxRulesPage.taxes_success_alert, '× Successful update.'));
    }, 'common_client');
  },
  editTaxRule: function (name, updatedName) {
    scenario('Edit the "Tax rule"', client => {
      test('should go to "Taxes" page', () => client.goToSubtabMenuPage(Menu.Improve.International.international_menu_link, Menu.Improve.International.taxes_submenu_link));
      test('should click on "Tax Rules" tab', () => client.waitForAndClick(TaxesPage.taxes_tax_rules_tab));
      test('should search for the created tax rule', () => client.searchByValue(TaxesPage.TaxRulesPage.taxes_tax_rule_filter_name_input_field, TaxesPage.TaxRulesPage.taxes_tax_rule_search_button, name + global.dateTime));
      test('should click on "Edit" button', () => client.waitForAndClick(TaxesPage.TaxRulesPage.taxes_tax_rule_edit_link.replace('%ROW', 1)));
      test('should set the "Name" input', () => client.waitForAndSetValue(TaxesPage.TaxRulesPage.taxes_tax_rule_name_input_field, updatedName + global.dateTime));
      test('should click on "Save and stay" button', () => client.waitForAndClick(TaxesPage.TaxRulesPage.taxes_tax_rule_first_save_and_stay_button, 1000));
      test('should verify the appearance of the green validation', () => client.checkTextValue(TaxesPage.TaxRulesPage.taxes_success_alert, '× Successful update.'));
    }, 'common_client');
  },
  async checkTaxRule(name) {
    scenario('Check the "Tax rule"', client => {
      test('should go to "Taxes" page', () => client.goToSubtabMenuPage(Menu.Improve.International.international_menu_link, Menu.Improve.International.taxes_submenu_link));
      test('should click on "Tax Rules" tab', () => client.waitForAndClick(TaxesPage.taxes_tax_rules_tab));
      test('should search for the created tax rule', () => client.searchByValue(TaxesPage.TaxRulesPage.taxes_tax_rule_filter_name_input_field, TaxesPage.TaxRulesPage.taxes_tax_rule_search_button, name + global.dateTime));
      test('should click on "Edit" button', () => client.waitForAndClick(TaxesPage.TaxRulesPage.taxes_tax_rule_edit_link.replace('%ROW', 1)));
      test('should check that the "Name" is equal to "' + (name + global.dateTime) + '"', () => client.checkAttributeValue(TaxesPage.TaxRulesPage.taxes_tax_rule_name_input_field, 'value', name + global.dateTime, 'equal', 1000));
    }, 'common_client');
  },
  async deleteTaxRule(name) {
    scenario('Delete the "Tax rule"', client => {
      test('should go to "Taxes" page', () => client.goToSubtabMenuPage(Menu.Improve.International.international_menu_link, Menu.Improve.International.taxes_submenu_link));
      test('should click on "Tax Rules" tab', () => client.waitForAndClick(TaxesPage.taxes_tax_rules_tab));
      test('should search for the created tax rule', () => client.searchByValue(TaxesPage.TaxRulesPage.taxes_tax_rule_filter_name_input_field, TaxesPage.TaxRulesPage.taxes_tax_rule_search_button, name + global.dateTime));
      test('should click on "Dropdown toggle > Delete" button', async () => {
        await client.waitForAndClick(TaxesPage.TaxRulesPage.taxes_tax_rule_dropdown_button.replace('%ROW', 1));
        await client.confirmationDialog();
        await client.waitForAndClick(TaxesPage.TaxRulesPage.taxes_tax_rule_delete_link.replace('%ROW', 1));
      });
      test('should verify the appearance of the green validation', () => client.checkTextValue(TaxesPage.TaxRulesPage.taxes_success_alert, '× Successful deletion.'));
    }, 'common_client');
  },
  async deleteTaxRuleWithBulkAction(name) {
    scenario('Delete the "Tax rule" with bulk action', client => {
      test('should go to "Taxes" page', () => client.goToSubtabMenuPage(Menu.Improve.International.international_menu_link, Menu.Improve.International.taxes_submenu_link));
      test('should click on "Tax Rules" tab', () => client.waitForAndClick(TaxesPage.taxes_tax_rules_tab));
      test('should search for the created tax rule', () => client.searchByValue(TaxesPage.TaxRulesPage.taxes_tax_rule_filter_name_input_field, TaxesPage.TaxRulesPage.taxes_tax_rule_search_button, name + global.dateTime));
      test('should click on "Bulk action" button', () => client.waitForAndClick(TaxesPage.TaxRulesPage.taxes_tax_rule_bulk_actions_button));
      test('should click on "Select all" action', () => client.waitForAndClick(TaxesPage.TaxRulesPage.taxes_tax_rule_select_all_link.replace('%ID', 1)));
      test('should click on "Bulk action" button', () => client.waitForAndClick(TaxesPage.TaxRulesPage.taxes_tax_rule_bulk_actions_button));
      test('should click on "Delete" action', () => client.waitForAndClick(TaxesPage.TaxRulesPage.taxes_tax_rule_select_all_link.replace('%ID', 7)));
      test('should verify the appearance of the green validation', () => client.checkTextValue(TaxesPage.TaxRulesPage.taxes_success_alert, '× The selection has been successfully deleted.'));
    }, 'common_client');
  }
};