const {Dashboard} = require('../../../selectors/BO/dashboardPage');
const authentication = require('../../common_scenarios/authentication');
const product = require('../../common_scenarios/catalog/product');
const feature = require('../../common_scenarios/catalog/feature');
const onBoarding = require('../../common_scenarios/onboarding');

let productData = [{
  name: 'Feat',
  quantity: "10",
  priceHT: '5',
  pictures: [
    'image_test.jpg',
  ],
  reference: 'feat',
  feature: {
    name: 'Feature',
    value: 'Feature Value'
  }
}, {
  name: 'Feat2',
  quantity: "10",
  priceHT: '5',
  pictures: [
    'image_test.jpg',
  ],
  reference: 'feat',
  feature: {
    name: 'Feature2',
    value: 'Feature Value'
  }
}];

let featureData = [{
  name: 'Feature',
  values: {
    1: 'Feature Value'
  }
}, {
  name: 'Feature2',
  values: {
    1: 'Feature Value'
  }
}];


scenario('Create "Feature"', () => {
  /* Create feature */
  authentication.signInBO('feature');
  feature.createFeature(featureData[0]);
  product.createProduct(productData[0]);
  /* Check the created feature */
  scenario('Login in the Front Office', client => {
    test('should click on "View my shop" button', async () => {
      await client.waitFor(4000);
      await client.waitForAndClick(Dashboard.dashboard_view_my_shop_link);
    });
    test('should switch to the new window', () => client.switchWindow(1));
    test('should login successfully in the Front Office', () => client.signInFO());
  }, 'common_client');
  feature.checkFeatureInFO(productData[0].name, featureData[0]);

  /* Update the created feature */
  scenario('Go back to the Back Office', client => {
    test('should go back to the Back Office', () => client.switchWindow(0));
  }, 'common_client');
  feature.updateFeature(featureData[0]);

  /* Check the updated feature */
  scenario('Go back to the Front Office', client => {
    test('should go back to the Front Office', () => client.switchWindow(1));
  }, 'common_client');
  feature.checkFeatureInFO(productData[0].name, featureData[0]);

  /* Delete feature */
  scenario('Go back to the Back Office', client => {
    test('should go back to the Back Office', () => client.switchWindow(0));
  }, 'common_client');
  feature.deleteFeature(featureData[0]);

  /* Check the deleted feature */
  scenario('Go back to the Front Office', client => {
    test('should go back to the Front Office', () => client.switchWindow(1));
  }, 'common_client');
  feature.checkDeletedFeatureInFO(productData[0].name);
  authentication.signOutFO();
  scenario('Go back to the Back Office', client => {
    test('should go back to the Back Office', () => client.switchWindow(0));
  }, 'common_client');
  authentication.signOutBO();

}, 'common_client', true);

scenario('Delete "Feature" with bulk actions', () => {
  authentication.signInBO('feature');
  onBoarding.closeOnBoardingModal();
  feature.createFeature(featureData[1]);
  product.createProduct(productData[1]);
  feature.featureBulkActions(featureData[1], 'delete');
  scenario('Login in the Front Office', client => {
    test('should click on "View my shop" button', async () => {
      await client.waitFor(4000);
      await client.waitForAndClick(Dashboard.dashboard_view_my_shop_link);
    });
    test('should switch to the new window', () => client.switchWindow(1));
  }, 'common_client');
  feature.checkDeletedFeatureInFO(productData[1].name);
  scenario('Go back to the Back Office', client => {
    test('should go back to the Back Office', () => client.switchWindow(0));
  }, 'common_client');
  authentication.signOutBO();
}, 'common_client', true);

