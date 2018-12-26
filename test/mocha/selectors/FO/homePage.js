module.exports = {
  HomePage: {
    page_content: 'body',
    search_input: '.ui-autocomplete-input',
    search_button: '#search_widget > form > button > i[class*="search"]',
    product_result_name: '.h3.product-title > a',
    language_selector: '#_desktop_language_selector button',
    language_EN: '#_desktop_language_selector li:nth-child(1) > a',
    language_FR: '#_desktop_language_selector li:nth-child(2) > a',
    sign_in_button: '#_desktop_user_info span',
    order_history_and_details_button: '#history-link',
    sign_out_button: '#_desktop_user_info  a.logout',
    logo_home_page: '#_desktop_logo  img',
    product_name: 'div.products > article:nth-child(%ID) .h3.product-title > a',
    all_product_link: '#content a.all-product-link',
    language_option: '#_desktop_language_selector a[data-iso-code=%LANG]'
  }
};
