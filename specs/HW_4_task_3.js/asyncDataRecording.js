const baseMethods = require('./../HW_4_task_2.js/BaseMethods');

describe('Test for task 3', async function () {
  before(async function () {
    await baseMethods.openURL();
    await baseMethods.loginIntoSystem();
    await baseMethods.buyCurrency();
    await browser.pause(3000);
  });

  context('Buy currency', async function () {
    it('Check after exchange', async function () {});
    // await baseMethods.checkAfterExchange();
    // await $('#currency-rate').waitForDisplayed({
    //   timeout: 5000,
    //   timeoutMsg: `After 5 sec the element: '#currency-rate' was not displayed`,
    // });
    // const rateElement = await $('#currency-rate');
    // const rate = await rateElement.getText();
    // const sumToButElement = await $('#sum-to-buy');
    // const sumToBut = await sumToButElement.getText();
    // const result = (await rate) * sumToBut;
    // await $('#withdrew').waitForDisplayed({
    //   timeout: 5000,
    //   timeoutMsg: `After 5 sec the element: '#withdrew' was not displayed`,
    // });
    // const operationResult = await $('#withdrew');
    // await expect(operationResult).toHaveText(result);
  });
});

// npx wdio run ./wdio.conf.js
