class BaseMethods {
  constructor() {
    this.url = 'https://viktor-silakov.github.io/course-sut/index.html?quick';
    this.inputForLogin = '#login';
    this.inputForPassword = '#password';
    this.login = 'walker@jw.com';
    this.password = 'password';
    this.buttonLogin = 'button';
    this.spinner = '.spinner-border text-light';

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

    this.inputExchanger = '#sum-to-buy';
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
    await browser.maximizeWindow();
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

  async clickOnElement(selector) {
    await this.waitForDisplayed(selector);
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

  async getValueOfcolumnId() {
    const value = await this.getValueOfcolumn(this.columnId);
    return value;
  }

  async getValueOfcolumnName() {
    const value = await this.getValueOfcolumn(this.columnName);
    return value;
  }

  async getValueOfcolumnAge() {
    const value = await this.getValueOfcolumn(this.columnAge);
    return value;
  }

  async clickButtonBuy() {
    await this.clickOnElement(this.buttonBuy);
  }

  async setValue(selector, value) {
    await this.waitForDisplayed();
    await $(selector).setValue(value);
  }

  async waitUntilElementAcceptItem(selector, value, timeout) {
    await $(selector).waitUntil(
      async function () {
        return (await this.getText()) === `${value}`;
      },
      {
        timeout: timeout,
        timeoutMsg: `expected text is different after ${timeout} ms`,
      }
    );
  }

  async buyCurrency() {
    await this.setValue(this.inputExchanger, '1');
    // await this.waitUntilElementAcceptItem(this.script, 1, 10000);
    await this.setValue(this.inputExchanger, '2');
    // await this.waitUntilElementAcceptItem(this.script, 2, 10000);
    await this.setValue(this.inputExchanger, '3');
    // await this.waitUntilElementAcceptItem(this.script, 3, 10000);
    await this.setValue(this.inputExchanger, '4');
    // await this.waitUntilElementAcceptItem(this.script, 4, 10000);
    await this.clickButtonBuy();
  }

  // async checkAfterExchange() {
  //   await this.waitForDisplayed(this.currencyRate);
  //   const rate = await $(this.currencyRate).getText();
  //   const sumToBut = await $(this.inputExchanger).getText();
  //   const result = rate * sumToBut;
  //   const operationResult = await $(this.operationResult);
  //   await expect(operationResult).toHaveText(result);
  // }
}

module.exports = new BaseMethods();
