const baseMethods = require('./../HW_4_task_2.js/BaseMethods');

const inputExchanger = '//input[@id="sum-to-buy"]';
const script = '#database';
const sumToBuy = 2222;
const timeout = 10000;

describe('Test for task 3', async function () {
  before(async function () {
    await baseMethods.openURL();
    await baseMethods.loginIntoSystem();
  });

  context('Buy currency', async function () {
    it('Check after exchange', async function () {
      await baseMethods.buyCurrency(inputExchanger, sumToBuy, script, timeout);
      await baseMethods.checkAfterExchange(sumToBuy);
    });
  });
});

// npx wdio run ./wdio.conf.js
