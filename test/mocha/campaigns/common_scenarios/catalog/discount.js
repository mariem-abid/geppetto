const {Menu} = require('../../../selectors/BO/menu');
const {DiscountPage} = require('../../../selectors/BO/catalog/discount/discountPage');

module.exports = {
  async createCatalogPriceRules(name, type, reduction, quantity = 1) {
    scenario('Create catalog price rules', client => {
      test('should go to "Discounts" page', () => client.goToSubtabMenuPage(Menu.Sell.Catalog.catalog_menu_link, Menu.Sell.Catalog.discounts_submenu_link));
      test('should go to "Catalog Price Rules" page', () => client.waitForAndClick(DiscountPage.discounts_catalog_price_rules_tab));
      test('should click on "Add new catalog price rule"', () => client.waitForAndClick(DiscountPage.CatalogPriceRules.discounts_add_new_catalog_price_rules_link));
      test('should set the "Name" input', () => client.waitForAndSetValue(DiscountPage.CatalogPriceRules.discounts_catalog_price_rule_name_input_field, name));
      test('should set the "From quantity" input', () => client.waitForAndSetValue(DiscountPage.CatalogPriceRules.discounts_catalog_price_rule_from_quantity_input_field, quantity));
      test('should set the "Reduction type" input', () => client.waitForAndSelect(DiscountPage.CatalogPriceRules.discounts_catalog_price_rule_reduction_type_select, type));
      test('should set the "Reduction" input', () => client.waitForAndSetValue(DiscountPage.CatalogPriceRules.discounts_catalog_price_rule_reduction_input_field, reduction));
      test('should click on "save" button', () => client.waitForAndClick(DiscountPage.CatalogPriceRules.discounts_catalog_price_rule_save_button));
    }, 'common_client');
  },
  async deleteCatalogPriceRules(name) {
    scenario('Delete catalog price rules "' + name + '', client => {
      test('should go to "Discounts" page', () => client.goToSubtabMenuPage(Menu.Sell.Catalog.catalog_menu_link, Menu.Sell.Catalog.discounts_submenu_link, 1000));
      test('should go to "Catalog Price Rules" page', async () => {
        await client.waitForAndClick(DiscountPage.discounts_catalog_price_rules_tab);
        await client.isVisible(DiscountPage.CatalogPriceRules.discounts_catalog_price_rule_filter_name_input_field, 1000);
        await client.searchByName(DiscountPage.CatalogPriceRules.discounts_catalog_price_rule_filter_name_input_field, DiscountPage.CatalogPriceRules.discounts_catalog_price_rule_search_button, name);
      });
      test('should delete the catalog rule price', async () => {
        if (global.visible) {
          await client.waitForAndClick(DiscountPage.CatalogPriceRules.discounts_catalog_price_rule_dropdown_button.replace("%ROW", 1).replace("%COL", 13));
          await  client.confirmationDialog();
          await  client.waitForAndClick(DiscountPage.CatalogPriceRules.discounts_catalog_price_rule_delete_link.replace("%ROW", 1).replace("%COL", 13));
        }
        else {
          await client.waitForAndClick(DiscountPage.CatalogPriceRules.discounts_catalog_price_rule_dropdown_button.replace("%ROW", 1).replace("%COL", 12));
          await  client.confirmationDialog();
          await  client.waitForAndClick(DiscountPage.CatalogPriceRules.discounts_catalog_price_rule_delete_link.replace("%ROW", 1).replace("%COL", 12));
        }
      });
      test('should check the success message appear', () => client.checkTextValue(DiscountPage.discounts_success_alert, 'Successful deletion.', "contain"));
    }, 'catalog/discount');
  },

  /** Exemple of cart rule data
   * var cartRuleData = {
   *  name: 'cart_rule_name',
   *  customer_email: 'customer_email',
   *  minimum_amount: 'condition_minimum_amount',
   *  reduction_type: 'percent/amount',
   *  reduction: 'reduction_value'
   * };
   **/

  createCartRule(cartRuleData, promoCode) {
    scenario('Create a new "Cart Rule"', client => {
      test('should go to "Cart Rules" page', () => client.goToSubtabMenuPage(Menu.Sell.Catalog.catalog_menu_link, Menu.Sell.Catalog.discounts_submenu_link, 1000));
      test('should click on "Add new cart rule" button', () => client.waitForAndClick(DiscountPage.CartsRule.discounts_add_new_cart_rule_link));
      test('should set the "Name" input', () => client.waitForAndSetValue(DiscountPage.CartsRule.discounts_cart_rule_name_input_field, cartRuleData.name + global.dateTime));
      test('should click on "Generate" button', async () => {
        await client.waitForAndClick(DiscountPage.CartsRule.discounts_generate_link);
        await client.getAttributeInVar(DiscountPage.CartsRule.discounts_cart_rule_code_input_field, 'value', promoCode, 1000);
      });
      test('should click on "CONDITIONS" tab', () => client.waitForAndClick(DiscountPage.CartsRule.discounts_cart_rule_conditions_tab));
      test('should choose the customer "John Doe"', () => client.chooseCustomer(DiscountPage.CartsRule.discounts_cart_rule_conditions_single_customer_input_field, DiscountPage.CartsRule.discounts_cart_rule_conditions_customers_option, cartRuleData.customer_email));
      test('should set the "Minimum amount" input', () => client.waitForAndSetValue(DiscountPage.CartsRule.discounts_cart_rule_conditions_minimum_amount_input_field, cartRuleData.minimum_amount));
      test('should click on "ACTIONS" tab', () => client.waitForAndClick(DiscountPage.CartsRule.discounts_cart_rule_actions_tab));
      test('should switch the "Free shipping" to "Yes"', () => client.waitForAndClick(DiscountPage.CartsRule.discounts_cart_rule_actions_free_shipping_yes_label));
      test('should click on "' + cartRuleData.type + '" radio', async () => {
        if (cartRuleData.type === 'percent') {
          await client.waitForAndClick(DiscountPage.CartsRule.discounts_cart_rule_actions_apply_discount_percent_radio, 2000);
        }
        else {
          if (cartRuleData.type === 'amount') {
            await client.waitForAndClick(DiscountPage.CartsRule.discounts_cart_rule_actions_apply_discount_amount_radio, 2000);
          }
          else {
            await client.waitForAndClick(DiscountPage.CartsRule.discounts_cart_rule_actions_apply_discount_none_radio, 2000);
          }
        }
      });
      if (cartRuleData.type === 'percent') {
        test('should set the "reduction" ' + cartRuleData.type + ' value', () => client.waitForAndSetValue(DiscountPage.CartsRule.discounts_cart_rule_actions_reduction_percent_input_field, cartRuleData.reduction, 2000));
      }
      else {
        if (cartRuleData.type === 'amount') {
          test('should set the "reduction" ' + cartRuleData.type + ' value', () => client.waitForAndSetValue(DiscountPage.CartsRule.discounts_cart_rule_actions_reduction_amount_input_field, cartRuleData.reduction, 2000));
        }
      }
      test('should click on "Save" button', () => client.waitForAndClick(DiscountPage.CartsRule.discounts_cart_rule_save_button, 2000));
      test('should verify the appearance of the green validation', () => client.checkTextValue(DiscountPage.discounts_success_alert, '×\nSuccessful creation.'));
    }, 'catalog/discount');
  },
  checkCartRule(cartRuleData, promoCode) {
    scenario('Check the "Cart Rule"', client => {
      test('should go to "Cart Rules" page', () => client.goToSubtabMenuPage(Menu.Sell.Catalog.catalog_menu_link, Menu.Sell.Catalog.discounts_submenu_link, 1000));
      test('should search for the created cart rule', async () => {
        await client.isVisible(DiscountPage.CartsRule.discounts_cart_rule_filter_name_input_field, 1000);
        await client.searchByName(DiscountPage.CartsRule.discounts_cart_rule_filter_name_input_field, DiscountPage.CartsRule.discounts_cart_rule_search_button, cartRuleData.name + global.dateTime, 1000);
      });
      test('should click on "Edit" button', async () => {
        if (global.visible) {
          await client.waitForAndClick(DiscountPage.CartsRule.discounts_cart_rule_edit_link.replace("%ROW", 1).replace("%COL", 9));
        }
        else {
          await client.waitForAndClick(DiscountPage.CartsRule.discounts_cart_rule_edit_link.replace("%ROW", 1).replace("%COL", 8));
        }
      });
      test('should check the cart rule\'s "Name"', () => client.checkAttributeValue(DiscountPage.CartsRule.discounts_cart_rule_name_input_field, 'value', cartRuleData.name + global.dateTime, 'equal', 1000));
      test('should check the cart rule\'s "Promo code"', () => client.checkAttributeValue(DiscountPage.CartsRule.discounts_cart_rule_code_input_field, 'value', tab[promoCode]));
      test('should click on "CONDITIONS" tab', () => client.waitForAndClick(DiscountPage.CartsRule.discounts_cart_rule_conditions_tab));
      test('should check the cart rule\'s "Minimum amount"', () => client.checkAttributeValue(DiscountPage.CartsRule.discounts_cart_rule_conditions_minimum_amount_input_field, 'value', cartRuleData.minimum_amount.toString(), 'equal', 2000));
      test('should click on "ACTIONS" tab', () => client.waitForAndClick(DiscountPage.CartsRule.discounts_cart_rule_actions_tab));
      if (cartRuleData.type === 'percent') {
        test('should check the cart rule\'s "reduction"', () => client.checkAttributeValue(DiscountPage.CartsRule.discounts_cart_rule_actions_reduction_percent_input_field, 'value', cartRuleData.reduction.toString()));
      }
      else {
        if (cartRuleData.type === 'amount') {
          test('should check the cart rule\'s "reduction"', () => client.checkAttributeValue(DiscountPage.CartsRule.discounts_cart_rule_actions_reduction_amount_input_field, 'value', cartRuleData.reduction.toString()));
        }
      }
    }, 'catalog/discount');
  },
  async editCartRule(cartRuleData) {
    scenario('Edit the created "Cart Rule"', client => {
      test('should go to "Cart Rules" page', () => client.goToSubtabMenuPage(Menu.Sell.Catalog.catalog_menu_link, Menu.Sell.Catalog.discounts_submenu_link, 1000));
      test('should search for the created cart rule', async () => {
        await client.isVisible(DiscountPage.CartsRule.discounts_cart_rule_filter_name_input_field, 1000);
        await client.searchByName(DiscountPage.CartsRule.discounts_cart_rule_filter_name_input_field, DiscountPage.CartsRule.discounts_cart_rule_search_button, cartRuleData.name + global.dateTime);
        await client.editObjectData(cartRuleData);
      });
      test('should click on "Edit" button', async () => {
        if (global.visible) {
          await client.waitForAndClick(DiscountPage.CartsRule.discounts_cart_rule_edit_link.replace("%ROW", 1).replace("%COL", 9));
        }
        else {
          await client.waitForAndClick(DiscountPage.CartsRule.discounts_cart_rule_edit_link.replace("%ROW", 1).replace("%COL", 8));
        }
      });
      test('should set the "Name" input', () => client.waitForAndSetValue(DiscountPage.CartsRule.discounts_cart_rule_name_input_field, cartRuleData.name + global.dateTime));
      test('should click on "CONDITIONS" tab', () => client.waitForAndClick(DiscountPage.CartsRule.discounts_cart_rule_conditions_tab));
      test('should set the "Minimum amount" input', () => client.waitForAndSetValue(DiscountPage.CartsRule.discounts_cart_rule_conditions_minimum_amount_input_field, cartRuleData.minimum_amount));
      test('should click on "ACTIONS" tab', () => client.waitForAndClick(DiscountPage.CartsRule.discounts_cart_rule_actions_tab));
      if (cartRuleData.type === 'percent') {
        test('should set the "reduction" ' + cartRuleData.type + ' value', () => client.waitForAndSetValue(DiscountPage.CartsRule.discounts_cart_rule_actions_reduction_percent_input_field, cartRuleData.reduction, 2000));
      }
      else {
        if (cartRuleData.type === 'amount') {
          test('should set the "reduction" ' + cartRuleData.type + ' value', () => client.waitForAndSetValue(DiscountPage.CartsRule.discounts_cart_rule_actions_reduction_amount_input_field, cartRuleData.reduction, 2000));
        }
      }
      test('should click on "Save" button', () => client.waitForAndClick(DiscountPage.CartsRule.discounts_cart_rule_save_button, 2000));
      test('should verify the appearance of the green validation', () => client.checkTextValue(DiscountPage.discounts_success_alert, '×\nSuccessful update.'));
    }, 'catalog/discount');
  },
  deleteCartRule(cartRuleData) {
    scenario('Delete the created "Cart Rule"', client => {
      test('should go to "Cart Rules" page', () => client.goToSubtabMenuPage(Menu.Sell.Catalog.catalog_menu_link, Menu.Sell.Catalog.discounts_submenu_link, 1000));
      test('should search for the created cart rule', async () => {
        await client.isVisible(DiscountPage.CartsRule.discounts_cart_rule_filter_name_input_field, 1000);
        await client.searchByName(DiscountPage.CartsRule.discounts_cart_rule_filter_name_input_field, DiscountPage.CartsRule.discounts_cart_rule_search_button, cartRuleData.name + global.dateTime);
      });
      test('should click on "Dropdown toggle" button', async () => {
        if (global.visible) {
          await client.waitForAndClick(DiscountPage.CartsRule.discounts_cart_rule_dropdown_button.replace("%ROW", 1).replace("%COL", 9));
        }
        else {
          await client.waitForAndClick(DiscountPage.CartsRule.discounts_cart_rule_dropdown_button.replace("%ROW", 1).replace("%COL", 8));
        }
      });
      if ((cartRuleData.confirmationDialog === 'true')) {
        test('should accept the confirmation alert', () => client.confirmationDialog());
      }
      test('should click on "Delete" button', async () => {
        if (global.visible) {
          await client.waitForAndClick(DiscountPage.CartsRule.discounts_cart_rule_delete_link.replace("%ROW", 1).replace("%COL", 9));
        }
        else {
          await client.waitForAndClick(DiscountPage.CartsRule.discounts_cart_rule_delete_link.replace("%ROW", 1).replace("%COL", 8));
        }
      });
      test('should verify the appearance of the green validation', () => client.checkTextValue(DiscountPage.discounts_success_alert, '×\nSuccessful deletion.'));
    }, 'catalog/discount');
  }
};