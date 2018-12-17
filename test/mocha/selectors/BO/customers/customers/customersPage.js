module.exports = {
  CustomersPage: {
    import_button: '#desc-customer-import',
    customers_add_new_customer_link: '#page-header-desc-customer-new_customer',
    customers_first_social_title_radio: '#gender_1',
    customers_second_social_title_radio: '#gender_2',
    customers_first_name_input_field: '#firstname',
    customers_last_name_input_field: '#lastname',
    customers_email_input_field: '#email',
    customers_password_input_field: '#passwd',
    customers_birthday_day_select: '#fieldset_0 select[name=days]', //@Todo
    customers_birthday_month_select: '#fieldset_0 select[name=months]',//@Todo
    customers_birthday_year_select: '#fieldset_0 select[name=years]',//@Todo
    customers_partner_offers_yes_label: '#fieldset_0 label[for*=optin_on]',//@Todo
    customers_save_button: '#customer_form_submit_btn',
    customers_success_alert: '#content > div.bootstrap > div[class*=success]', //@Todo
    customers_filter_email_input_field: '#form-customer input[name=customerFilter_email]',//@Todo
    customers_customer_column: '#table-customer tr:nth-of-type(%ROW) td:nth-of-type(%COL)',
    customers_edit_link: '#table-customer tr:nth-of-type(%ROW) td:nth-of-type(13) a.edit',
    customers_dropdown_button: '#table-customer tr:nth-of-type(%ROW) td:nth-of-type(13) button',
    customers_delete_link: '#table-customer tr:nth-of-type(%ROW) td:nth-of-type(13) a.delete',
    customers_first_delete_method_radio: '#deleteMode_real',
    customers_second_delete_method_radio: '#deleteMode_deleted',
    customers_delete_button: '#content input[value=Delete]',//@Todo
    customers_empty_bloc: '#table-customer div[class*=list-empty-msg]',//@Todo
    customers_customer_checkbox: '#table-customer tr:nth-of-type(%ROW) td:nth-of-type(1) input',
    customers_bulk_actions_button: '#bulk_action_menu_customer',
    customers_delete_selected_link: '#form-customer div[class*=bulk-actions] a[onclick*=submitBulkdeletecustomer]'
  }
};