const authentication = require('../common_scenarios/authentication');
const {Menu} = require('../../selectors/BO/menu');
const {TranslationsPage} = require('../../selectors/BO/improve/international/translationsPage');

/** This scenario is based on the bug described in this PR
 * https://github.com/PrestaShop/PrestaShop/pull/11344
 */

scenario('This scenario is based on the bugs described on this PR: https://github.com/PrestaShop/PrestaShop/pull/11344', () => {
  authentication.signInBO('11344');
  scenario('Check the redirection after email translation', client => {
    test('should go to "Tranlations" page', async () => {
      await client.waitForAndClick(Menu.Improve.International.international_menu);
      await client.waitForAndClick(Menu.Improve.International.translations_submenu, 1000);
    });
    test('should select "Email translations" in the "MODIFY TRANSLATIONS" section', () => client.waitForAndSelect(TranslationsPage.translations_type, "mails"));
    test('should select "Body" in the "MODIFY TRANSLATIONS" section', () => client.waitForAndSelect(TranslationsPage.email_content_type, "body"));
    test('should select "Theme" in the "MODIFY TRANSLATIONS" section', () => client.waitForAndSelect(TranslationsPage.theme_select, "classic"));
    test('should select the "English" language from the list', () => client.waitForAndSelect(TranslationsPage.translations_languages_select, 'en'));
    test('should click on "Modify" button', () => client.waitForAndClick(TranslationsPage.modify_button, 1000));
    test('should click on "Core emails" in the "CORE MAILS" section', () => client.waitForAndClick(TranslationsPage.core_emails, 1000));
    test('should click on "backoffice_order" link in the "CORE MAILS" section', () => client.waitForAndClick(TranslationsPage.translations_email_panel_link.replace('%D', '#core-backoffice_order'), 1000));
    test('should click on "Edit HTML version" link in the "CORE MAILS" section', () => client.waitForAndClick(TranslationsPage.edit_html_version_link_backoffice_order, 1000));
    test('should click on "Save" button in the "CORE MAILS" section', () => client.waitForAndClick(TranslationsPage.core_emails_save_button, 1000));
    test('should check that the "Modify translations" block is well displayed after the email translation', () => client.isExisting(TranslationsPage.modify_translations_block, 2000));
  }, 'common_client');
  authentication.signOutBO();
}, 'common_client', true);
