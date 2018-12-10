const authentication = require('../common_scenarios/authentication');
const product = require('../common_scenarios/catalog/product');
const {AddProductPage} = require('../../selectors/BO/catalog/products/addProduct');
const onBoarding = require('../common_scenarios/onboarding');

let productData = {
  name: 'P1',
  reference: 'P10169',
  quantity: '30',
  type: 'combination',
  priceHT: '10',
  pictures: [
    '1.png',
    '2.jpg'
  ]
};

/** This scenario is based on the bug described in this PR
 * https://github.com/PrestaShop/PrestaShop/pull/10169
 */

scenario('PR-10169: Check that the images is well displayed in the edit combination', () => {
  authentication.signInBO('10169');
  onBoarding.closeOnBoardingModal();
  product.createProduct(productData);
  scenario('Check the appearance of images in edit combination page', client => {
    test('should click on "Edit" icon', async () => {
      await client.getCombinationId(AddProductPage.Combination.combination_tr.replace('%POS', 1));
      await client.waitForAndClick(AddProductPage.Combination.edit_combination_icon.replace('%ID', combinationId), 2000);
    });
    for (let i = 0; i < productData.pictures.length; i++) {
      test('should check the appearance of the ' + client.stringifyNumber(i+1) + ' image in edit combination page', () => client.isExisting(AddProductPage.Combination.combination_image.replace('%ID', combinationId).replace('%POS', i+1)));
    }
    test('should check the number of images in edit combination page', () => client.checkTextValue(AddProductPage.Combination.combination_image_number.replace('%ID', combinationId), productData.pictures.length, 'contain', 3000));
  }, 'catalog/product');
  authentication.signOutBO();
}, 'common_client', true);