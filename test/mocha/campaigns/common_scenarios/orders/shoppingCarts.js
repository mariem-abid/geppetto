const {Menu} = require('../../../selectors/BO/menu');
const {ShoppingCartsPage} = require('../../../selectors/BO/orders/shoppingCartsPage');

module.exports = {
  async checkShoppingCartsPage() {
    scenario('Check that "Shopping carts" page is well opened', client => {
      test('should go to the "Shopping Carts" page', async () => {
        await client.waitForAndClick(Menu.Sell.Orders.orders_menu);
        await client.waitForAndClick(Menu.Sell.Orders.shopping_carts_submenu, 1000);
      });
      test('should check that "Shopping carts" page is well opened', () => client.isExisting(ShoppingCartsPage.export_carts_button, 1000));
    }, 'common_client');
  }
};