const {AddressPage} = require('../../../selectors/FO/addressPage');

module.exports = {
  async createAddressFO(addressData) {
    scenario('Create "Address"', client => {
      test('should set the "Address" input', () => client.waitForAndSetValue(AddressPage.address_input, addressData.address));
      test('should set the "ZIP" input', () => client.waitForAndSetValue(AddressPage.zip_input, addressData.ZIP));
      test('should set the "City" input', () => client.waitForAndSetValue(AddressPage.city_input, addressData.city));
      test('should click on "Save" button', () => client.waitForAndClick(AddressPage.continue_button));
    }, 'common_client');
  }
}