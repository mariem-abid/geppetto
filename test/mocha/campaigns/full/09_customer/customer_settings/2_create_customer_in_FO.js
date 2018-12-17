const authentication = require('../../../common_scenarios/authentication');
const {HomePage} = require('../../../../selectors/FO/homePage');
const {AccountPage}= require('../../../../selectors/FO/accountPage');
const {AuthenticationFO}= require('../../../../selectors/FO/authentication');

let data = require('./../../../../datas/customer_and_address_data');

scenario('Create a customer in the Front Office', () => {
  authentication.openShop('customer');

  scenario('Create a customer account in the Front Office', client => {
    test('should change the Front Office language to "English"', () => client.switchShopLanguageInFo('en'));
    test('should click on the "Sign in" link', () => client.waitForAndClick(HomePage.sign_in_button));
     test('should click on "No account? Create one here" link', () => client.waitForAndClick(AccountPage.click_no_account));
     test('should choose a "Social title" option', () => client.waitForAndClick(AccountPage. gender_radio_button));
     test('should set the "First name" input', () => client.waitForAndSetValue(AccountPage.first_name_input, data.customer.firstname));
     test('should set the "Last name" input', () => client.waitForAndSetValue(AccountPage.last_name_input, data.customer.lastname));
     test('should set the "Email" input', () => client.waitForAndSetValue(AccountPage.email_address_input, 'new' + data.customer.email.replace("%ID", global.dateTime)));
     test('should set the "Password" input', () => client.waitForAndSetValue(AccountPage.password_input, data.customer.password));
     test('should click on "Save" button', () => client.waitForAndClick(AccountPage.save_button));
  }, 'common_client');

  authentication.signOutFO();
  scenario('Check the creation of customer account', client => {
    test('should change the Front Office language to "English"', () => client.switchShopLanguageInFo('en'));
    test('should login successfully with the created account', () => client.waitForAndClick(HomePage.sign_in_button));
    test('should set the "Email" input', () => client.waitForAndSetValue(AuthenticationFO.email_input, 'new' + data.customer.email.replace("%ID",global.dateTime)));
    test('should set the "Password" input', () => client.waitForAndSetValue(AuthenticationFO.password_input, data.customer.password));
    test('should click on "SIGN IN" button', () => client.waitForAndClick(AuthenticationFO.login_button));
  }, 'common_client');

  scenario('Create "Address"', client => {
    test('should click on "ADD FIRST ADDRESS" button', () => client.waitForAndClick(AccountPage.add_first_address_link));
    test('should set the "Address" input', () => client.waitForAndSetValue(AccountPage.adr_address, data.address.address));
    test('should set the "Zip/Postal Code" input', () => client.waitForAndSetValue(AccountPage.adr_postcode, data.address.postalCode));
    test('should set the "City" input', () => client.waitForAndSetValue(AccountPage.adr_city, data.address.city));
    test('should click on "SAVE" button', () => client.waitForAndClick(AccountPage.adr_save));
    test('should check that the success alert message is well displayed', () => client.checkTextValue(AccountPage.save_notification, 'Address successfully added!'));
  }, 'common_client');

  scenario('Check the creation of the address', client => {
    test('should click on "update" link', () => client.waitForAndClick(AccountPage.adr_update));
    test('should check that the "First name" of customer is equal to "John"', () => client.checkAttributeValue(AccountPage.first_name_input, 'value', data.customer.firstname,'equal',1000));
    test('should check that the "Last name" of customer is equal to "Doe"', () => client.checkAttributeValue(AccountPage.last_name_input, 'value', data.customer.lastname));
    test('should check that the "Address" of customer is equal to "16, Main street"', () => client.checkAttributeValue(AccountPage.adr_address, 'value', data.address.address));
    test('should check that the "Zip/Postal Code" of customer is equal to "75002"', () => client.checkAttributeValue(AccountPage.adr_postcode, 'value', data.address.postalCode));
    test('should check that the "City" of customer is equal to "Paris"', () => client.checkAttributeValue(AccountPage.adr_city, 'value', data.address.city));
    test('should go back to the home page', () => client.waitForAndClick(HomePage.logo_home_page));
  }, 'common_client');
   authentication.signOutFO();
}, 'common_client',true);
