const {Menu} = require('../../../../selectors/BO/menu');
const {AddressesPage} = require('../../../../selectors/BO/customers/addresses/addresses');
const {Dashboard} = require('../../../../selectors/BO/dashboardPage');
const {HomePage} = require('../../../../selectors/FO/homePage');
const {AuthenticationFO} = require('../../../../selectors/FO/authentication');
const {AccountPage} = require('../../../../selectors/FO/accountPage');
const authentication = require('../../../common_scenarios/authentication');
const onBoarding = require('../../../common_scenarios/onboarding');
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

let addressData = {
  email: global.email,
  id_number: '123456789',
  address_alias: 'Ma super address',
  first_name: 'demo',
  last_name: 'demo',
  company: 'prestashop',
  vat_number: '0123456789',
  address: '12 rue d\'amsterdam',
  second_address: 'RDC',
  ZIP: '75009',
  city: 'Paris',
  country: '8',
  home_phone: '0123456789',
  other: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
};

let editAddressData = {
  email: 'pub@prestashop.com',
  id_number: '987654321',
  address_alias: 'Ma super new address',
  first_name: 'demo',
  last_name: 'demo',
  company: 'prestashop',
  vat_number: '9876543210',
  address: '125 rue de marseille',
  second_address: 'RDC',
  ZIP: '75500',
  city: 'Marseille',
  country: '8',
  home_phone: '9876543210',
  mobile_phone: '9876543210',
  other: 'azerty'
};

