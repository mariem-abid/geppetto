module.exports = {
  AddressesPage: {
    import_button: '#desc-address-import',
    addresses_add_new_addresse_link: '#page-header-desc-address-new_address',
    addresses_email_input_field: '#email',
    addresses_identification_number_input_field: '#dni',
    addresses_address_alias_input_field: '#alias',
    addresses_first_name_input_field: '#firstname',
    addresses_last_name_input_field: '#lastname',
    addresses_company_input_field: '#company',
    addresses_vat_number_input_field: '#vat_number',
    addresses_address_input_field: '#address1',
    addresses_second_address_input_field: '#address2',
    addresses_zip_postal_code_input_field: '#postcode',
    addresses_city_input_field: '#city',
    addresses_country_select: '#id_country',
    addresses_home_phone_input_field: '#phone',
    addresses_other_textarea: '#other',
    addresses_save_button: '#address_form_submit_btn',
    addresses_success_alert: '#content > div.bootstrap > div[class*=success]',//@Todo
    addresses_filter_address_input_field: '#form-address input[name=addressFilter_address1]', //@Todo
    addresses_address_column: '#table-address tr:nth-of-type(%ROW) td:nth-of-type(%COL)',
    addresses_empty_bloc: '#table-address div[class*=list-empty-msg]',//@Todo
    addresses_danger_alert: '#content > div.bootstrap > div[class*=alert-danger]', //@Todo
    addresses_set_required_fields_link: 'a[onclick*=requiredFieldsParameters]',//@Todo
    addresses_company_checkbox: ' input[value="company"]',//@Todo
    addresses_save_required_fields_button: 'button[name*=submitFields]',//@Todo
    addresses_check_all_required_fields_checkbox: 'input[name*=checkme]',//@Todo
    addresses_dropdown_button: '#table-address tr:nth-of-type(%ROW) td:nth-of-type(9) button',
    addresses_delete_link: '#table-address tr:nth-of-type(%ROW) td:nth-of-type(9) a.delete',
    addresses_address_checkbox: '#table-address tr:nth-of-type(%ROW) td:nth-of-type(1) input',
    addresses_bulk_actions_button: '#bulk_action_menu_address',
    addresses_delete_selected_link: 'div[class*=bulk-actions] a[onclick*=submitBulkdeleteaddress]',//@Todo
  }
};