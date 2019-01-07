let Product = require('./product');
const {AddProduct} = require('../../selectors/BO/catalog/products/addProduct');

class CreateCombinations extends Product {

  async getCombinationData(number, attribute, pause = 2000) {
    await  this.waitFor(pause);
    await this.waitFor(AddProduct.Combination.combination_panel.replace('%NUMBER', number), 90000);
    await page.$eval(AddProduct.Combination.combination_panel.replace('%NUMBER', number), (el, attribute) => el.getAttribute(attribute), attribute).then((value) => {
      global.combinationId = value;
    });
  }
}

module.exports = CreateCombinations;

