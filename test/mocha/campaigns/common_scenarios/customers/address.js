const {Menu} = require('../../../selectors/BO/menu');
const {AddressesPage} = require('../../../selectors/BO/customers/addresses/addresses');

module.exports = {
  async createCustomerAddress(customerData) {
    scenario('Create a new "Address"', client => {
      test('should go to the "Customers" page', () => client.goToSubtabMenuPage(Menu.Sell.Customers.customers_menu_link, Menu.Sell.Customers.addresses_submenu_link, 1000));
      test('should click on add new address', () => client.waitForAndClick(AddressesPage.addresses_add_new_addresse_link));
      test('should set "Email" input', () => client.clearInputAndSetValue(AddressesPage.addresses_email_input_field, global.dateTime + customerData.email_address, 1000));
      test('should set "Identification number" input', async () => {
        await client.waitForAndClick(AddressesPage.addresses_identification_number_input_field);
        await client.waitForAndSetValue(AddressesPage.addresses_identification_number_input_field, '0123456789', 1000);
      });
      test('should set "Address alias" input', () => client.waitForAndSetValue(AddressesPage.addresses_address_alias_input_field, 'Ma super addresse'));
      test('should set "Company" input', () => client.waitForAndSetValue(AddressesPage.addresses_company_input_field, 'Presta'));
      test('should set "VAT number" input', () => client.waitForAndSetValue(AddressesPage.addresses_vat_number_input_field, '0123456789'));
      test('should set "Address" input', () => client.waitForAndSetValue(AddressesPage.addresses_address_input_field, "12 rue d'amsterdam" + global.dateTime));
      test('should set "Second address" input', () => client.waitForAndSetValue(AddressesPage.addresses_second_address_input_field, "RDC"));
      test('should set "Postal code" input', () => client.waitForAndSetValue(AddressesPage.addresses_zip_postal_code_input_field, "75009"));
      test('should set "City" input', () => client.waitForAndSetValue(AddressesPage.addresses_city_input_field, "Paris"));
      test('should set "Pays" input', () => client.waitForAndSelect(AddressesPage.addresses_country_select, "8"));
      test('should set "Home phone" input', () => client.waitForAndSetValue(AddressesPage.addresses_home_phone_input_field, "0123456789"));
      test('should set "Other information" input', () => client.waitForAndSetValue(AddressesPage.addresses_other_textarea, "azerty"));
      test('should check that the "First name" input is "' + customerData.first_name + '"', () => client.checkTextElementValue(AddressesPage.addresses_first_name_input_field, customerData.first_name));
      test('should check that the "Last name" input is "' + customerData.last_name + '"', () => client.checkTextElementValue(AddressesPage.addresses_last_name_input_field, customerData.last_name));
      test('should click on "Save" button', () => client.waitForAndClick(AddressesPage.addresses_save_button));
      test('should verify the appearance of the green validation', () => client.checkTextValue(AddressesPage.addresses_success_alert, '×\nSuccessful creation.'));
    }, 'common_client');
  },
  async createAddress(addressData) {
    scenario('Create a new "Address"', client => {
      test('should go to the "Addresses" page', () => client.goToSubtabMenuPage(Menu.Sell.Customers.customers_menu_link, Menu.Sell.Customers.addresses_submenu_link));
      test('should click on add new address', () => client.waitForAndClick(AddressesPage.addresses_add_new_addresse_link));
      test('should set "Email" input', () => client.waitForAndSetValue(AddressesPage.addresses_email_input_field, global.dateTime + addressData.email));
      test('should set "Identification number" input', async () => {
        await client.waitForAndClick(AddressesPage.addresses_identification_number_input_field);
        await client.waitForAndSetValue(AddressesPage.addresses_identification_number_input_field, addressData.id_number, 1000);
      });
      test('should set "Address alias" input', () => client.waitForAndSetValue(AddressesPage.addresses_address_alias_input_field, addressData.address_alias, 1000));
      test('should add first name', () => client.waitForAndSetValue(AddressesPage.addresses_first_name_input_field, addressData.first_name));//to delete
      test('should add last name', () => client.waitForAndSetValue(AddressesPage.addresses_last_name_input_field, addressData.last_name));//to delete
      test('should set "Company" input', () => client.waitForAndSetValue(AddressesPage.addresses_company_input_field, addressData.company));
      test('should set "VAT number" input', () => client.waitForAndSetValue(AddressesPage.addresses_vat_number_input_field, addressData.vat_number));
      test('should set "Address" input', () => client.waitForAndSetValue(AddressesPage.addresses_address_input_field, addressData.address + " " + global.dateTime));
      test('should set "Second address" input', () => client.waitForAndSetValue(AddressesPage.addresses_second_address_input_field, addressData.second_address));
      test('should set "Postal code" input', () => client.waitForAndSetValue(AddressesPage.addresses_zip_postal_code_input_field, addressData.ZIP));
      test('should set "City" input', () => client.waitForAndSetValue(AddressesPage.addresses_city_input_field, addressData.city));
      test('should set "Pays" input', () => client.waitForAndSelect(AddressesPage.addresses_country_select, addressData.country));
      test('should set "Home phone" input', () => client.waitForAndSetValue(AddressesPage.addresses_home_phone_input_field, addressData.home_phone));
      test('should set "Other information" input', () => client.waitForAndSetValue(AddressesPage.addresses_other_textarea, addressData.other));
      test('should check that the "First name" is "John"', () => client.checkTextElementValue(AddressesPage.addresses_first_name_input_field, 'value', addressData.first_name));
      test('should check that the "Last name" is "Doe"', () => client.checkTextElementValue(AddressesPage.addresses_last_name_input_field, 'value', addressData.last_name));
      test('should click on "Save" button', () => client.waitForAndClick(AddressesPage.addresses_save_button));
      test('should verify the appearance of the green validation', () => client.checkTextValue(AddressesPage.addresses_success_alert, '×\nSuccessful creation.'));
    }, 'common_client');
  },
  async checkAddressRequiredInput(addressData, Check) {
    scenario('Check required fields on Address page', client => {
      if (Check === "allInput") {
        test('should set "Email" input', () => client.waitForAndSetValue(AddressesPage.addresses_email_input_field, global.dateTime + addressData.email));
        test('should click on "Save" button', () => client.waitForAndClick(AddressesPage.addresses_save_button));
        test('should verify the appearance of the red error message', () => client.checkTextValue(AddressesPage.addresses_danger_alert, 'Your Zip/postal code is incorrect.', 'contain'));
        test('should set "Postal code" input', () => client.waitForAndSetValue(AddressesPage.addresses_zip_postal_code_input_field, addressData.ZIP));
        test('should click on "Save" button', () => client.waitForAndClick(AddressesPage.addresses_save_button));
        test('should verify the appearance of the red error message', () => client.checkTextValue(AddressesPage.addresses_danger_alert, '12 errors', 'contain'));
      } else {
        test('should set "Email" input', () => client.waitForAndSetValue(AddressesPage.addresses_email_input_field, "wrongEmail@gmail.com"));
        test('should set "Identification number" input', () => client.waitForAndSetValue(AddressesPage.addresses_identification_number_input_field, addressData.id_number));
        test('should set "Address alias" input', () => client.waitForAndSetValue(AddressesPage.addresses_address_alias_input_field, addressData.address_alias));
        test('should set "First name" input', () => client.waitForAndSetValue(AddressesPage.addresses_first_name_input_field, addressData.first_name));
        test('should set "Last name" input', () => client.waitForAndSetValue(AddressesPage.addresses_last_name_input_field, addressData.last_name));
        test('should set "VAT number" input', () => client.waitForAndSetValue(AddressesPage.addresses_vat_number_input_field, addressData.vat_number));
        test('should set "Address" input', () => client.waitForAndSetValue(AddressesPage.addresses_address_input_field, addressData.address + " " + global.dateTime));
        test('should set "Second address" input', () => client.waitForAndSetValue(AddressesPage.addresses_second_address_input_field, addressData.second_address));
        test('should set "Postal code" input', () => client.waitForAndSetValue(AddressesPage.addresses_zip_postal_code_input_field, addressData.ZIP));
        test('should set "City" input', () => client.waitForAndSetValue(AddressesPage.addresses_city_input_field, addressData.city));
        test('should set "Pays" input', () => client.waitForAndSelect(AddressesPage.addresses_country_select, addressData.country));
        test('should set "Home phone" input', () => client.waitForAndSetValue(AddressesPage.addresses_home_phone_input_field, addressData.home_phone));
        if (Check === 'first') {
          test('should set "Company" input', () => client.waitForAndSetValue(AddressesPage.addresses_company_input_field, addressData.company));
          test('should set "Other information" input', () => client.waitForAndSetValue(AddressesPage.addresses_other_textarea, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'));
          test('should click on "Save" button', () => client.waitForAndClick(AddressesPage.addresses_save_button));
          test('should verify the appearance of the red error message', () => client.checkTextValue(AddressesPage.addresses_danger_alert, 'This email address is not registered.', 'contain'));
          test('should set "Email" input', () => client.waitForAndSetValue(AddressesPage.addresses_email_input_field, global.dateTime + addressData.email, 1000));
          test('should click on "Save" button', () => client.waitForAndClick(AddressesPage.addresses_save_button));
          test('should verify the appearance of the red error message', () => client.checkTextValue(AddressesPage.addresses_danger_alert, 'The other field is too long (300 chars max).', 'contain'));
          test('should set "Other information" input', () => client.waitForAndSetValue(AddressesPage.addresses_other_textarea, addressData.other));
          test('should click on "Save" button', () => client.waitForAndClick(AddressesPage.addresses_save_button, 50));
          test('should verify the appearance of the green validation', () => client.checkTextValue(AddressesPage.addresses_success_alert, '×\nSuccessful creation.'));
        } else if (Check === "second") {
          test('should set "Other information" input', () => client.waitForAndSetValue(AddressesPage.addresses_other_textarea, addressData.other));
          test('should click on "Save" button', () => client.waitForAndClick(AddressesPage.addresses_save_button));
          test('should verify the appearance of the red error message', () => client.checkTextValue(AddressesPage.addresses_danger_alert, 'This email address is not registered.', 'contain'));
          test('should set "Email" input', () => client.waitForAndSetValue(AddressesPage.addresses_email_input_field, global.dateTime + addressData.email));
          test('should click on "Save" button', () => client.waitForAndClick(AddressesPage.addresses_save_button));
          test('should verify the appearance of the red error message', () => client.checkTextValue(AddressesPage.addresses_danger_alert, 'The company field is required.', 'contain'));
          test('should set "Company" input', () => client.waitForAndSetValue(AddressesPage.addresses_company_input_field, addressData.company));
          test('should click on "Save" button', () => client.waitForAndClick(AddressesPage.addresses_save_button));
          test('should verify the appearance of the green validation', () => client.checkTextValue(AddressesPage.addresses_success_alert, '×\nSuccessful creation.'));
        }
      }
    }, 'common_client');
  },
  async checkAddressBO(addressData) {
    scenario('Check the address creation in the Back Office', client => {
      test('should check the address existence in the "addresses list"', async () => {
        await client.isVisible(AddressesPage.addresses_filter_address_input_field);
        await client.search(AddressesPage.addresses_filter_address_input_field, addressData.address + " " + global.dateTime);
        await client.checkExistence(AddressesPage.addresses_address_column.replace('%ROW', 1).replace('%COL', 5), addressData.address + " " + global.dateTime);
      });
    }, 'common_client');
  },

  /**
   * This function allows you to search for a address and edit it
   * @param dataAddress
   * @param newAddressData
   * @returns {*}
   */

  async editAddress(dataAddress, newAddressData) {
    scenario('Edit created Address', client => {
      test('should go to the "Addresses" page', () => client.goToSubtabMenuPage(Menu.Sell.Customers.customers_menu_link, Menu.Sell.Customers.addresses_submenu_link));
      test('should search for the address in the "Addresses list"', async () => {
        await client.isVisible(AddressesPage.addresses_filter_address_input_field, 1000);
        await client.search(AddressesPage.addresses_filter_address_input_field, dataAddress + " " + global.dateTime);
      });
      test('should click on "Edit" button', () => client.waitForAndClick(AddressesPage.addresses_address_column.replace("%ROW", 1).replace("%COL", 9)));
      test('should set the new "Identification number" input', () => client.waitForAndSetValue(AddressesPage.addresses_identification_number_input_field, newAddressData.id_number));
      test('should set the new "Address alias" input', () => client.waitForAndSetValue(AddressesPage.addresses_address_alias_input_field, newAddressData.address_alias));
      test('should check that the "First name" is "John"', () => client.checkAttributeValue(AddressesPage.addresses_first_name_input_field, 'value', newAddressData.first_name));
      test('should check that the "Last name" is "Doe"', () => client.checkAttributeValue(AddressesPage.addresses_last_name_input_field, 'value', newAddressData.last_name));
      test('should set the new "Company" input', () => client.waitForAndSetValue(AddressesPage.addresses_company_input_field, newAddressData.company));
      test('should set the new "VAT number" input', () => client.waitForAndSetValue(AddressesPage.addresses_vat_number_input_field, newAddressData.vat_number));
      test('should set the new "Address" input', () => client.waitForAndSetValue(AddressesPage.addresses_address_input_field, newAddressData.address + " " + global.dateTime));
      test('should set the new "Second address" input', () => client.waitForAndSetValue(AddressesPage.addresses_second_address_input_field, newAddressData.second_address));
      test('should set the new "Postal code" input', () => client.waitForAndSetValue(AddressesPage.addresses_zip_postal_code_input_field, newAddressData.ZIP));
      test('should set the new "City" input', () => client.waitForAndSetValue(AddressesPage.addresses_city_input_field, newAddressData.city));
      test('should set the new "Pays" input', () => client.waitForAndSelect(AddressesPage.addresses_country_select, newAddressData.country));
      test('should set the new "Home phone" input', () => client.waitForAndSetValue(AddressesPage.addresses_home_phone_input_field, newAddressData.home_phone));
      test('should set the new "Other information" input', () => client.waitForAndSetValue(AddressesPage.addresses_other_textarea, newAddressData.other));
      test('should click on "Save" button', () => client.waitForAndClick(AddressesPage.addresses_save_button));
      test('should verify the appearance of the green validation', () => client.checkTextValue(AddressesPage.addresses_success_alert, '×\nSuccessful update.'));
    }, 'common_client');
  },
  async deleteAddress(dataAddress) {
    scenario('Delete address', client => {
      test('should go to the "Addresses" page', () => client.goToSubtabMenuPage(Menu.Sell.Customers.customers_menu_link, Menu.Sell.Customers.addresses_submenu_link));
      test('should search for the address in the "Addresses list"', async () => {
        await client.isVisible(AddressesPage.addresses_filter_address_input_field, 1000);
        await client.search(AddressesPage.addresses_filter_address_input_field, dataAddress + " " + global.dateTime);
      });
      test('should click on "Delete" button', async () => {
        await client.waitForAndClick(AddressesPage.addresses_dropdown_button.replace('%ROW', 1));
        await client.waitForAndClick(AddressesPage.addresses_delete_link.replace('%ROW', 1));
      });
      test('should verify the appearance of the green validation', () => client.checkTextValue(AddressesPage.addresses_success_alert, '×\nSuccessful deletion.'));
    }, 'common_client');
  },
  async deleteAddressWithBulkActions(dataAddress) {
    scenario('Delete address with bulk actions', client => {
      test('should go to the "Addresses" page', () => client.goToSubtabMenuPage(Menu.Sell.Customers.customers_menu_link, Menu.Sell.Customers.addresses_submenu_link));
      test('should search for the address in the "Addresses list"', async () => {
        await client.isVisible(AddressesPage.addresses_filter_address_input_field, 1000);
        await client.search(AddressesPage.addresses_filter_address_input_field, dataAddress + " " + global.dateTime);
      });
      test('should select the searched client', () => client.waitForAndClick(AddressesPage.addresses_address_checkbox.replace("%ROW", 1)));
      test('should click on the "Bulk actions" button', () => client.waitForAndClick(AddressesPage.addresses_bulk_actions_button));
      test('should click on the "Delete selected" button', () => client.waitForAndClick(AddressesPage.addresses_delete_selected_link));
      test('should verify the appearance of the green validation', () => client.checkTextValue(AddressesPage.addresses_success_alert, '×\nThe selection has been successfully deleted.'));
    }, 'common_client');
  }
};
