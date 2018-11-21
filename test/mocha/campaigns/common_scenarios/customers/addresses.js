const {Menu} = require('../../../selectors/BO/menu');
const {Addresses} = require('../../../selectors/BO/customers/customers/addresses');

module.exports = {
  async deleteAddressBO(customerData) {
    scenario('Delete customer address', client => {
      test('should go to the "Addresses" page', async () => {
        await client.waitForAndClick(Menu.Sell.Customers.customers_menu);
        await client.waitForAndClick(Menu.Sell.Customers.addresses_submenu, 1000);
      });
      test('should search for the customer first name in the "Addresses list"', async () => {
        await client.isVisible(Addresses.address_filter_by_first_name_input, 1000);
        if (global.visible) {
          await client.search(Addresses.address_filter_by_first_name_input, customerData.first_name);
        }
      });
      test('should click on "Delete" button', async () => {
        await client.waitForAndClick(Addresses.dropdown_toggle, 1000);
        await client.confirmationDialog();
        await client.waitForAndClick(Addresses.delete_button, 1000);
      });
      test('should verify the appearance of the green validation', () => client.checkTextValue(Addresses.success_panel, '× Successful deletion.', 'equal', 2000));
      test('should click on "Reset" button', () => client.waitForAndClick(Addresses.reset_button));
    }, 'common_client');
  }
};