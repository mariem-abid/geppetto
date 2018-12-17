const {AddressesPage} = require('../../../../selectors/BO/customers/addresses/addresses');
const {Menu} = require('../../../../selectors/BO/menu');
const {CustomersPage} = require('../../../../selectors/BO/customers/customers/customersPage');
const {Dashboard} = require('../../../../selectors/BO/dashboardPage');
const {HomePage} = require('../../../../selectors/FO/homePage');
const {AccountPage} = require('../../../../selectors/FO/accountPage');
const {AuthenticationFO} = require('../../../../selectors/FO/authentication');
const authentication = require('../../../common_scenarios/authentication');
const customer = require('../../../common_scenarios/customers/customers');
const address = require('../../../common_scenarios/customers/address');

let customerData = {
  first_name: 'demo',
  last_name: 'demo',
  email_address: global.email,
  password: '123456789',
  birthday: {
    day: '18',
    month: '12',
    year: '1991'
  }
};

let editCustomerData = {
  first_name: 'customerFirstName',
  last_name: 'customerLastName',
  email_address: 'customeremail@prestashop.com',
  password: '123456789',
  birthday: {
    day: '31',
    month: '10',
    year: '1994'
  }
};

scenario('Create, Edit, delete "Customer"', () => {
  authentication.signInBO('customer');
  customer.createCustomer(customerData);
  customer.checkCustomerBO(customerData);

  scenario('Check the customer creation in the Front Office', client => {
    test('should open the Front Office in new window', () => client.accessToFO(Dashboard.dashboard_view_my_shop_link, 1));
    test('should set the shop language to "English"', () => client.switchShopLanguageInFo('en'));
    test('should click on "sign in" button', () => client.waitForAndClick(HomePage.sign_in_button));
    test('should set the "Email" input', () => client.waitForAndSetValue(AuthenticationFO.email_input, global.dateTime + customerData.email_address));
    test('should set the "Password" input', () => client.waitForAndSetValue(AuthenticationFO.password_input, customerData.password));
    test('should click on "Sign In" button', () => client.waitForAndClick(AuthenticationFO.login_button));
    test('should click on "Information" button', () => client.waitForAndClick(AccountPage.identity_link));
    customer.checkCustomerFO(client, customerData);
    test('should go to the Back Office', () => client.switchWindow(0));
  }, 'common_client');

  customer.editCustomer(customerData, editCustomerData);
  customer.checkCustomerBO(editCustomerData);

  scenario('Check that the customer information is updated in the Front Office', client => {
    test('should go to the Front Office', () => client.switchWindow(1));
    test('should refresh the page', () => client.reload());
    customer.checkCustomerFO(client, editCustomerData);
    test('should go to the Back Office', () => client.switchWindow(0));
  }, 'common_client');

  address.createCustomerAddress(editCustomerData);
  scenario('Check the address creation', client => {
    test('should check the existence of the filter address input', () => client.isVisible(AddressesPage.addresses_filter_address_input_field));
    test('should search the customer by address', () => client.searchByAddress(AddressesPage, global.dateTime.toString()));
  }, 'customers/customer');
  scenario('Open addresses menu in a new window', client => {
    test('should open the menu "Customers - Addresses"', () => client.waitForAndClick(Menu.Sell.Customers.addresses_submenu_link, 1000, {button: 'middle'}));
  }, 'common_client');

  customer.deleteCustomer(editCustomerData.email_address, true);

  scenario('Check the customer deletion in the Back Office', client => {
    test('should go to the "Customers" page', () => client.goToSubtabMenuPage(Menu.Sell.Customers.customers_menu_link, Menu.Sell.Customers.customers_submenu_link, 1000));
    test('should search for the customer email in the "Customers list"', async () => {
      await client.isVisible(CustomersPage.customers_filter_email_input_field);
      await client.search(CustomersPage.customers_filter_email_input_field, global.dateTime + editCustomerData.email_address);
    });
    test('should check that there is no result', () => client.isExisting(CustomersPage.customers_empty_bloc, 2000));
  }, 'common_client');

  scenario('Verify that the address related to the deleted customer doesn\'t exist', client => {
    test('should go to "Addresses" page', () => client.switchWindow(2));
    test('should refresh the page', () => client.reload());
    test('should check that the deleted customer address doesn\'t exist', () => client.isExisting(AddressesPage.addresses_empty_bloc, 1000));
    test('should go to Customers page', () => client.switchWindow(1));
  }, 'common_client');

  scenario('Check the ability to create the same deleted customer from the Front Office', client => {
    test('should click on shop logo', () => client.waitForAndClick(HomePage.logo_home_page));
    test('should set the language of shop to "English"', () => client.switchShopLanguageInFo('en'));
    test('should click on "Sign in" button ', () => client.waitForAndClick(HomePage.sign_in_button));
    test('should click on "No account? Create one here" button', () => client.waitForAndClick(AccountPage.click_no_account, 2000));
    test('should check "Mrs" radio button', () => client.waitForAndClick(AccountPage.gender_radio_button));
    test('should set the "First Name" input', () => client.waitForAndSetValue(AccountPage.first_name_input, editCustomerData.first_name));
    test('should set the "Last Name" input', () => client.waitForAndSetValue(AccountPage.last_name_input, editCustomerData.last_name));
    test('should set the "Email" input', () => client.waitForAndSetValue(AccountPage.email_address_input, global.dateTime + editCustomerData.email_address));
    test('should set the "Password" input', () => client.waitForAndSetValue(AccountPage.password_input, editCustomerData.password));
    test('should set the "Birthday" input', () => client.waitForAndSetValue(AccountPage.birthday_input, editCustomerData.birthday.month + '/' + editCustomerData.birthday.day + '/' + editCustomerData.birthday.year));
    test('should click on "Save" button', () => client.waitForAndClick(AccountPage.save_button));
  }, 'common_client');

  scenario('Delete the created customer ', client => {
    test('should go to "Addresses" page', () => client.switchWindow(0));
    test('should go to the "Customers" page', () => client.goToSubtabMenuPage(Menu.Sell.Customers.customers_menu_link, Menu.Sell.Customers.customers_submenu_link, 1000));
    test('should search for the customer email in the "Customers list"', async () => {
      await client.isVisible(CustomersPage.customers_filter_email_input_field);
      await client.search(CustomersPage.customers_filter_email_input_field, global.dateTime + editCustomerData.email_address);
    });
    test('should click on "Delete" button', async () => {
      await client.waitForAndClick(CustomersPage.customers_dropdown_button.replace('%ROW', 1), 1000);
      await client.waitForAndClick(CustomersPage.customers_delete_link.replace('%ROW', 1), 1000);
    });
    test('should choose the option that Doesn\'t allows customers to register again with the same email address', () => client.waitForAndClick(CustomersPage.customers_second_delete_method_radio));
    test('should click on "Delete" button', () => client.waitForAndClick(CustomersPage.customers_delete_button));
    test('should verify the appearance of the green validation', () => client.checkTextValue(CustomersPage.customers_success_alert, '×\nSuccessful deletion.', 'equal', 2000));
    test('should go to the Front Office', () => client.switchWindow(1));
  }, 'common_client');

  scenario('Check the ability to create the same deleted customer from the Front Office', client => {
    test('should click on shop logo', () => client.waitForAndClick(HomePage.logo_home_page));
    test('should set the language of shop to "English"', () => client.switchShopLanguageInFo('en'));
    test('should click on "Sign in" button ', () => client.waitForAndClick(HomePage.sign_in_button));
    test('should click on "No account? Create one here" button', () => client.waitForAndClick(AccountPage.click_no_account, 2000));
    test('should check "Mrs" radio button', () => client.waitForAndClick(AccountPage.gender_radio_button));
    test('should set the "First Name" input', () => client.waitForAndSetValue(AccountPage.first_name_input, editCustomerData.first_name));
    test('should set the "Last Name" input', () => client.waitForAndSetValue(AccountPage.last_name_input, editCustomerData.last_name));
    test('should set the "Email" input', () => client.waitForAndSetValue(AccountPage.email_address_input, global.dateTime + editCustomerData.email_address));
    test('should set the "Password" input', () => client.waitForAndSetValue(AccountPage.password_input, editCustomerData.password));
    test('should set the "Birthday" input', () => client.waitForAndSetValue(AccountPage.birthday_input, editCustomerData.birthday.month + '/' + editCustomerData.birthday.day + '/' + editCustomerData.birthday.year));
    test('should click on "Save" button', () => client.waitForAndClick(AccountPage.save_button));
    test('should check that the warning message appears', () => client.checkTextValue(AccountPage.danger_alert, 'is already used', 'contain'));
    test('should go to the Back Office', () => client.switchWindow(0));
  }, 'common_client');

  customer.createCustomer(editCustomerData);
  customer.deleteCustomerWithBulkActions(editCustomerData.email_address);

  authentication.signOutBO();
}, 'common_client',true);