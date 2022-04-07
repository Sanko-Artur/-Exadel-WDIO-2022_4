const baseMethods = require('./../HW_4_task_2.js/BaseMethods');

describe('Test for task 3', async function () {
  before(async function () {
    await baseMethods.openURL();
    await baseMethods.loginIntoSystem();
    await baseMethods.buyCurrency();
  });

  context('Buy currency', async function () {
    it('Check after exchange', async function () {});
    // await baseMethods.checkAfterExchange();
  });
});

// npx wdio run ./wdio.conf.js
