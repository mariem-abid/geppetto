const {Menu} = require('../../../../selectors/BO/menu');
const {LocalizationPage} = require('../../../../selectors/BO/improve/international/localizationPage');
const {ThemeAndLogoPage} = require('../../../../selectors/BO/improve/design/themeAndLogoPage');
const {HomePage} = require('../../../../selectors/FO/homePage');
const {ProductPageFO} = require('../../../../selectors/FO/productPage');
const {CheckoutOrderPage} = require('../../../../selectors/FO/order/checkoutOrderPage');

module.exports = {
  async createLanguage(languageData) {
    scenario('Create a new "Language"', client => {
      test('should go to "LocalizationPage" page', () => client.goToSubtabMenuPage(Menu.Improve.International.international_menu_link, Menu.Improve.International.localization_submenu_link));
      test('should click on "Languages" tab', () => client.waitForAndClick(Menu.Improve.International.localization_languages_tab));
      test('should click on "Add new language" button', () => client.waitForAndClick(LocalizationPage.Languages.localization_add_language_link));
      test('should set the "Name" input', () => client.waitForAndSetValue(LocalizationPage.Languages.localization_language_name_input_field, languageData.name + global.dateTime));
      test('should set the "ISO code" input', () => client.waitForAndSetValue(LocalizationPage.Languages.localization_language_iso_code_input_field, languageData.iso_code));
      test('should set the "Language code" input', () => client.waitForAndSetValue(LocalizationPage.Languages.localization_language_code_input_field, languageData.language_code));
      test('should set the "Date format" input', () => client.waitForAndSetValue(LocalizationPage.Languages.localization_language_date_format_input_field, languageData.date_format));
      test('should set the "Date format (full)" input', () => client.waitForAndSetValue(LocalizationPage.Languages.localization_language_date_full_format_input_field, languageData.date_format_full));
      test('should upload the "Flag" picture', () => client.uploadFile(LocalizationPage.Languages.localization_language_flag_input_file, dataFileFolder, languageData.flag_file));
      test('should upload the "No-picture" image', () => client.uploadFile(LocalizationPage.Languages.localization_language_no_picture_input_file, dataFileFolder, languageData.no_picture_file));
      if (languageData.hasOwnProperty('is_rtl') && languageData.is_rtl === 'on') {
        test('should switch the "Is RTL language" to "YES"', () => client.waitForAndClick(LocalizationPage.Languages.localization_language_is_rtl_yes_label));
      }
      if (languageData.hasOwnProperty('status') && languageData.status === 'on') {
        test('should switch the "Status" to "YES"', () => client.waitForAndClick(LocalizationPage.Languages.localization_language_status_yes_label));
      }
      test('should click on "Save" button', () => client.waitForAndClick(LocalizationPage.Languages.localization_language_save_button));
      test('should verify the appearance of the green validation', () => client.checkTextValue(LocalizationPage.Languages.localization_success_alert, '× Successful creation.'));
    }, 'common_client');
  },
  async editLanguage(name, languageData) {
    scenario('Edit the created "Language"', client => {
      test('should go to "LocalizationPage" page', () => client.goToSubtabMenuPage(Menu.Improve.International.international_menu_link, Menu.Improve.International.localization_submenu_link));
      test('should click on "Languages" tab', () => client.waitForAndClick(Menu.Improve.International.localization_languages_tab));
      test('should search for the created language', () => client.searchByValue(LocalizationPage.Languages.localization_language_filter_name_input_field, LocalizationPage.Languages.localization_language_search_button, name + global.dateTime));
      test('should click on "Edit" button', () => client.waitForAndClick(LocalizationPage.Languages.localization_language_edit_link.replace('%ROW', 1)));
      test('should set the "Name" input', () => client.waitForAndSetValue(LocalizationPage.Languages.localization_language_name_input_field, languageData.name + global.dateTime));
     // test('should set the "ISO code" input', () => client.waitForAndSetValue(LocalizationPage.Languages.localization_language_iso_code_input_field, languageData.iso_code));
      test('should set the "Language code" input', () => client.waitForAndSetValue(LocalizationPage.Languages.localization_language_code_input_field, languageData.language_code));
      test('should set the "Date format" input', () => client.waitForAndSetValue(LocalizationPage.Languages.localization_language_date_format_input_field, languageData.date_format));
      test('should set the "Date format (full)" input', () => client.waitForAndSetValue(LocalizationPage.Languages.localization_language_date_full_format_input_field, languageData.date_format_full));
      test('should upload the "Flag" picture', () => client.uploadFile(LocalizationPage.Languages.localization_language_flag_input_file, dataFileFolder, languageData.flag_file));
      test('should upload the "No-picture" image', () => client.uploadFile(LocalizationPage.Languages.localization_language_no_picture_input_file, dataFileFolder, languageData.no_picture_file));
      if (languageData.hasOwnProperty('is_rtl') && languageData.is_rtl === 'on') {
        test('should switch the "Is RTL language" to "YES"', () => client.waitForAndClick(LocalizationPage.Languages.localization_language_is_rtl_yes_label));
      }
      if (languageData.hasOwnProperty('status') && languageData.status === 'on') {
        test('should switch the "Status" to "YES"', () => client.waitForAndClick(LocalizationPage.Languages.localization_language_status_yes_label));
      }
      test('should click on "Save" button', () => client.waitForAndClick(LocalizationPage.Languages.localization_language_save_button));
      test('should verify the appearance of the green validation', () => client.checkTextValue(LocalizationPage.Languages.localization_success_alert, '× Successful update.'));
      test('should click on "Reset" button', () => client.waitForAndClick(LocalizationPage.Languages.localization_language_reset_button));
    }, 'common_client');
  },
  async checkLanguageBO(languageData) {
    scenario('Check the created "Language"', client => {
      test('should go to "LocalizationPage" page', () => client.goToSubtabMenuPage(Menu.Improve.International.international_menu_link, Menu.Improve.International.localization_submenu_link));
      test('should click on "Languages" tab', () => client.waitForAndClick(Menu.Improve.International.localization_languages_tab));
      test('should search for the created language', () => client.searchByValue(LocalizationPage.Languages.localization_language_filter_name_input_field, LocalizationPage.Languages.localization_language_search_button, languageData.name + global.dateTime));
      test('should click on "Edit" button', () => client.waitForAndClick(LocalizationPage.Languages.localization_language_edit_link.replace('%ROW', 1)));
      test('should check that the "Name" is equal to "' + languageData.name + global.dateTime + '"', () => client.checkAttributeValue(LocalizationPage.Languages.localization_language_name_input_field, 'value', languageData.name + global.dateTime, 'equal', 1000));
      test('should check that the "ISO code" is equal to "' + languageData.iso_code.toLowerCase() + '"', () => client.checkAttributeValue(LocalizationPage.Languages.localization_language_iso_code_input_field, 'value', languageData.iso_code.toLowerCase()));
      test('should check that the "Language code" is equal to "' + languageData.language_code + '"', () => client.checkAttributeValue(LocalizationPage.Languages.localization_language_code_input_field, 'value', languageData.language_code));
      test('should check that the "Date format" is equal to "' + languageData.date_format + '"', () => client.checkAttributeValue(LocalizationPage.Languages.localization_language_date_format_input_field, 'value', languageData.date_format));
      test('should check that the "Date format (full)" is equal to "' + languageData.date_format_full + '"', () => client.checkAttributeValue(LocalizationPage.Languages.localization_language_date_full_format_input_field, 'value', languageData.date_format_full));
      test('should click on "Save" button', () => client.waitForAndClick(LocalizationPage.Languages.localization_language_save_button));
      test('should click on "Reset" button', () => client.waitForAndClick(LocalizationPage.Languages.localization_language_reset_button));
    }, 'common_client');
  },
  async checkLanguageFO(languageData, isDeleted = false) {
    scenario('Check the created "Language" in the Front Office', client => {
      if (isDeleted) {
        test('should click on "Language" select', () => client.waitForAndClick(HomePage.language_selector));
        test('should check that the "' + languageData.name + '" doesn\'t appear', () => client.isNotVisible(HomePage.language_option.replace('%LANG', languageData.iso_code.toLowerCase()), 1000));
      } else {
        test('should set the shop language to "' + languageData.name + '"', () => client.switchShopLanguageInFo(languageData.iso_code.toLowerCase()));
        test('should check that the "' + languageData.name + '" language is well selected', () => client.checkTextValue(HomePage.selected_language_button, languageData.name + global.dateTime, 'equal', 3000));
        if (languageData.hasOwnProperty('is_rtl') && languageData.is_rtl === 'on') {
          test('should check that the "Home" page is well displayed in RTL mode', () => client.checkCssPropertyValue(HomePage.home_page, 'direction', 'rtl', 'equal', 2000));
          test('should check that the "Contact us" is well reversed', () => client.checkCssPropertyValue(HomePage.contact_us_link, 'float', 'right'));
          test('should check that the "Logo" is well reversed', () => client.checkCssPropertyValue(HomePage.logo_home_page, 'float', 'right'));
          test('should check that the "Top menu" is well reversed', () => client.checkCssPropertyValue(HomePage.top_menu_page, 'float', 'right'));
          test('should check that the "Search element" is well reversed', () => client.checkCssPropertyValue(HomePage.search_widget, 'float', 'left'));
          test('should check that the "All products" is well reversed', () => client.checkCssPropertyValue(HomePage.all_product_link, 'float', 'left', 'contain'));
          test('should check that the "Products block" is well reversed', () => client.checkCssPropertyValue(HomePage.products_block, 'float', 'right'));
          test('should check that the "Newsletter block" is well reversed', () => client.checkCssPropertyValue(HomePage.newsletter_block, 'float', 'right'));
          test('should check that the "Our campany block" is well reversed', () => client.checkCssPropertyValue(HomePage.our_campany_block, 'float', 'right'));
          test('should check that the "Your account block" is well reversed', () => client.checkCssPropertyValue(HomePage.your_account_block, 'float', 'right'));
          test('should check that the "Store information block" is well reversed', () => client.checkCssPropertyValue(HomePage.store_information_block, 'float', 'right'));
          test('should go to the product page', () => client.waitForAndClick(ProductPageFO.first_product));
          test('should check that the "Product" page is well displayed in RTL mode', () => client.checkCssPropertyValue(ProductPageFO.product_page, 'direction', 'rtl', 'equal', 3000));
          test('should check that the "Breadcrumb list" is well reversed', () => client.checkCssPropertyValue(ProductPageFO.breadcrumb_nav, 'direction', 'rtl'));
          test('should check that the "Product pictures" is well reversed', () => client.checkCssPropertyValue(ProductPageFO.product_section.replace('%I', 1), 'float', 'right'));
          test('should check that the "Product name" is well reversed', () => client.checkCssPropertyValue(ProductPageFO.product_name, 'direction', 'rtl'));
          test('should check that the "Product price" is well reversed', () => client.checkCssPropertyValue(ProductPageFO.product_price, 'direction', 'rtl'));
          test('should check that the "Product discount" is well reversed', () => client.checkCssPropertyValue(ProductPageFO.product_discount_details, 'direction', 'rtl'));
          test('should check that the "Product size" select is well reversed', () => client.checkCssPropertyValue(ProductPageFO.product_size, 'direction', 'rtl'));
          test('should check that the "Product color" radio button is well reversed', () => client.checkCssPropertyValue(ProductPageFO.product_color, 'direction', 'rtl'));
          test('should check that the "Product quantity" input is well reversed', () => client.checkCssPropertyValue(ProductPageFO.first_product_quantity, 'direction', 'rtl'));
          test('should check that the "ADD TO CART" button is well reversed', () => client.checkCssPropertyValue(ProductPageFO.add_to_cart_button, 'direction', 'rtl'));
          test('should check that the "Description" is well reversed', () => client.checkCssPropertyValue(ProductPageFO.product_description, 'direction', 'rtl'));
          test('should click on "Product details" tab', () => client.waitForAndClick(ProductPageFO.product_detail_tab));
          test('should check that the "Product manufacturer" is well reversed', () => client.checkCssPropertyValue(ProductPageFO.product_manufacturer, 'direction', 'rtl'));
          test('should check that the "Product reference" is well reversed', () => client.checkCssPropertyValue(ProductPageFO.product_reference, 'direction', 'rtl'));
          test('should check that the "Product quantities in stock" is well reversed', () => client.checkCssPropertyValue(ProductPageFO.product_quantity, 'direction', 'rtl'));
          test('should click on "ADD TO CART" button', () => client.waitForAndClick(ProductPageFO.add_to_cart_button));
          test('should click on "PROCEED TO CHECKOUT" modal button', () => client.waitForAndClick(ProductPageFO.proceed_to_checkout_modal_button, 2000));
          test('should check that the "Cart" page is well displayed in RTL mode', () => client.checkCssPropertyValue(CheckoutOrderPage.cart_page, 'direction', 'rtl', 'equal', 3000));
          test('should check that the "Cart body" is well displayed in RTL mode', () => client.checkCssPropertyValue(CheckoutOrderPage.cart_body, 'direction', 'rtl'));
          test('should check that the "Cart total" is well reversed', () => client.checkCssPropertyValue(CheckoutOrderPage.cart_total, 'direction', 'rtl'));
          test('should check that the "Cart subtotal" is well reversed', () => client.checkCssPropertyValue(CheckoutOrderPage.cart_subtotal_products, 'direction', 'rtl'));
          test('should go to the "Home" page', () => client.waitForAndClick(HomePage.logo_home_page));
          test('should set the shop language to "' + languageData.name + '"', () => client.switchShopLanguageInFo(languageData.iso_code.toLowerCase()));
          test('should click on "All product" page', () => client.waitForAndClick(HomePage.all_product_link));
          test('should check that the "Category" page is well displayed in RTL mode', () => client.checkCssPropertyValue(ProductPageFO.category_page, 'direction', 'rtl', 'equal', 2000));
          test('should check that the "Left column" is well reversed', () => client.checkCssPropertyValue(ProductPageFO.left_column_block, 'direction', 'rtl'));
          test('should check that the "Pagination" block is well reversed', () => client.checkCssPropertyValue(ProductPageFO.pagination_block, 'direction', 'rtl'));
        }
      }
    }, 'common_client');
  },
  async deleteLanguage(name, confirmationDialog = false) {
    scenario('Delete the created "Language"', client => {
      test('should go to "LocalizationPage" page', () => client.goToSubtabMenuPage(Menu.Improve.International.international_menu_link, Menu.Improve.International.localization_submenu_link));
      test('should click on "Languages" tab', () => client.waitForAndClick(Menu.Improve.International.localization_languages_tab));
      test('should search for the created language', () => client.searchByValue(LocalizationPage.Languages.localization_language_filter_name_input_field, LocalizationPage.Languages.localization_language_search_button, name + global.dateTime));
      test('should click on "dropdown toggle" button', () => client.waitForAndClick(LocalizationPage.Languages.localization_language_dropdown_button.replace('%ROW', 1)));
      if (confirmationDialog) {
        test('should accept the confirmation alert', () => client.confirmationDialog());
      }
      test('should click on "Delete" button', () => client.waitForAndClick(LocalizationPage.Languages.localization_language_delete_link.replace('%ROW', 1)));
      test('should verify the appearance of the green validation', () => client.checkTextValue(LocalizationPage.Languages.localization_success_alert, '× Successful deletion.'));
      test('should click on "Reset" button', () => client.waitForAndClick(LocalizationPage.Languages.localization_language_reset_button));
    }, 'common_client');
  },
  async generateRtlStylesheet() {
    scenario('Generate RTL stylesheet', client => {
      test('should go to "Theme & logo" page', () => client.goToSubtabMenuPage(Menu.Improve.Design.design_menu_link, Menu.Improve.Design.theme_logo_submenu_link, 1000));
      test('should switch the "Generate RTL stylesheet" to "YES"', () => client.waitForAndClick(ThemeAndLogoPage.ThemeAndLogo.theme_logo_generate_rtl_stylesheet_yes_label));
      test('should click on "Save" button', () => client.waitForAndClick(ThemeAndLogoPage.ThemeAndLogo.theme_logo_generate_rtl_save_button));
      test('should verify the appearance of the green validation', () => client.checkTextValue(ThemeAndLogoPage.ThemeAndLogo.theme_logo_success_alert, 'Your RTL stylesheets has been generated successfully'));
    }, 'common_client');
  }
};