const {Dashboard} = require('../../../../selectors/BO/dashboardPage');
const authentication = require('../../../common_scenarios/authentication');
const localization = require('../../../common_scenarios/improve/international/localization');
let languageData = [{
  name: 'Spanish',
  iso_code: 'ES',
  language_code: 'ES',
  date_format: 'Y-m-d',
  date_format_full: 'Y-m-d H:i:s',
  flag_file: 'language_spanish_flag.png',
  no_picture_file: 'no_image_available.png',
  is_rtl: 'off',
  status: 'on'
}, {
  name: 'Farsi',
  iso_code: 'FA',
  language_code: 'FA',
  date_format: 'Y-m-d',
  date_format_full: 'Y-m-d H:i:s',
  flag_file: 'language_farsi_flag.png',
  no_picture_file: 'no_image_available.png',
  is_rtl: 'on',
  status: 'on'
}], languageEditedData = [{
  name: 'Spanishh',
  iso_code: 'ES',
  language_code: 'ES',
  date_format: 'Y-m-d',
  date_format_full: 'Y-m-d H:i:s',
  flag_file: 'language_spanish_flag.png',
  no_picture_file: 'no_image_available.png',
  is_rtl: 'off',
  status: 'on'
}, {
  name: 'Spanishh',
  iso_code: 'ES',
  language_code: 'ES',
  date_format: 'Y-m-d',
  date_format_full: 'Y-m-d H:i:s',
  flag_file: 'language_spanish_flag.png',
  no_picture_file: 'no_image_available.png',
  is_rtl: 'off',
  status: 'off'
}];
scenario('Create, edit, delete and check "Languages" in the Back Office', () => {
  authentication.signInBO('localization');
  scenario('Test 1: Create, check language in the Back Office and check it in the Front Office', () => {
    localization.createLanguage(languageData[0]);
    localization.checkLanguageBO(languageData[0]);
    scenario('Go to the Front Office', client => {
      test('should go to the Front Office', () => client.accessToFO(Dashboard.dashboard_view_my_shop_link, 1));
    }, 'common_client');
    localization.checkLanguageFO(languageData[0]);
  }, 'common_client');
  scenario('Test 2: Create, check language in the Back Office and check it in the Front Office', () => {
    scenario('Go back to the Back Office', client => {
      test('should back to the Back Office', async () => {
        await client.closeWindow();
        await client.switchWindow(0);
      });
    }, 'common_client');
    localization.createLanguage(languageData[1]);
    localization.checkLanguageBO(languageData[1]);
    localization.generateRtlStylesheet();
    scenario('Go to the Front Office', client => {
      test('should go to the Front Office', () => client.accessToFO(Dashboard.dashboard_view_my_shop_link, 1));
    }, 'common_client');
    localization.checkLanguageFO(languageData[1]);
  }, 'common_client');
  scenario('Test 3: Edit the created language in the Back Office and check it in the Front Office', () => {
    scenario('Go back to the Back Office', client => {
      test('should back to the Back Office', async () => {
        await client.closeWindow();
        await client.switchWindow(0);
      });
    }, 'common_client');
    // Related issue #9719
    localization.editLanguage(languageData[0].name, languageEditedData[0]);
    scenario('Go to the Front Office', client => {
      test('should go to the Front Office', () => client.accessToFO(Dashboard.dashboard_view_my_shop_link, 1));
    }, 'common_client');
    localization.checkLanguageFO(languageEditedData[0]);
    scenario('Go back to the Back Office', client => {
      test('should back to the Back Office', async () => {
        await client.closeWindow();
        await client.switchWindow(0);
      });
    }, 'common_client');
    localization.editLanguage(languageEditedData[0].name, languageEditedData[1]);
    scenario('Go to the Front Office', client => {
      test('should go to the Front Office', () => client.accessToFO(Dashboard.dashboard_view_my_shop_link, 1));
    }, 'common_client');
    localization.checkLanguageFO(languageEditedData[1]);
  }, 'common_client');
  scenario('Test 4: Delete the created languages in the Back Office and check it in the Front Office', () => {
    scenario('Go back to the Back Office', client => {
      test('should back to the Back Office', async () => {
        await client.closeWindow();
        await client.switchWindow(0);
      });
    }, 'common_client');
    localization.deleteLanguage(languageData[1].name, true);
    localization.deleteLanguage(languageEditedData[1].name);
    scenario('Go to the Front Office', client => {
      test('should go to the Front Office', () => client.accessToFO(Dashboard.dashboard_view_my_shop_link, 1));
    }, 'common_client');
    localization.checkLanguageFO(languageData[1], true);
  }, 'common_client');
  scenario('Go back to the Back Office', client => {
    test('should back to the Back Office', async () => {
      await client.closeWindow();
      await client.switchWindow(0);
    });
  }, 'common_client');
  authentication.signOutBO();
}, 'common_client', true);