const {Menu} = require('../../../selectors/BO/menu');
const {AttributesPage} = require('../../../selectors/BO/catalog/attributesAndFeatures/attributesAndFeaturesPage');
const {HomePage} = require('../../../selectors/FO/homePage');
const {ProductPageFO} = require('../../../selectors/FO/productPage');

/**** Example of attribute data (all these properties are required) ****
 * let data = {
 *  name: 'attribute name',
 *  public_name: 'the public name tha will be displayed to customers',
 *  type: 'radio / select / color',
 *  values: {
 *    1: 'first value',
 *    2: 'second value',
 *    3: 'third value'
 *  }
 * };
 */

module.exports = {
  createAttribute(data) {
    scenario('Create a new "Attribute"', client => {
      test('Should go to "Attributes & Features" page', () => client.goToSubtabMenuPage(Menu.Sell.Catalog.catalog_menu_link, Menu.Sell.Catalog.attributes_features_submenu_link, 1000));
      test('should click on "Add new attribute" button', () => client.waitForAndClick(AttributesPage.Attributes.attributes_features_add_new_attribute_link));
      test('should set the "Name" input', () => client.waitForAndSetValue(AttributesPage.Attributes.attributes_features_attribute_name_input_field, data.name + global.dateTime));
      test('should set the "Public name" input', () => client.waitForAndSetValue(AttributesPage.Attributes.attributes_features_attribute_public_name_input_field, data.public_name + global.dateTime));
      test('should choose the "Type" of attribute', () => client.waitForAndSelect(AttributesPage.Attributes.attributes_features_attribute_type_select_field, data.type));
      test('should click on "Save" button', () => client.waitForAndClick(AttributesPage.Attributes.attributes_features_attribute_save_button));
      test('should verify the appearance of the green validation', () => client.checkTextValue(AttributesPage.Attributes.attributes_features_attribute_success_alert, '×\nSuccessful creation.'));
      test('should search for the created attribute', () => client.searchByValue(AttributesPage.Attributes.attributes_features_search_input_attribute_field, AttributesPage.Attributes.attributes_features_attribute_search_button, data.name + global.dateTime));
      test('should select the created attribute', async () => {
        await client.getTextInVar(AttributesPage.Attributes.attributes_features_attribute_column.replace('%ROW', 1).replace('%COL', 2), data.name + "_id");
        await client.waitForAndClick(AttributesPage.Attributes.attributes_features_attribute_column.replace('%ROW', 1).replace('%COL', 3));
      });
      test('should click on "Add new value" button', () => client.waitForAndClick(AttributesPage.Attributes.attributes_features_attribute_add_new_value_link));
      Object.keys(data.values).forEach(function (key) {
        test('should set the "Value" input', () => client.waitForAndSetValue(AttributesPage.Attributes.attributes_features_attribute_value_input_field, data.values[key].value));
        if (data.values[key].hasOwnProperty('color')) {
          test('should set the "Color" input', () => client.waitForAndSetValue(AttributesPage.Attributes.attributes_features_attribute_color_input_field, data.values[key].color));
        }
        if (data.values[key].hasOwnProperty('file')) {
          test('should upload the texture file', () => client.uploadFile(AttributesPage.Attributes.attributes_features_attribute_texture_file, downloadFileFolder, data.values[key].file,));
        }
        if (Object.keys(data.values).length > 1) {
          test('should click on "Save" button', () => client.waitForAndClick(AttributesPage.Attributes.attributes_features_save_and_and_button));
        } else {
          test('should click on "Save" button', () => client.waitForAndClick(AttributesPage.Attributes.attributes_features_save_value_button));
        }
      });
      test('should verify the appearance of the green validation', () => client.checkTextValue(AttributesPage.Attributes.attributes_features_attribute_success_alert, '×\nSuccessful creation.'));
    }, 'common_client');
  },
  async checkAttributeInFO(productName, data) {
    scenario('Check that the attribute is well created/updated in the Front Office', client => {
      test('should set the shop language to "English"', () => client.switchShopLanguageInFo('en'));
      test('check the visibility of the logo', async () => {
        await client.isVisible(HomePage.logo_home_page);
        if (!global.visible) {
          await client.waitForAndClick(HomePage.FO_link);
        }
      });
      test('should search for the product', () => client.searchByValue(HomePage.search_input, HomePage.search_button, productName + global.dateTime));
      test('should go to the product page', () => client.waitForAndClick(HomePage.product_result_name));
      test('should check the product attribute name', () => client.checkTextValue(ProductPageFO.attribute_name, data.name + global.dateTime));
      test('should check the attribute values', () => client.checkAttributeValues(ProductPageFO.attribute_radio_values, Object.keys(data.values).map((k) => data.values[k].value)));
    }, 'catalog/attribute_and_feature');
  },
  async updateAttribute(data) {
    scenario('Update the created "Attribute"', client => {
      test('Should go to "Attributes & Features" page', () => client.goToSubtabMenuPage(Menu.Sell.Catalog.catalog_menu_link, Menu.Sell.Catalog.attributes_features_submenu_link, 1000));
      test('should search for the created attribute', () => client.searchByValue(AttributesPage.Attributes.attributes_features_search_input_attribute_field, AttributesPage.Attributes.attributes_features_attribute_search_button, data.name + global.dateTime));
      test('should click on "Edit" action', async () => {
        await client.clickOnAction(AttributesPage.Attributes.attributes_features_attribute_group_action_button.replace('%ROW', 1), AttributesPage.Attributes.attributes_features_attribute_update_link.replace('%ROW', 1).replace('%COL', 6));
        await client.editObjectData(data);
      });
      test('should set the "Name" input', () => client.waitForAndSetValue(AttributesPage.Attributes.attributes_features_attribute_name_input_field, data.name + global.dateTime));
      test('should set the "Public name" input', () => client.waitForAndSetValue(AttributesPage.Attributes.attributes_features_attribute_public_name_input_field, data.public_name + global.dateTime));
      test('should click on "Save" button', () => client.waitForAndClick(AttributesPage.Attributes.attributes_features_attribute_save_button));
      test('should click on "Reset" button', () => client.waitForAndClick(AttributesPage.Attributes.attributes_features_attribute_reset_button));
      test('should search for the created attribute', () => client.searchByValue(AttributesPage.Attributes.attributes_features_search_input_attribute_field, AttributesPage.Attributes.attributes_features_attribute_search_button, data.name + global.dateTime));
      test('should select the attribute', () => client.waitForAndClick(AttributesPage.Attributes.attributes_features_attribute_column.replace('%ROW', 1).replace('%COL', 3)));
      Object.keys(data.values).forEach(function (key) {
        test('should click on "Edit" action', () => client.waitForAndClick(AttributesPage.Attributes.attributes_features_attribute_value_update_link.replace('%ROW', key).replace('%COL', 5)));
        test('should set the "Value" input', () => client.clearInputAndSetValue(AttributesPage.Attributes.attributes_features_attribute_value_input_field, data.values[key].value, 1000));
        test('should click on "Save" button', () => client.waitForAndClick(AttributesPage.Attributes.attributes_features_save_value_button));
      });
      test('should verify the appearance of the green validation', () => client.checkTextValue(AttributesPage.Attributes.attributes_features_attribute_success_alert, '×\nSuccessful update.'));
    }, 'catalog/attribute_and_feature');
  },
  async deleteAttributeValue(data) {
    scenario('Delete the created "Attribute value"', client => {
      test('Should go to "Attributes & Features" page', () => client.goToSubtabMenuPage(Menu.Sell.Catalog.catalog_menu_link, Menu.Sell.Catalog.attributes_features_submenu_link, 1000));
      test('should search for the created attribute', () => client.searchByValue(AttributesPage.Attributes.attributes_features_search_input_attribute_field, AttributesPage.Attributes.attributes_features_attribute_search_button, data.name + global.dateTime));
      test('should select the attribute', () => client.waitForAndClick(AttributesPage.Attributes.attributes_features_attribute_column.replace('%ROW', 1).replace('%COL', 3)));
      test('should delete the value of created attribute', async () => {
        await client.clickOnAction(AttributesPage.Attributes.attributes_features_attribute_value_action_group_button.replace('%ROW', 1).replace('%COL', 5), AttributesPage.Attributes.attributes_features_attribute_value_delete_link.replace('%ROW', 1).replace('%COL', 5), 'delete', 'true');
        await client.deleteObjectElement(data.values, 1);
      });
      test('should verify the appearance of the green validation', () => client.checkTextValue(AttributesPage.Attributes.attributes_features_attribute_success_alert, '×\nSuccessful deletion.'));
    }, 'catalog/attribute_and_feature');
  },
  async deleteAttribute(data) {
    scenario('Delete the created "Attribute"', client => {
      test('Should go to "Attributes & Features" page', () => client.goToSubtabMenuPage(Menu.Sell.Catalog.catalog_menu_link, Menu.Sell.Catalog.attributes_features_submenu_link, 1000));
      test('should search for the created attribute', () => client.searchByValue(AttributesPage.Attributes.attributes_features_search_input_attribute_field, AttributesPage.Attributes.attributes_features_attribute_search_button, data.name + global.dateTime));
      test('should delete the created attribute', () => client.clickOnAction(AttributesPage.Attributes.attributes_features_attribute_group_action_button.replace('%ROW', 1), AttributesPage.Attributes.attributes_features_attribute_delete_link.replace('%ROW', 1).replace('%COL', 6), 'delete'));
      test('should verify the appearance of the green validation', () => client.checkTextValue(AttributesPage.Attributes.attributes_features_attribute_success_alert, '×\nSuccessful deletion.'));
    }, 'catalog/attribute_and_feature');
  },
  async checkDeletedAttributeInFO(productName) {
    scenario('Check that the attribute is well deleted in Front Office', client => {
      test('should set the shop language to "English"', () => client.switchShopLanguageInFo('en'));
      test('should search for the product', () => client.searchByValue(HomePage.search_input, HomePage.search_button, productName + global.dateTime));
      test('should go to the product page', () => client.waitForAndClick(HomePage.product_result_name));
      test('should check that the attribute has been deleted in the Front Office', () => client.isNotExisting(ProductPageFO.attribute_name, 1000));
    }, 'common_client');
  },
  async attributeBulkActions(data, action) {
    scenario(action.charAt(0).toUpperCase() + action.slice(1) + ' the created "Attribute" using the bulk actions', client => {
      test('Should go to "Attributes & Features" page', () => client.goToSubtabMenuPage(Menu.Sell.Catalog.catalog_menu_link, Menu.Sell.Catalog.attributes_features_submenu_link, 1000));
      test('should search for the created attribute', () => client.searchByValue(AttributesPage.Attributes.attributes_features_search_input_attribute_field, AttributesPage.Attributes.attributes_features_attribute_search_button, data.name + global.dateTime));
      test('should select the created attribute', () => client.waitForAndClick(AttributesPage.Attributes.attributes_features_attribute_checkbox.replace('%ROW', 1).replace('%COL', 1)));
      test('should ' + action + ' the created attribute', () => client.clickOnAction(AttributesPage.Attributes.attributes_features_attribute_bulk_actions_button, AttributesPage.Attributes.attributes_features_attribute_delete_bulk_action_link, action, 'true'));
      test('should verify the appearance of the green validation', () => client.checkTextValue(AttributesPage.Attributes.attributes_features_attribute_success_alert, '×\nThe selection has been successfully', 'contain'));
    }, 'catalog/attribute_and_feature');
  }
};