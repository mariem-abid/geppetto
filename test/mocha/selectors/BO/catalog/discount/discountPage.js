module.exports = {
  DiscountPage: {
    discounts_success_alert: '#content > div.bootstrap > div[class*=success]',//@Todo
    discounts_catalog_price_rules_tab: '#subtab-AdminSpecificPriceRule',
    CartsRule: {
      discounts_add_new_cart_rule_link: '#page-header-desc-cart_rule-new_cart_rule',
      discounts_cart_rule_name_input_field: '#name_1',
      discounts_generate_link: '#cart_rule_informations > div:nth-child(3)  span > a',//@Todo
      discounts_cart_rule_code_input_field: '#code',
      discounts_cart_rule_conditions_tab: '#cart_rule_link_conditions',
      discounts_cart_rule_conditions_single_customer_input_field: '#customerFilter',
      discounts_cart_rule_conditions_customers_option: 'body > div.ac_results > ul > li',//@Todo
      discounts_cart_rule_conditions_minimum_amount_input_field: '#cart_rule_conditions input[name=minimum_amount]',//@Todo
      discounts_cart_rule_actions_tab: '#cart_rule_link_actions',
      discounts_cart_rule_actions_free_shipping_yes_label: '#cart_rule_actions label[for=free_shipping_on]',//@Todo
      discounts_cart_rule_actions_apply_discount_percent_radio: '#apply_discount_percent',
      discounts_cart_rule_actions_apply_discount_amount_radio: '#apply_discount_amount',
      discounts_cart_rule_actions_apply_discount_none_radio: '#apply_discount_off',
      discounts_cart_rule_actions_reduction_percent_input_field: '#reduction_percent',
      discounts_cart_rule_actions_reduction_amount_input_field: '#reduction_amount',
      discounts_cart_rule_save_button: '#desc-cart_rule-save',
      discounts_success_alert: '#content > div.bootstrap > div[class*=success]',//@Todo
      discounts_cart_rule_filter_name_input_field: '#table-cart_rule input[name=cart_ruleFilter_name]',//@Todo
      discounts_cart_rule_search_button: '#submitFilterButtoncart_rule',
      discounts_cart_rule_edit_link: '#table-cart_rule tr:nth-of-type(%ROW) td:nth-of-type(%COL) a.edit',
      discounts_cart_rule_dropdown_button: '#table-cart_rule tr:nth-of-type(%ROW) td:nth-of-type(%COL) button',
      discounts_cart_rule_delete_link: '#table-cart_rule tr:nth-of-type(%ROW) td:nth-of-type(%COL) a.delete'
    },
    CatalogPriceRules: {
      discounts_add_new_catalog_price_rules_link: '#page-header-desc-specific_price_rule-new_specific_price_rule',
      discounts_catalog_price_rule_name_input_field: '#name',
      discounts_catalog_price_rule_from_quantity_input_field: '#from_quantity',
      discounts_catalog_price_rule_reduction_type_select: '#reduction_type',
      discounts_catalog_price_rule_reduction_input_field: '#reduction',
      discounts_catalog_price_rule_save_button: '#specific_price_rule_form_submit_btn',
      discounts_catalog_price_rule_filter_name_input_field: '#table-specific_price_rule  input[name="specific_price_ruleFilter_a!name"]',
      discounts_catalog_price_rule_search_button: '#submitFilterButtonspecific_price_rule',
      discounts_catalog_price_rule_dropdown_button: '#table-specific_price_rule tr:nth-of-type(%ROW) td:nth-of-type(%COL) button',
      discounts_catalog_price_rule_delete_link: '#table-specific_price_rule tr:nth-of-type(%ROW) td:nth-of-type(%COL) a.delete'
    }
  }
};