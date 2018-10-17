const authentication = require('../common_scenarios/authentication');
const {Menu} = require('../../selectors/BO/menu');
const {AddProduct} = require('../../selectors/BO/catalog/products/addProduct');
const {Catalog} = require('../../selectors/BO/catalog/products/catalog');

let productData = {
  name: 'Product',
  pictures: [
    '1.png'
  ]
};

/** This scenario is based on the bug described in this PR
 * https://github.com/PrestaShop/PrestaShop/pull/11032
 */

scenario('This scenario is based on the bugs described on this PR: https://github.com/PrestaShop/PrestaShop/pull/11032', () => {
  authentication.signInBO('10968');
  scenario('Go to the create new product page and  check that the edition form is completely displayed', client => {
    test('should go to "Catalog" page', async() => {
      await client.waitForAndClick(Menu.Sell.Catalog.catalog_menu);
      await client.waitForAndClick(Menu.Sell.Catalog.products_submenu, 1000);
    });
    test('should click on "New product" button', () => client.waitForAndClick(Catalog.add_new_button, 2000));
    test('should set the "Name" input', () => client.waitForAndType(AddProduct.Basic_settings.name_input, productData.name));
    test('should upload the product picture', () => client.uploadFile(AddProduct.Basic_settings.files_input, dataFileFolder, productData.pictures));
    test('should click on the second picture', () => client.waitForAndClick(AddProduct.Basic_settings.click_image.replace('%ID', 4), 2000));
    test('should get the bounding box of "images dropzone"', () => client.getBoundingBox(AddProduct.Basic_settings.images_dropzone, 3000, 'imageDropzone'));
    test('should get the bounding box of "save images settings" button', () => client.getBoundingBox(AddProduct.Basic_settings.save_image_settings_button, 2000, 'saveImageSettings'));
    test('should get the bounding box of "delete image " button', () => client.getBoundingBox(AddProduct.Basic_settings.delete_image_button, 2000, 'deleteImageButton'));
    test('should Check if the save images settings button is well displayed', async() => {
      global.tab['imageDropzone'].y < global.tab['saveImageSettings'].y ? global.correctlyDisplayed = true : global.correctlyDisplayed = false;
      await expect(global.correctlyDisplayed).to.be.true;
    });
    test('should Check if the delete image button is well displayed', async() => {
      global.tab['imageDropzone'].y < global.tab['deleteImageButton'].y ? global.correctlyDisplayed = true : global.correctlyDisplayed = false;
      await expect(global.correctlyDisplayed).to.be.true;
    });
  }, 'common_client');
  authentication.signOutBO();
}, 'common_client', true);
