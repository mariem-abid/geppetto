
const authentication = require('../../../common_scenarios/authentication');
const tax = require('../../../common_scenarios/improve/international/taxes');
const onBoarding = require('../../../common_scenarios/onboarding');

let taxData = {
  name: 'VAT',
  tax_value: '19'
};

scenario('Create, edit, delete and check "Tax rules" in the Back Office', () => {
  authentication.signInBO('tax');
  onBoarding.closeOnBoardingModal();
  tax.createTaxRule(taxData.name, taxData.tax_value);
  tax.checkTaxRule(taxData.name);
  tax.editTaxRule(taxData.name, taxData.name + 'update');
  tax.checkTaxRule(taxData.name + 'update');
  tax.deleteTaxRule(taxData.name + 'update');
  tax.createTaxRule(taxData.name, taxData.tax_value);
  tax.deleteTaxRuleWithBulkAction(taxData.name);
  authentication.signOutBO();
}, 'common_client',true);