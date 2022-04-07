const baseMethods = require('./../HW_4_task_2.js/BaseMethods');

describe('Test for task 3', async function () {
  before(async function () {
    await baseMethods.openURL();
    await baseMethods.loginIntoSystem();
    await baseMethods.buyCurrency();
    await browser.pause(3000);
  });

  context('Buy currency', async function () {
    it('Check after exchange', async function () {
      await baseMethods.checkAfterExchange(1234);
    });
  });
});

// npx wdio run ./wdio.conf.js
