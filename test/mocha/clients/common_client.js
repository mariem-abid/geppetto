const puppeteer = require('puppeteer');
const {globals} = require('../../globals.js');
const {Authentication} = require('../selectors/BO/authenticationPage');
const {Dashboard} = require('../selectors/BO/dashboardPage');
const {HomePage} = require('../selectors/FO/homePage');
global.tab = [];

let options = {
  timeout: 30000,
  headless: false,
  defaultViewport: {
    width: 0,
    height: 0
  },
  args: [`--window-size=${1280},${1024}`]
};

class CommonClient {
  async open() {
    this.browser = await puppeteer.launch(options);
    const pages = await this.browser.pages();
    this.page = await pages[0];
  }

  async close() {
    await this.browser.close();
  }

  async stopTracing() {
    await this.page.tracing.stop();
  }

  async waitFor(timeoutOrSelectorOrFunction, options = {}) {
    await this.page.waitFor(timeoutOrSelectorOrFunction, options);
  }

  async startTracing(testName = 'test') {
    await this.page.tracing.start({
      path: 'trace/' + testName + '.json',
      categories: ['devtools.timeline']
    });
  }

  async accessToBo() {
    await this.page.goto(global.URL + '/admin-dev');
    await this.page._client.send('Emulation.clearDeviceMetricsOverride');
    await this.waitFor(Authentication.page_content);
  }

  async signInBo() {
    await this.waitFor(Authentication.email_input);
    await this.page.type(Authentication.email_input, global.email);
    await this.waitFor(Authentication.password_input);
    await this.page.type(Authentication.password_input, global.password);
    await this.waitForAndClick(Authentication.login_button);
    await this.waitFor(Dashboard.page_content);
  }

  async accessToFo() {
    await this.page.goto(global.URL);
    await this.page._client.send('Emulation.clearDeviceMetricsOverride');
    await this.waitFor(HomePage.logo_home_page);
  }

  async waitForAndClick(selector, wait = 0, options = {}) {
    await this.page.waitFor(wait);
    await this.page.waitFor(selector, options);
    await this.page.click(selector, options);
  }

  async switchShopLanguageInFo(language = 'fr') {
    await this.waitForAndClick(HomePage.language_selector);
    await this.waitFor(1000);
    if (language === 'en') {
      await this.waitForAndClick(HomePage.language_EN);
    } else {
      await this.waitForAndClick(HomePage.language_FR);
    }
  }

  async screenshot(fileName = 'screenshot') {
    await this.page.waitForNavigation({waitUntil: 'domcontentloaded'});
    await this.page.screenshot({path: 'test/mocha/screenshots/' + fileName + global.dateTime + '.png'});
  }

  async eval(selector, value) {
    await this.page.$eval(selector, (el, value) => el.value = value, value);
  }

  async keyboard(parameter = 'press', key, options = {}) {
    switch (parameter) {
      case "press":
        await this.page.keyboard.press(key, options);
        break;
    }
  }

  async getTextInVar(selector, wait = 0, globalVar) {
    await this.waitFor(wait);
    await this.waitFor(selector);
    global.tab[globalVar] = await  this.page.$eval(selector, el => el.innerText);
  }

  async checkTextValue(selector, textToCheckWith, parameter = 'equal', wait = 0) {
    switch (parameter) {
      case "equal":
        await this.waitFor(wait);
        await this.waitFor(selector);
        await this.page.$eval(selector, el => el.innerText).then((text) => expect(text).to.equal(textToCheckWith));
        break;
      case "contain":
        await this.waitFor(wait);
        await this.waitFor(selector);
        await this.page.$eval(selector, el => el.innerText).then((text) => expect(text).to.contain(textToCheckWith));
        break;
    }
  }


}

module.exports = CommonClient;

