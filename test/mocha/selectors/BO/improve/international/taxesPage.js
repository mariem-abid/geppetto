module.exports = {
  TaxesPage: {
    filter_search_button: '#submitFilterButtontax',
    tax_number_span: '#form-tax span.badge',
    taxes_table: '#table-tax',
    get tax_name() {
      return this.taxes_table + ' > tbody tr:nth-child(%S) > td:nth-child(3)';
    },
    get tax_rate() {
      return this.taxes_table + ' > tbody tr:nth-child(%S) > td:nth-child(4)';
    },
    get filter_name_input() {
      return this.taxes_table + ' input.filter[name="taxFilter_name"]';
    },
    taxes_tax_rules_tab:'#subtab-AdminTaxRulesGroup',
    TaxRulesPage:{
      taxes_add_tax_rule_link:'#page-header-desc-tax_rules_group-new_tax_rules_group',
      taxes_tax_rule_name_input_field:'#name',
      taxes_tax_rule_enable_yes_label:'#fieldset_0 span > label[for=active_on]', //@Todo,
      taxes_tax_rule_first_save_and_stay_button:'#tax_rules_group_form_submit_btn',
      taxes_success_alert:'#content div.alert.alert-success', //@Todo
      taxes_tax_rule_tax_select:'#id_tax',
      taxes_tax_rule_second_save_and_stay_button:'#tax_rule_form_submit_btn_1',
      taxes_tax_rule_filter_name_input_field:'#table-tax_rules_group input[name=tax_rules_groupFilter_name]', //@Todo
      taxes_tax_rule_search_button:'#submitFilterButtontax_rules_group',
      taxes_tax_rule_edit_link:'#table-tax_rules_group tr:nth-of-type(%ROW) td:nth-of-type(5) a.edit',
      taxes_tax_rule_dropdown_button:'#table-tax_rules_group tr:nth-of-type(%ROW) td:nth-of-type(5) button',
      taxes_tax_rule_delete_link:'#table-tax_rules_group tr:nth-of-type(%ROW) td:nth-of-type(5) a.delete',
      taxes_tax_rule_bulk_actions_button:'#bulk_action_menu_tax_rules_group',
      taxes_tax_rule_select_all_link:'#form-tax_rules_group  div.row  li:nth-child(%ID)  a', //@Todo
    }
  }
};