module.exports = {
  MultiStorePage: {
    MultiStore: {
      add_new_shop_button: '#page-header-desc-shop_group-new_2 > i',
      edit_button:'#table-shop_group a.edit'
    },
    Shop: {
      shop_name_input: '#name',
      save_button: '#shop_form_submit_btn',
      search_shop_name_input: 'input[name="shopFilter_a!name"]',
      search_button: '#submitFilterButtonshop',
      link_shop: 'a.multishop_warning',
      reset_button: '[name="submitResetshop"]',
      dropdown_button: '#table-shop  button.dropdown-toggle i',
      delete_button: '#table-shop li a'
    },
    ShopUrl: {
      virtual_url_input: '#virtual_uri',
      save_button: '#shop_url_form_submit_btn_1'
    },
    MultistoreTree: {
      shop_name: '#shops-tree li:nth-child(%D) > label > a',
      default_group:'#shops-tree span.tree-folder-name a'
    },
    ShopGroup:{
      share_available_quantities:'#fieldset_0 label[for="share_stock_%D"]',
      save_button:'#shop_group_form_submit_btn'
    }
  }
};
