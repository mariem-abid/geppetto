const {Menu} = require('../../../selectors/BO/menu');
const {BrandsPage} = require('../../../selectors/BO/catalog/brandsAndSuppliers/brands/brands');
const {BrandsAddressPage} = require('../../../selectors/BO/catalog/brandsAndSuppliers/brands/brandsAddress');
const authentication = require('../../common_scenarios/authentication');
const onBoarding = require('../../common_scenarios/onboarding');

scenario('Create "Brand" - "Brand address"', () => {
  authentication.signInBO('manufacturer');
  onBoarding.closeOnBoardingModal();
  scenario('Create a new "Brand"', client => {
    test('should go to "BrandsPage & Suppliers" page', () => client.goToSubtabMenuPage(Menu.Sell.Catalog.catalog_menu_link, Menu.Sell.Catalog.brands_suppliers_submenu_link));
    test('should click on "Add new brand" button', () => client.waitForAndClick(BrandsPage.brands_suppliers_add_new_brand_link));
    test('should set the "Name" input', () => client.waitForAndSetValue(BrandsPage.brands_suppliers_brands_name_input_field, 'PrestaShop' + global.dateTime));
    test('should set the "Short Description" input', () => client.setTextEditor(BrandsPage.brands_suppliers_brands_short_description_mce_bloc, 'short description'));
    test('should set the "Description" input', () => client.setTextEditor(BrandsPage.brands_suppliers_brands_description_mce_bloc, 'description'));
    test('should upload "Picture" to the brand', () => client.uploadFile(BrandsPage.brands_suppliers_brands_logo_input_file, dataFileFolder, "prestashop.png"));
    test('should set the "Meta title" input', () => client.waitForAndSetValue(BrandsPage.brands_suppliers_brands_meta_title_input_file, "meta title"));
    test('should set the "Meta description" input', () => client.waitForAndSetValue(BrandsPage.brands_suppliers_brands_meta_description_input_file, "meta description"));
    test('should set the "Meta keywords" input', () => client.addMetaKeywords(BrandsPage.brands_suppliers_brands_meta_keywords_input_field));
    test('should click on "Activate" button', () => client.waitForAndClick(BrandsPage.brands_suppliers_brands_enable_active_label));
    test('should click on "Save" button', () => client.waitForAndClick(BrandsPage.brands_suppliers_brands_save_button));
    test('should verify the appearance of the green validation', () => client.checkTextValue(BrandsPage.brands_suppliers_success_alert, '×\nSuccessful creation.'));
  }, 'catalog/manufacturer');

  scenario('Get the manufacturer ID', client => {
    test('should check the address existence in the "addresses list"', async () => {
      await client.isVisible(BrandsPage.brands_suppliers_brands_input_field, 1000);
      await client.search(BrandsPage.brands_suppliers_brands_input_field, 'PrestaShop' + global.dateTime);
    });
    test('should get the address ID', () => client.getTextInVar(BrandsPage.brands_brands_column.replace('%ROW', 1).replace('%COL', 2), 'manufacturer_id'));
  }, 'common_client');

  scenario('Create a new "Brand address"', client => {
    test('should click on "Add new brand address" button', () => client.waitForAndClick(BrandsAddressPage.brands_suppliers_add_new_brand_address_link));
    test('should Choose the brand name', () => client.waitForAndSelect(BrandsAddressPage.brands_suppliers_brands_brand_select, global.tab['manufacturer_id']));
    test('should set the "Last name" input', () => client.waitForAndSetValue(BrandsAddressPage.brands_suppliers_brands_last_name_input_field, "Prestashop"));
    test('should set the "First name" input', () => client.waitForAndSetValue(BrandsAddressPage.brands_suppliers_brands_first_name_input_field, "Prestashop"));
    test('should set the "Address" input', () => client.waitForAndSetValue(BrandsAddressPage.brands_suppliers_brands_address_input_field, "12 rue d'amesterdam"));
    test('should set the "Second address" input', () => client.waitForAndSetValue(BrandsAddressPage.brands_suppliers_brands_second_address_input_field, "RDC"));
    test('should set the "Zip code" input', () => client.waitForAndSetValue(BrandsAddressPage.brands_suppliers_brands_postal_code_input_field, "75009"));
    test('should set the "City" input', () => client.waitForAndSetValue(BrandsAddressPage.brands_suppliers_brands_city_input_field, "paris"));
    test('should choose the country', () => client.waitForAndSelect(BrandsAddressPage.brands_suppliers_brands_country_select, "8"));
    test('should set the "Phone" input', () => client.waitForAndSetValue(BrandsAddressPage.brands_suppliers_brands_phone_input_field, "0140183004"));
    test('should set the "Other information" input', () => client.waitForAndSetValue(BrandsAddressPage.brands_suppliers_brands_other_textarea, "azerty"));
    test('should click on "Save" button', () => client.waitForAndClick(BrandsAddressPage.brands_suppliers_brands_address_save_button));
    test('should verify the appearance of the green validation', () => client.checkTextValue(BrandsPage.brands_suppliers_success_alert, '×\nSuccessful creation.'));
  }, 'common_client');

  authentication.signOutBO();

}, 'common_client', true);
