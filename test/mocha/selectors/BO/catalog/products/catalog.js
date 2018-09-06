module.exports = {
  Catalog: {
    add_new_button: '#page-header-desc-configuration-add',
    name_search_input: '#product_catalog_list input[name="filter_column_name"]',
    product_status_icon: '#product_catalog_list  tr:nth-child(%NUMBER) i.action-%D',
    search_button: '#product_catalog_list  button[title="Search"]',
    reset_button: '#product_catalog_list  button[title="Reset"]',
    green_validation: '#main-div  div[class="alert alert-success"][role="alert"]',
    dropdown_toggle: '#product_catalog_list  tr:nth-child(%D) button.dropdown-toggle',
    delete_button: '#product_catalog_list  tr:nth-child(%D) a[onclick="unitProductAction(this, \'delete\');"]',
    duplicate_button: '#product_catalog_list  tr:nth-child(%D) a[onclick="unitProductAction(this, \'duplicate\');"]',
    delete_confirmation: '#catalog_deletion_modal button[value="confirm"]'
  }
};
