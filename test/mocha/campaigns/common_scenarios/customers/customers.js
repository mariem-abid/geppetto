const {HomePage} = require('../../../selectors/FO/homePage');
const {AccountPage} = require('../../../selectors/FO/accountPage');
const {Menu} = require('../../../selectors/BO/menu');
const {Customers} = require('../../../selectors/BO/customers/customers/customers');

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
  async deleteCustomerBO(customerData) {
    //Migrate "Customers > Customers" page "https://github.com/PrestaShop/PrestaShop/issues/10559"
    scenario('Delete customer', client => {
      test('should go to the "Customers" page', async () => {
        await client.waitForAndClick(Menu.Sell.Customers.customers_menu);
        await client.waitForAndClick(Menu.Sell.Customers.customers_submenu, 1000);
      });
      test('should search for the customer email in the "Customers list"', async () => {
        await client.isVisible(Customers.customer_filter_by_email_input, 1000);
        if (global.visible) {
          await client.search(Customers.customer_filter_by_email_input, global.dateTime + customerData.email_address);
        }
      });
      test('should click on "Delete" button', async () => {
        await client.waitForAndClick(Customers.dropdown_toggle, 1000);
        await client.confirmationDialog();
        await client.waitForAndClick(Customers.delete_button, 1000);
      });
      test('should choose the option that not allows customers to register again with the same email address', () => client.waitForAndClick(Customers.delete_second_option));
      test('should click on "Delete" button', () => client.waitForAndClick(Customers.delete_confirmation_button));
      test('should verify the appearance of the green validation', () => client.checkTextValue(Customers.success_panel, '× Successful deletion.', 'equal', 2000));
      test('should click on "Reset" button', () => client.waitForAndClick(Customers.reset_button));
    }, 'common_client');
  }
};