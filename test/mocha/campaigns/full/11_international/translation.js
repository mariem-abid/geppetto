const {Menu} = require('../../../selectors/BO/menu.js');
const {TranslationsPage} = require('../../../selectors/BO/improve/international/translationsPage');
const {AddProductPage} = require('../../../selectors/BO/catalog/products/addProductPage');
const {HomePage} = require('../../../selectors/FO/homePage');
const authentication = require('../../common_scenarios/authentication');

scenario('Edit a translation', () => {
  authentication.signInBO('translation');
  scenario('Edit a translation of "Sign in" in the "classic Theme"', client => {
    test('should go to "Translations" page', () => client.goToSubtabMenuPage(Menu.Improve.International.international_menu_link, Menu.Improve.International.translations_submenu_link));
    test('should select "themes translations" in the "MODIFY TRANSLATIONS" section', () => client.waitForAndSelect(TranslationsPage.translations_translation_type_select, "themes"));
    test('should select the language "English (English)" in the "MODIFY TRANSLATIONS" section', () => client.waitForAndSelect(TranslationsPage.translations_language_select, "en"));
    test('should click on "Modify" button', () => client.waitForAndClick(TranslationsPage.translations_modify_button));
    test('should click on "Shop" button', async () => {
      await client.isVisible(AddProductPage.close_symfony_toolbar, 2000);
      if (global.visible) {
        await client.waitForAndClick(AddProductPage.close_symfony_toolbar, 1000);
      }
      await client.waitForAndClick(TranslationsPage.translations_shop_button, 3000);
    });
    test('should click on "Theme" button', () => client.waitForAndClick(TranslationsPage.translations_shop_theme_button, 1000));
    test('should click on "Action" button', () => client.waitForAndClick(TranslationsPage.translations_shop_theme_actions_button, 1000));
    test('should search for "Sign out" translation', async () => {
      await client.waitForAndType(TranslationsPage.search_input, "Sign out", 1000);//a changer le selecteur
      await client.waitForAndClick(TranslationsPage.search_button, 1000);//a changer le selecteur
    });
    test('should change "Sign Out" translation from "Sign Out" to "Sign Out English"', () => client.clearTextareaAntSetType(TranslationsPage.translations_shop_theme_actions_sign_out_textarea, 'Sign out English', 2000));
    scenario('Save change', client => {
      test('should click on "Save" button ', () => client.waitForAndClick(TranslationsPage.translations_save_button, 1000));
      test('should check that the success alert message is well displayed', () => client.waitForAndClick(TranslationsPage.translations_close_validation_icon));
    }, 'common_client');
    authentication.signOutBO();
  }, 'common_client', true);
  authentication.openShop('Translation');
  authentication.signInFO();
  scenario('Check the change of "Sign out" to "Sign out English" ', client => {
    test('should set the shop language to "English"', () => client.switchShopLanguageInFo('en'));
    test('should check the "Sign out" button text is equal to "Sign out English"', () => client.checkTextValue(HomePage.sign_out_button_text, 'Sign out English', "contain", 2000));
  }, 'common_client');
  authentication.signOutFO();
}, 'common_client', true);
