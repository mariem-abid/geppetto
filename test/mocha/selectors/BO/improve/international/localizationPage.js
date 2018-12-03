module.exports = {
  LocalizationPage: {
    Localization: {
      impost_localization_pack_select: '#import_localization_pack_iso_localization_pack'
    },
    Languages: {
      localization_add_language_link: '#page-header-desc-lang-new_language',
      localization_language_name_input_field: '#name',
      localization_language_iso_code_input_field: '#iso_code',
      localization_language_code_input_field: '#language_code',
      localization_language_date_format_input_field: '#date_format_lite',
      localization_language_date_full_format_input_field: '#date_format_full',
      localization_language_flag_input_file: '#flag',
      localization_language_no_picture_input_file: '#no_picture',
      localization_language_is_rtl_yes_label: '#fieldset_0 label[for=is_rtl_on]', //@Todo
      localization_language_is_rtl_no_label: '#fieldset_0 label[for=is_rtl_off]', //@Todo
      localization_language_status_yes_label: '#fieldset_0 label[for=active_on]', //@Todo
      localization_language_status_no_label: '#fieldset_0 label[for=active_off]', //@Todo
      localization_language_save_button: '#lang_form_submit_btn',
      localization_success_alert: '#content div.alert.alert-success', //@Todo
      localization_language_filter_name_input_field: '#table-lang input[name=langFilter_name]', //@Todo
      localization_language_search_button:'#submitFilterButtonlang', //@Todo
      localization_language_edit_link:'#table-lang tr:nth-of-type(%ROW) td:nth-of-type(10) a.edit',
      localization_language_reset_button:'#table-lang button[name*=Reset]', //@Todo
      localization_language_dropdown_button:'#table-lang tr:nth-of-type(%ROW) td:nth-of-type(10) button',
      localization_language_delete_link:'#table-lang tr:nth-of-type(%ROW) td:nth-of-type(10) a.delete'
    },
    Geolocation: {
      geolocation_behavior_restricted_countries_select: '#form_geolocation_options_geolocation_behaviour'
    }
  }
};