const {ProductPage} = require('../../selectors/BO/catalog/productsPage');
const {Menu} = require('../../selectors/BO/menu');

scenario('Test: PR-9466', client => {
  scenario('Login in the Back Office', client => {
    test('should open the browser', async () => {
      await client.open();
      await client.startTracing('9466');
    });
    test('shoud go to the Back office', () => client.accessToBO());
    test('shoud login successfully in the Back office', () => client.signInBO());
  }, 'common_client');
  scenario('Create product with combinations', client => {
    test('should go to "Catalog" page', async () => {
      await client.waitForAndClick(Menu.Sell.Catalog.catalog_menu, 1000);
      await client.waitForAndClick(Menu.Sell.Catalog.products_submenu, 1000);
    });
    test('should click on "New product" button', () => client.waitForAndClick(ProductPage.new_product_button));
    test('should set the "Name" input', () => client.waitForAndType(ProductPage.product_name_input, 'Product' + global.dateTime, 2000));
    test('should select "Product with combinations"', () => client.waitForAndClick(ProductPage.variations_type_button));
    test('should close the symfony toolbar', async () => {
      await page.waitFor(2000);
      const exist = await page.$(ProductPage.symfony_toolbar, {visible: true});
      if (exist !== null) {
        await page.click(ProductPage.symfony_toolbar);
      }
    });
    test('should click on "Save" button', () => client.waitForAndClick(ProductPage.save_button, 2000));
    test('should verify the appearance of the green validation', () => client.checkTextValue(ProductPage.validation_msg, 'Settings updated.'));
    test('should go to "Combinations" tab', () => client.waitForAndClick(ProductPage.combinations_tab));
    test('should choose the combinations', async () => {
      await client.waitForAndClick(ProductPage.combination_size_s, 1000);
      await client.waitForAndClick(ProductPage.combination_size_m, 1000);
    });
    test('should click on "Generate" button', async () => {
      await client.checkBrowserMessage('');
      await client.waitForAndClick(ProductPage.generate_button, 3000);
    });
  }, 'common_client');
}, 'common_client', true);
