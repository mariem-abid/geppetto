const authentication = require('../../common_scenarios/authentication');
const onBoarding = require('../../common_scenarios/onboarding');
const discount = require('../../common_scenarios/catalog/discount');

let cartRuleData = [
  {
    name: 'Percent',
    customer_email: 'pub@prestashop.com',
    minimum_amount: 20,
    type: 'percent',
    reduction: 50,
    confirmationDialog: 'true'
  },
  {
    name: 'Amount',
    customer_email: 'pub@prestashop.com',
    minimum_amount: 20,
    type: 'amount',
    reduction: 20,
    confirmationDialog: 'false'
  }
];

scenario('Create, edit, check and delete "Cart Rule" in the Back Office', () => {
  authentication.signInBO('discount');
  onBoarding.closeOnBoardingModal();
  for (let i = 0; i < cartRuleData.length; i++) {
    discount.createCartRule(cartRuleData[i], 'code' + (i + 1));
    discount.checkCartRule(cartRuleData[i], 'code' + (i + 1));
    discount.editCartRule(cartRuleData[i]);
    discount.checkCartRule(cartRuleData[i], 'code' + (i + 1));
    discount.deleteCartRule(cartRuleData[i]);
  }
  authentication.signOutBO();
}, 'common_client', true);
