const {HomePage} = require('../../../selectors/FO/homePage');
const {AccountPage} = require('../../../selectors/FO/accountPage');
const {Menu} = require('../../../selectors/BO/menu');
const {CustomersPage} = require('../../../selectors/BO/customers/customers/customersPage');

/****Example of customer data ****
 * let customerData = {
 *  first_name: 'demo',
 *  last_name: 'demo',
 *  email_address: 'demo@prestashop.com',
 *  password: '123456789',
 *  birthday:{
 *      day:'18',
 *      month:'12',
 *      year:'1991'
 *  }
 * };
 */
module.exports = {
  async createCustomerFO(customerData) {
    scenario('Create "Customer"', client => {
      test('should click on "Sign in" button ', () => client.waitForAndClick(HomePage.sign_in_button));
      test('should click on "No account"', () => client.waitForAndClick(AccountPage.click_no_account));
      test('should set the "First name" input', () => client.waitForAndSetValue(AccountPage.first_name_input, customerData.first_name));
      test('should set the "Last name" input', () => client.waitForAndSetValue(AccountPage.last_name_input, customerData.last_name));
      test('should set the "Email" input', () => client.waitForAndSetValue(AccountPage.email_address_input, global.dateTime + customerData.email_address));
      test('should set the "Password" input', () => client.waitForAndSetValue(AccountPage.password_input, customerData.password));
      test('should click on "Save" button', () => client.waitForAndClick(AccountPage.save_button));
    }, 'common_client');
  },
  async createCustomer(customerData) {
    scenario('Create "Customer"', client => {
      test('should go to the "Customers" page', () => client.goToSubtabMenuPage(Menu.Sell.Customers.customers_menu_link, Menu.Sell.Customers.customers_submenu_link, 1000));
      test('should click on "Add new customer" button', () => client.waitForAndClick(CustomersPage.customers_add_new_customer_link));
      test('should choose the "Social title" radio', () => client.waitForAndClick(CustomersPage.customers_first_social_title_radio));
      test('should set the "First name" input', () => client.waitForAndSetValue(CustomersPage.customers_first_name_input_field, customerData.first_name));
      test('should set the "Last name" input', () => client.waitForAndSetValue(CustomersPage.customers_last_name_input_field, customerData.last_name));
      test('should set the "Email" input', () => client.waitForAndSetValue(CustomersPage.customers_email_input_field, global.dateTime + customerData.email_address));
      test('should set the "Password" input', () => client.waitForAndSetValue(CustomersPage.customers_password_input_field, customerData.password));
      test('should set the customer "Birthday"', async () => {
        await client.waitForAndSelect(CustomersPage.customers_birthday_day_select, customerData.birthday.day);
        await client.waitForAndSelect(CustomersPage.customers_birthday_month_select, customerData.birthday.month);
        await client.waitForAndSelect(CustomersPage.customers_birthday_year_select, customerData.birthday.year);
      });
      test('should activate "Partner offers" option ', () => client.waitForAndClick(CustomersPage.customers_partner_offers_yes_label));
      test('should click on "Save" button', () => client.waitForAndClick(CustomersPage.customers_save_button));
      test('should verify the appearance of the green validation', () => client.checkTextValue(CustomersPage.customers_success_alert, '×\nSuccessful creation.'));
    }, 'common_client');
  },
  async checkCustomerBO(customerData) {
    scenario('Check the customer creation in the Back Office', client => {
      test('should check the email existence in the "Customers list"', async () => {
        await client.isVisible(CustomersPage.customers_filter_email_input_field);
        await client.search(CustomersPage.customers_filter_email_input_field, global.dateTime + customerData.email_address, 1000);
        await client.checkExistence(CustomersPage.customers_customer_column.replace('%ROW', 1).replace('%COL', 6), global.dateTime + customerData.email_address);
      });
    }, 'common_client');
  },
  /**
   * This function allows you to search for a customer by his email and edit it
   * @param customerEmail customer mail address
   * @param editCustomerData : customer new data
   * @returns {*}
   */
  async editCustomer(customerData, editCustomerData) {
    scenario('Edit Customer', client => {
      test('should go to the "Customers" page', () => client.goToSubtabMenuPage(Menu.Sell.Customers.customers_menu_link, Menu.Sell.Customers.customers_submenu_link, 1000));
      test('should check the email existence in the "Customers list"', async () => {
        await client.isVisible(CustomersPage.customers_filter_email_input_field);
        await client.search(CustomersPage.customers_filter_email_input_field, global.dateTime + customerData.email_address, 2000);
      });
      test('should click on "Edit" button', () => client.waitForAndClick(CustomersPage.customers_edit_link.replace('%ROW', 1)));
      test('should choose the "Social title" radio', () => client.waitForAndClick(CustomersPage.customers_first_social_title_radio));
      test('should set the new "First name" input', () => client.waitForAndSetValue(CustomersPage.customers_first_name_input_field, editCustomerData.first_name));
      test('should set the new "Last name" input', () => client.waitForAndSetValue(CustomersPage.customers_last_name_input_field, editCustomerData.last_name));
      test('should set the new "Email" input', () => client.waitForAndSetValue(CustomersPage.customers_email_input_field, global.dateTime + editCustomerData.email_address));
      test('should set the new "Password" input', () => client.waitForAndSetValue(CustomersPage.customers_password_input_field, editCustomerData.password));
      test('should set the new customer "Birthday"', async () => {
        await client.waitForAndSelect(CustomersPage.customers_birthday_day_select, editCustomerData.birthday.day);
        await client.waitForAndSelect(CustomersPage.customers_birthday_month_select, editCustomerData.birthday.month);
        await client.waitForAndSelect(CustomersPage.customers_birthday_year_select, editCustomerData.birthday.year);
      });
      test('should click on "Save" button', () => client.waitForAndClick(CustomersPage.customers_save_button));
      test('should verify the appearance of the green validation', () => client.checkTextValue(CustomersPage.customers_success_alert, '×\nSuccessful update.'));
    }, 'common_client');
  },
  async deleteCustomer(customerEmail, confirmationDialog = false) {
    scenario('Delete customer', client => {
      test('should go to the "Customers" page', () => client.goToSubtabMenuPage(Menu.Sell.Customers.customers_menu_link, Menu.Sell.Customers.customers_submenu_link, 1000));
      test('should search for the customer email in the "Customers list"', async () => {
        await client.isVisible(CustomersPage.customers_filter_email_input_field);
        await client.search(CustomersPage.customers_filter_email_input_field, global.dateTime + customerEmail);
      });
      test('should click on "dropdown toggle" button', () => client.waitForAndClick(CustomersPage.customers_dropdown_button.replace('%ROW', 1), 1000));
      if (confirmationDialog) {
        test('should accept the confirmation alert', () => client.confirmationDialog());
      }
      test('should click on "Delete" button', () => client.waitForAndClick(CustomersPage.customers_delete_link.replace('%ROW', 1), 1000));
      test('should choose the option that allows customers to register again with the same email address', () => client.waitForAndClick(CustomersPage.customers_first_delete_method_radio));
      test('should click on "Delete" button', () => client.waitForAndClick(CustomersPage.customers_delete_button));
      test('should verify the appearance of the green validation', () => client.checkTextValue(CustomersPage.customers_success_alert, '×\nSuccessful deletion.', 'equal', 2000));
    }, 'common_client');
  },
  async deleteCustomerWithBulkActions(customerEmail) {
    scenario('Delete customer with bulk actions', client => {
      test('should go to the "Customers" page', () => client.goToSubtabMenuPage(Menu.Sell.Customers.customers_menu_link, Menu.Sell.Customers.customers_submenu_link, 1000));
      test('should search for the customer email in the "Customers list"', async () => {
        await client.isVisible(CustomersPage.customers_filter_email_input_field);
        await client.search(CustomersPage.customers_filter_email_input_field, global.dateTime + customerEmail);
      });
      test('should select the searched client', () => client.waitForAndClick(CustomersPage.customers_customer_checkbox.replace('%ROW', 1)));
      test('should click on the "Bulk actions" button', () => client.waitForAndClick(CustomersPage.customers_bulk_actions_button, 1000));
      test('should click on the "Delete selected" button', () => client.waitForAndClick(CustomersPage.customers_delete_selected_link));
      test('should choose the option that allows customers to register again with the same email address', () => client.waitForAndClick(CustomersPage.customers_first_delete_method_radio));
      test('should click on "Delete" button', () => client.waitForAndClick(CustomersPage.customers_delete_button));
      test('should verify the appearance of the green validation', () => client.checkTextValue(CustomersPage.customers_success_alert, '×\nThe selection has been successfully deleted.'));
    }, 'common_client');
  },
  async checkCustomerFO(client, customerData) {
    test('should check the customer "First name"', () => client.checkAttributeValue(AccountPage.first_name_input, 'value', customerData.first_name, 'equal', 1000));
    test('should check the customer "Last name"', () => client.checkAttributeValue(AccountPage.last_name_input, 'value', customerData.last_name));
    test('should check that the customer "Email" is equal to "' + global.dateTime + customerData.email_address + '"', () => client.checkAttributeValue(AccountPage.email_address_input, 'value', global.dateTime + customerData.email_address));
    test('should check that the customer "Birthday" is equal to "' + customerData.birthday.month + '/' + customerData.birthday.day + '/' + customerData.birthday.year + '"', () => client.checkAttributeValue(AccountPage.birthday_input, 'value', customerData.birthday.month + '/' + customerData.birthday.day + '/' + customerData.birthday.year, "contain"));
  }
};