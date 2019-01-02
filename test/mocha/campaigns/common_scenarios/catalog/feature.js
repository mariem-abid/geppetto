const {Menu} = require('../../../selectors/BO/menu');
const {AttributesPage} = require('../../../selectors/BO/catalog/attributesAndFeatures/attributesAndFeaturesPage');
const {HomePage} = require('../../../selectors/FO/homePage');
const {ProductPageFO} = require('../../../selectors/FO/productPage');

/**** Example of feature data (all these properties are required) ****
 * let featureData = {
 *  name: 'Feature name',
 *  values: {
 *    1: 'Feature Value'
 *  }
 * };
 *
 */

module.exports = {
  async createFeature(data) {
    scenario('Create a new "Feature"', client => {
      test('should go to "Attributes & Features" page', () => client.goToSubtabMenuPage(Menu.Sell.Catalog.catalog_menu_link, Menu.Sell.Catalog.attributes_features_submenu_link));
      test('should click on "Feature" subtab', () => client.waitForAndClick(AttributesPage.attributes_features_features_tab));
      test('should click on "Add new feature" button', () => client.waitForAndClick(AttributesPage.Features.attributes_features_add_new_feature_link));
      test('should set the "Name" input', () => client.waitForAndSetValue(AttributesPage.Features.attributes_features_features_name_input_field, data.name + global.dateTime));
      test('should click on "Save" button', () => client.waitForAndClick(AttributesPage.Features.attributes_features_features_save_button));
      test('should verify the appearance of the green validation', () => client.checkTextValue(AttributesPage.Features.attributes_features_success_alert, '×\nSuccessful creation.'));
      test('should search for the created feature', () => client.searchByValue(AttributesPage.Features.attributes_features_features_filter_name_input_field.replace('%SEARCHBY', 'name'), AttributesPage.Features.attributes_features_features_search_button, data.name + global.dateTime));
      test('should select the created feature', () => client.waitForAndClick(AttributesPage.Features.attributes_features_features_view_link.replace('%ROW', 1)));
      test('should click on "Add new feature value" button', () => client.waitForAndClick(AttributesPage.Features.attributes_features_features_add_new_feature_value_link));
      test('should set the "Value" input', () => client.waitForAndSetValue(AttributesPage.Features.attributes_features_features_value_input_field, data.values[1]));
      test('should click on "Save" button', () => client.waitForAndClick(AttributesPage.Features.attributes_features_features_save_value_button));
      test('should verify the appearance of the green validation', () => client.checkTextValue(AttributesPage.Features.attributes_features_success_alert, '×\nSuccessful creation.'));
    }, 'common_client');
  },
  async checkFeatureInFO(productName, data) {
    scenario('Check that the feature is well created/updated in the Front Office', client => {
      test('should set the shop language to "English"', () => client.switchShopLanguageInFo('en'));
      test('should search for the product', () => client.searchByValue(HomePage.search_input, HomePage.search_button, productName + global.dateTime));
      test('should go to the product page', () => client.waitForAndClick(HomePage.product_result_name));
      test('should check the feature name', () => client.checkTextValue(ProductPageFO.feature_name, data.name + global.dateTime));
      test('should check the feature value', () => client.checkTextValue(ProductPageFO.feature_value, data.values[1], 'equal', 2000));
    }, 'common_client');
  },
  async updateFeature(data) {
    scenario('Update the created "Feature"', client => {
      test('should go to "Attributes & Features" page', () => client.goToSubtabMenuPage(Menu.Sell.Catalog.catalog_menu_link, Menu.Sell.Catalog.attributes_features_submenu_link));
      test('should click on "Feature" subtab', () => client.waitForAndClick(AttributesPage.attributes_features_features_tab));
      test('should search for the created feature', () => client.searchByValue(AttributesPage.Features.attributes_features_features_filter_name_input_field.replace('%SEARCHBY', 'name'), AttributesPage.Features.attributes_features_features_search_button, data.name + global.dateTime, 1000));
      test('should click on "Edit" action', async () => {
        await client.clickOnAction(AttributesPage.Features.attributes_features_features_dropdown_button.replace('%ROW', 1), AttributesPage.Features.attributes_features_features_edit_link.replace('%ROW', 1));
        await client.editObjectData(data);
      });
      test('should set the "Name" input', () => client.waitForAndSetValue(AttributesPage.Features.attributes_features_features_name_input_field, data.name + global.dateTime));
      test('should click on "Save" button', () => client.waitForAndClick(AttributesPage.Features.attributes_features_features_save_button));
      test('should verify the appearance of the green validation', () => client.checkTextValue(AttributesPage.Features.attributes_features_success_alert, '×\nSuccessful update.'));
      test('should click on "Reset" button', () => client.waitForAndClick(AttributesPage.Features.attributes_features_features_reset_button));
      test('should search for the updated feature', () => client.searchByValue(AttributesPage.Features.attributes_features_features_filter_name_input_field.replace('%SEARCHBY', 'name'), AttributesPage.Features.attributes_features_features_search_button, data.name + global.dateTime));
      test('should select the feature', () => client.waitForAndClick(AttributesPage.Features.attributes_features_features_view_link.replace('%ROW', 1)));
      test('should click on "Edit" action', () => client.waitForAndClick(AttributesPage.Features.attributes_features_features_value_edit_link.replace('%ROW', 1)));
      test('should set the "Value" input', () => client.waitForAndSetValue(AttributesPage.Features.attributes_features_features_value_input_field, data.values[1]));
      test('should click on "Save" button', () => client.waitForAndClick(AttributesPage.Features.attributes_features_features_save_value_button));
      test('should verify the appearance of the green validation', () => client.checkTextValue(AttributesPage.Features.attributes_features_success_alert, '×\nSuccessful update.'));
    }, 'catalog/attribute_and_feature');
  },
  async deleteFeature(data) {
    scenario('Delete the created "Feature"', client => {
      test('should go to "Attributes & Features" page', () => client.goToSubtabMenuPage(Menu.Sell.Catalog.catalog_menu_link, Menu.Sell.Catalog.attributes_features_submenu_link));
      test('should click on "Feature" subtab', () => client.waitForAndClick(AttributesPage.attributes_features_features_tab));
      test('should search for the created feature', () => client.searchByValue(AttributesPage.Features.attributes_features_features_filter_name_input_field.replace('%SEARCHBY', 'name'), AttributesPage.Features.attributes_features_features_search_button, data.name + global.dateTime));
      test('should delete the created feature', () => client.clickOnAction(AttributesPage.Features.attributes_features_features_dropdown_button.replace('%ROW', 1), AttributesPage.Features.attributes_features_features_delete_link.replace('%ROW', 1), 'delete'));
      test('should verify the appearance of the green validation', () => client.checkTextValue(AttributesPage.Features.attributes_features_success_alert, '×\nSuccessful deletion.'));
    }, 'catalog/attribute_and_feature');
  },
  async checkDeletedFeatureInFO(productName) {
    scenario('Check that the feature does not exist in the Front Office', client => {
      test('should set the shop language to "English"', () => client.switchShopLanguageInFo('en'));
      test('should search for the product', () => client.searchByValue(HomePage.search_input, HomePage.search_button, productName + global.dateTime));
      test('should go to the product page', () => client.waitForAndClick(HomePage.product_result_name));
      test('should check that the feature has been deleted in the Front Office', () => client.isNotExisting(ProductPageFO.feature_name, 1000));
    }, 'common_client');
  },
  async featureBulkActions(data, action) {
    scenario(action.charAt(0).toUpperCase() + action.slice(1) + ' the created "Feature" using the bulk actions', client => {
      test('should go to "Attributes & Features" page', () => client.goToSubtabMenuPage(Menu.Sell.Catalog.catalog_menu_link, Menu.Sell.Catalog.attributes_features_submenu_link));
      test('should click on "Feature" subtab', () => client.waitForAndClick(AttributesPage.attributes_features_features_tab));
      test('should search for the created feature', () => client.searchByValue(AttributesPage.Features.attributes_features_features_filter_name_input_field.replace('%SEARCHBY', 'name'), AttributesPage.Features.attributes_features_features_search_button, data.name + global.dateTime));
      test('should click on checkbox option', () => client.waitForAndClick(AttributesPage.Features.attributes_features_feature_checkbox.replace('%ROW', 1)));
      test('should ' + action + ' the created feature', () => client.clickOnAction(AttributesPage.Features.attributes_features_features_bulk_actions_button, AttributesPage.Features.attributes_features_features_delete_selected_link, 'delete'));
      test('should verify the appearance of the green validation', () => client.checkTextValue(AttributesPage.Features.attributes_features_success_alert, '×\nThe selection has been successfully deleted.'));
    }, 'catalog/attribute_and_feature');
  }
};