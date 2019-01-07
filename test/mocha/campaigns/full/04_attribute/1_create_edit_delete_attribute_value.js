const {Dashboard} = require('../../../selectors/BO/dashboardPage');
const authentication = require('../../common_scenarios/authentication');
const onBoarding = require('../../common_scenarios/onboarding');
const attribute = require('../../common_scenarios/catalog/attribute');
const product = require('../../common_scenarios/catalog/product');

let productData = [{
  name: 'Att',
  quantity: "10",
  priceHT: '5',
  pictures: [
    'image_test.jpg',
  ],
  reference: 'att',
  attribute: {
    1: {
      name: 'attribute',
      variation_quantity: '10'
    }
  }
}, {
  name: 'Att2',
  quantity: "10",
  priceHT: '5',
  pictures: [
    'image_test.jpg',
  ],
  reference: 'att',
  attribute: {
    1: {
      name: 'attribute',
      variation_quantity: '10'
    }
  }
}];

let attributeData = [{
  name: 'attribute',
  public_name: 'attribute',
  type: 'radio',
  values: {
    1: {
      value: '10'
    },
    2: {
      value: '20'
    },
    3: {
      value: '30'
    }
  }
}, {
  name: 'attribute2',
  public_name: 'attribute',
  type: 'radio',
  values: {
    1: {
      value: '10'
    },
    2: {
      value: '20'
    },
    3: {
      value: '30'
    }
  }
}];

scenario('Create, edit and delete "Attribute"', () => {
  /* Create attribute */
  authentication.signInBO('attribute');
  onBoarding.closeOnBoardingModal();
  attribute.createAttribute(attributeData[0]);
  product.createProduct(productData[0]);

  /* Check the created attribute */
  scenario('Login in the Front Office', client => {
    test('should click on "View my shop" button', async () => {
      await client.waitFor(4000);
      await client.waitForAndClick(Dashboard.dashboard_view_my_shop_link);
    });
    test('should switch to the new window', () => client.switchWindow(1));
    test('should login successfully in the Front Office', () => client.signInFO());
  }, 'common_client');
  attribute.checkAttributeInFO(productData[0].name, attributeData[0]);

  /* Update the created attribute */
  scenario('Go back to the Back Office', client => {
    test('should go back to the Back Office', () => client.switchWindow(0));
  }, 'common_client');
  attribute.updateAttribute(attributeData[0]);

  /* Check the updated attribute */
  scenario('Go back to the Front Office', client => {
    test('should go back to the Front Office', () => client.switchWindow(1));
  }, 'common_client');
  attribute.checkAttributeInFO(productData[0].name, attributeData[0]);

  /* Delete attribute value */

  scenario('Go back to the Back Office', client => {
    test('should go back to the Back Office', () => client.switchWindow(0));
  }, 'common_client');
  attribute.deleteAttributeValue(attributeData[0]);


  /* Check the deleted attribute value */
  scenario('Go back to the Front Office', client => {
    test('should go back to the Front Office', () => client.switchWindow(1));
  }, 'common_client');
  attribute.checkAttributeInFO(productData[0].name, attributeData[0]);

  /* Delete the created attribute */
  scenario('Go back to the Back Office', client => {
    test('should go back to the Back Office', () => client.switchWindow(0));
  }, 'common_client');
  attribute.deleteAttribute(attributeData[0]);

  /* Check the deleted attribute */
  scenario('Go back to the Front Office', client => {
    test('should go back to the Front Office', () => client.switchWindow(1));
  }, 'common_client');
  attribute.checkDeletedAttributeInFO(productData[0].name);
  authentication.signOutFO();
  scenario('Go back to the Back Office', client => {
    test('should go back to the Back Office', () => client.switchWindow(0));
  }, 'common_client');
  authentication.signOutBO();
}, 'common_client', true);

scenario('Delete "Attribute" with bulk actions', () => {

  authentication.signInBO('attribute');
  onBoarding.closeOnBoardingModal();
  attribute.createAttribute(attributeData[1]);
  product.createProduct(productData[1]);
  attribute.attributeBulkActions(attributeData[1], 'delete');

  scenario('Login in the Front Office', client => {
    test('should click on "View my shop" button', async () => {
      await client.waitFor(4000);
      await client.waitForAndClick(Dashboard.dashboard_view_my_shop_link);
    });
    test('should switch to the new window', () => client.switchWindow(1));
  }, 'common_client');

  attribute.checkDeletedAttributeInFO(productData[1].name);
  scenario('Go back to the Back Office', client => {
    test('should go back to the Back Office', () => client.switchWindow(0));
  }, 'common_client');
  authentication.signOutBO();
}, 'common_client', true);
