class BaseMethods {
  constructor() {
    this.url = 'https://viktor-silakov.github.io/course-sut/index.html?quick';
    this.inputForLogin = '#login';
    this.inputForPassword = '#password';
    this.login = 'walker@jw.com';
    this.password = 'password';
    this.buttonLogin = 'button';
    this.spinner = '//div[@class="spinner-border text-light"]'; //.spinner-border text-light

    this.idFilter =
      '//div[contains(text() , "Id")]/following-sibling::div[@class="tabulator-col-sorter"]';
    this.nameFilter =
      '//div[contains(text() , "Name")]/following-sibling::div[@class="tabulator-col-sorter"]';
    this.ageFilter =
      '//div[contains(text() , "Age")]/following-sibling::div[@class="tabulator-col-sorter"]';

    this.idColumnHeader = '//div[@tabulator-field="id"][@role="columnheader"]';
    this.nameColumnHeader =
      '//div[@tabulator-field="name"][@role="columnheader"]';
    this.ageColumnHeader =
      '//div[@tabulator-field="age"][@role="columnheader"]';

    this.attrOfArrow = 'aria-sort';
    this.directArrow = 'asc';
    this.indirectArrow = 'desc';

    this.columnId = '//div[@tabulator-field="id"][@role="gridcell"]';
    this.columnName = '//div[@tabulator-field="name"][@role="gridcell"]';
    this.columnAge = '//div[@tabulator-field="age"][@role="gridcell"]';

    this.inputExchanger = '//input[@id="sum-to-buy"]'; // '#sum-to-buy'
    this.script = '#database';
    this.a = '//script[@id="database"][contains(text() , "1")]';
    this.b =
      '//script[@id="database"][contains(text() , "1")][contains(text() , "2")]';
    this.c =
      '//script[@id="database"][contains(text() , "1")][contains(text() , "2")][contains(text() , "2")]';
    this.d =
      '//script[@id="database"][contains(text() , "1")][contains(text() , "2")][contains(text() , "3")][contains(text() , "4")]';
    this.buttonBuy = '//button[contains(text() , "Buy")]';
    this.currencyRate = '#currency-rate';
    this.operationResult = '#withdrew';
  }

  async openURL() {
    // await browser.maximizeWindow();
    await browser.url(this.url);
  }

  async loginIntoSystem() {
    await $(this.inputForLogin).setValue(this.login);
    await $(this.inputForPassword).setValue(this.password);
    await $(this.buttonLogin).click();
    await $(this.spinner).waitForDisplayed({
      timeout: 15000,
      reverse: true,
      timeoutMsg: `After 15 sec the element: ${this.spinner} was not disappear`,
    });
  }

  async waitForDisplayed(selector) {
    await $(selector).waitForDisplayed({
      timeout: 5000,
      timeoutMsg: `After 5 sec the element: ${selector} was not displayed`,
    });
  }

  async waitForClickable(selector) {
    await $(selector).waitForClickable({
      timeout: 5000,
      timeoutMsg: `After 5 sec the element: ${selector} is not clickable`,
    });
  }

  async clickOnElement(selector) {
    await this.waitForDisplayed(selector);
    await this.waitForClickable(selector);
    await $(selector).click();
  }

  async checkShapeOfArrow(selector, attr, value) {
    await this.waitForDisplayed(selector);
    const elem = await $(selector);
    await expect(elem).toHaveAttributeContaining(attr, value);
  }

  async clickIdFilter() {
    await this.clickOnElement(this.idFilter);
  }

  async checkDirectFilterOfId() {
    await this.checkShapeOfArrow(
      this.idColumnHeader,
      this.attrOfArrow,
      this.directArrow
    );
  }

  async checkIndirectFilterOfId() {
    await this.checkShapeOfArrow(
      this.idColumnHeader,
      this.attrOfArrow,
      this.indirectArrow
    );
  }

  async clickNameFilter() {
    await this.clickOnElement(this.nameFilter);
  }

  async checkDirectFilterOfName() {
    await this.checkShapeOfArrow(
      this.nameColumnHeader,
      this.attrOfArrow,
      this.directArrow
    );
  }

  async checkIndirectFilterOfName() {
    await this.checkShapeOfArrow(
      this.nameColumnHeader,
      this.attrOfArrow,
      this.indirectArrow
    );
  }

  async clickAgeFilter() {
    await this.clickOnElement(this.ageFilter);
  }

  async checkDirectFilterOfAge() {
    await this.checkShapeOfArrow(
      this.ageColumnHeader,
      this.attrOfArrow,
      this.directArrow
    );
  }

  async checkIndirectFilterOfAge() {
    await this.checkShapeOfArrow(
      this.ageColumnHeader,
      this.attrOfArrow,
      this.indirectArrow
    );
  }

  async getValueOfcolumn(selector) {
    await this.waitForDisplayed(selector);
    const links = await $$(selector);
    const textPromises = links.map(async (link) => {
      return await link.getText();
    });
    const text = await Promise.all(textPromises);
    return text;
  }

  async clickButtonBuy() {
    await this.clickOnElement(this.buttonBuy);
  }

  async buyCurrency(selectorForInput, sumToBuy, selectorForScript, timeout) {
    await this.waitForDisplayed(selectorForInput);
    await this.waitForClickable(selectorForInput);
    const toString = String(sumToBuy);
    const splitSum = toString.split('');
    for (let i = 0; i < splitSum.length; ++i) {
      await $(selectorForInput).addValue(splitSum[i]);
      await $(selectorForScript).waitUntil(
        async function () {
          const valueOfElement = await this.getHTML(false);
          const parseValue = JSON.parse(valueOfElement);
          return parseValue[i].num === `${splitSum[i]}`;
        },
        {
          timeout: timeout,
          timeoutMsg: `expected text is different after ${timeout} ms`,
        }
      );
    }
    await this.clickButtonBuy();
  }

  async checkAfterExchange(sumToBuy) {
    await this.waitForDisplayed(this.currencyRate);
    const rate = await $(this.currencyRate).getText();
    const resultOfExchange = (await rate) * sumToBuy;
    const result = `${sumToBuy} => ${resultOfExchange}`;
    await this.waitForDisplayed(this.operationResult);
    const operationResult = await $(this.operationResult);
    await expect(operationResult).toHaveText(result);
  }
}

module.exports = new BaseMethods();
