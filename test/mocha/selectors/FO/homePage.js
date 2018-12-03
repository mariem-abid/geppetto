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
    sign_out_button_text: '#_desktop_user_info a[class*=logout]',
    logo_home_page: '#_desktop_logo',
    product_name: 'div.products > article:nth-child(%ID) .h3.product-title > a',
    all_product_link: '#content a.all-product-link',
    language_option: '#_desktop_language_selector a[data-iso-code="%LANG"]',
    selected_language_button: '#_desktop_language_selector span.expand-more',
    home_page: '#index div.header-top > div > div:nth-child(1) > div.col-md-10.col-sm-12.position-static',
    contact_us_link: '#header > nav > div > div > div:nth-of-type(1) > div:nth-of-type(1)',
    top_menu_page: '#header > div.header-top > div > div:nth-child(1) > div.col-md-10.col-sm-12.position-static',
    search_widget: '#search_widget',
    products_block: '#footer > div:nth-of-type(2) > div > div:nth-of-type(1) > div:nth-of-type(1) > div > div:nth-of-type(1)',
    newsletter_block: '#footer > div:nth-of-type(1) > div > div:nth-of-type(1)',
    our_campany_block: '#footer > div:nth-of-type(2) > div > div:nth-of-type(1) > div:nth-of-type(1) > div > div:nth-of-type(2)',
    your_account_block: '#block_myaccount_infos',
    store_information_block: '#footer > div:nth-of-type(2) > div > div:nth-of-type(1) > div:nth-of-type(3)'
  }
};