scenario('Create, Edit, delete "Address"', () => {
  authentication.signInBO(('address'));
  onBoarding.closeOnBoardingModal();
  customer.createCustomer(customerData);
  scenario('Edit, delete and delete with bulk actions "Address"', () => {

    scenario('Go to "Addresses" page', client => {
      test('should go to the "Addresses" page', () => client.goToSubtabMenuPage(Menu.Sell.Customers.customers_menu_link, Menu.Sell.Customers.addresses_submenu_link));
      test('should click on "Add new address" button', () => client.waitForAndClick(AddressesPage.addresses_add_new_addresse_link));
    }, 'common_client');

    address.checkAddressRequiredInput(addressData, 'first');
    address.checkAddressBO(addressData);

    scenario('Change the required fields addresses parameter', client => {
      test('should click on "Set required fields for this section" button', () => client.waitForAndClick(AddressesPage.addresses_set_required_fields_link));
      test('should click on "company" check box button', () => client.waitForAndClick(AddressesPage.addresses_company_checkbox));
      test('should click on "Save" button', () => client.waitForAndClick(AddressesPage.addresses_save_required_fields_button));
      test('should verify the appearance of the green validation', () => client.checkTextValue(AddressesPage.addresses_success_alert, '×\nSuccessful update.'));
    }, 'common_client');

    scenario('Add new address', client => {
      test('should click on "Add new address" button', () => client.waitForAndClick(AddressesPage.addresses_add_new_addresse_link));
    }, 'common_client');

    address.checkAddressRequiredInput(addressData, 'second');

    scenario('Change the required fields addresses parameter', client => {
      test('should click on "Set required fields for this section" button', () => client.waitForAndClick(AddressesPage.addresses_set_required_fields_link));
      test('should check all fields names', () => client.waitForAndClick(AddressesPage.addresses_check_all_required_fields_checkbox));
      test('should click on "Save" button', () => client.waitForAndClick(AddressesPage.addresses_save_required_fields_button));
    }, 'common_client');

    scenario('Add new address', client => {
      test('should click on "Add new address" button', () => client.waitForAndClick(AddressesPage.addresses_add_new_addresse_link));
    }, 'common_client');

    address.checkAddressRequiredInput(addressData, 'allInput');

    scenario('Disable all required field addresses parameter', client => {
      test('should go to the "Addresses" page', () => client.goToSubtabMenuPage(Menu.Sell.Customers.customers_menu_link, Menu.Sell.Customers.addresses_submenu_link));
      test('should click on "Set required fields for this section" button', () => client.waitForAndClick(AddressesPage.addresses_set_required_fields_link));
      test('should disable all fields names', async () => {
        await client.waitForAndClick(AddressesPage.addresses_check_all_required_fields_checkbox);
        await client.waitForAndClick(AddressesPage.addresses_check_all_required_fields_checkbox);
      });
      test('should click on "Save" button', () => client.waitForAndClick(AddressesPage.addresses_save_required_fields_button));
    }, 'common_client');

    scenario('Delete the second address created', client => {
      test('should check the address existence in the "addresses list"', async () => {
        await client.isVisible(AddressesPage.addresses_filter_address_input_field, 1000);
        await client.search(AddressesPage.addresses_filter_address_input_field, addressData.address + " " + global.dateTime);
      });
      test('Should click on "Delete" button of the second address', async () => {
        await client.waitForAndClick(AddressesPage.addresses_dropdown_button.replace('%ROW', 1));
        await client.confirmationDialog();
        await client.waitForAndClick(AddressesPage.addresses_delete_link.replace('%ROW', 1));
      });
      test('should get the address ID', () => client.getTextInVar(AddressesPage.addresses_address_column.replace('%ROW', 1).replace('%COL', 2), 'address_id'));
    }, 'common_client');
  }, 'common_client');

  scenario('Edit address', client => {
    scenario('Check customer address in the Front Office', client => {
      test('should open the Front Office in new window', () => client.accessToFO(Dashboard.dashboard_view_my_shop_link, 1));
      test('should set the shop language to "English"', () => client.switchShopLanguageInFo('en'));
      test('should click on "sign in" button', () => client.waitForAndClick(HomePage.sign_in_button));
      test('should set the "Email" input', () => client.waitForAndSetValue(AuthenticationFO.email_input, global.dateTime + customerData.email_address));
      test('should set the "Password" input', () => client.waitForAndSetValue(AuthenticationFO.password_input, customerData.password));
      test('should click on "Sign In" button', () => client.waitForAndClick(AuthenticationFO.login_button));
      test('should click on "Addresses" button', () => client.waitForAndClick(AccountPage.address_link));
      test('should check "Address" information', async () => {
        await client.checkTextValue(AccountPage.address_information.replace('%ID', global.tab['address_id']), addressData.first_name + " " + addressData.last_name, "contain");
        await client.checkTextValue(AccountPage.address_information.replace('%ID', global.tab['address_id']), addressData.company, "contain");
        await client.checkTextValue(AccountPage.address_information.replace('%ID', global.tab['address_id']), addressData.address + " " + global.dateTime, "contain");
        await client.checkTextValue(AccountPage.address_information.replace('%ID', global.tab['address_id']), addressData.second_address, "contain");
        await client.checkTextValue(AccountPage.address_information.replace('%ID', global.tab['address_id']), addressData.ZIP + " " + addressData.city, "contain");
        await client.switchWindow(0);
      });
      address.editAddress(addressData.address, editAddressData);
    }, 'common_client');

    scenario('Check the edited address in the Back Office', client => {
      test('should go to the Front Office and refresh the page', async () => {
        await client.switchWindow(1);
        await client.reload();
      });
      test('should check "Address" informations', async () => {
        await client.checkTextValue(AccountPage.address_information.replace('%ID', global.tab['address_id']), editAddressData.first_name + " " + editAddressData.last_name, "contain");
        await client.checkTextValue(AccountPage.address_information.replace('%ID', global.tab['address_id']), editAddressData.company, "contain");
        await client.checkTextValue(AccountPage.address_information.replace('%ID', global.tab['address_id']), editAddressData.address + " " + global.dateTime, "contain");
        await client.checkTextValue(AccountPage.address_information.replace('%ID', global.tab['address_id']), editAddressData.second_address, "contain");
        await client.checkTextValue(AccountPage.address_information.replace('%ID', global.tab['address_id']), editAddressData.ZIP + " " + editAddressData.city, "contain");
        await client.switchWindow(0);
      });
    }, 'common_client');
  }, 'common_client');

  scenario('Delete address', client => {
    address.deleteAddress(editAddressData.address);
    scenario('Check that no results appear', client => {
      test('should Check that no results appear', () => client.isExisting(AddressesPage.addresses_empty_bloc));
    }, 'common_client');
    scenario('Check the deleted address in the Front Office', client => {
      test('should check that the address has been deleted in the Front Office', async () => {
        await client.switchWindow(1);
        await client.reload();
      });
      test('should Check that no results appear', async () => {
        await client.checkTextValue(AccountPage.addresses_warning, 'No addresses are available.', "contain");
        await client.switchWindow(0);
      });
    }, 'common_client');
  }, 'common_client');


  scenario('Delete address with bulk actions', client => {
    address.createAddress(addressData);
    address.checkAddressBO(addressData);


    scenario('Get the address ID', client => {
      test('should get the address ID', () => client.getTextInVar(AddressesPage.addresses_address_column.replace('%ROW', 1).replace('%COL', 2), 'address_id'));
    }, 'common_client');

    scenario('Check the created address in the Front Office', client => {
      test('should check that the address has been created in the Front Office', async () => {
        await client.switchWindow(1);
        await client.reload();
      });
      test('should check "Address" information', async () => {
        await client.checkTextValue(AccountPage.address_information.replace('%ID', global.tab['address_id']), addressData.first_name + " " + addressData.last_name, "contain");
        await client.checkTextValue(AccountPage.address_information.replace('%ID', global.tab['address_id']), addressData.company, "contain");
        await client.checkTextValue(AccountPage.address_information.replace('%ID', global.tab['address_id']), addressData.address + " " + global.dateTime, "contain");
        await client.checkTextValue(AccountPage.address_information.replace('%ID', global.tab['address_id']), addressData.second_address, "contain");
        await client.checkTextValue(AccountPage.address_information.replace('%ID', global.tab['address_id']), addressData.ZIP + " " + addressData.city, "contain");
        await client.switchWindow(0);
      });
    }, 'common_client');

    address.deleteAddressWithBulkActions(addressData.address);

    scenario('Check the deleted address in the Front Office', client => {
      test('should check that the address has been deleted in the Front Office', async () => {
        await client.switchWindow(1);
        await client.reload();
      });
      test('should Check that no results appear', async () => {
        await client.checkTextValue(AccountPage.addresses_warning, 'No addresses are available.', "contain");
        await client.switchWindow(0);
      });
    }, 'common_client');
  }, 'common_client');

  authentication.signOutBO();
}, 'common_client', true);
