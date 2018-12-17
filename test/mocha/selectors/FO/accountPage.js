module.exports = {
  AccountPage: {
    sign_tab: '#checkout-personal-information-step  li:nth-child(3) > a',
    signin_email_input: '#login-form input[name="email"]',
    signin_password_input: '#login-form input[name="password"]',
    continue_button: '#login-form button.continue',
    click_no_account: '#content div.no-account a',
    first_name_input: 'input[name="firstname"]',
    last_name_input: 'input[name="lastname"]',
    email_address_input: '#customer-form input[name="email"]',
    password_input: 'input[name="password"]',
    save_button: '#customer-form button[type="submit"]',
    identity_link:'#identity-link',
    birthday_input: '#customer-form input[name="birthday"]',
    gender_radio_button: '#customer-form > section > div:nth-child(2) label:nth-child(2)  input[type="radio"]',
    danger_alert: '#customer-form li[class*=alert-danger]',
    add_first_address_link:'#address-link',
    adr_address:'#content  input[name="address1"]',
    adr_postcode:'#content input[name=postcode]',
    adr_city:'#content input[name=city]',
    adr_save:'#content footer > button',
    save_notification:'#notifications li',
    adr_update: 'a[data-link-action="edit-address"]',
    address_link:'#addresses-link',
    address_information:'#address-%ID address',
    addresses_warning: '#notifications li',

  }
};