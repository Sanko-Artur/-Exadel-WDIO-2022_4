const baseMethods = require('./BaseMethods');

const columnId = '//div[@tabulator-field="id"][@role="gridcell"]';
const columnName = '//div[@tabulator-field="name"][@role="gridcell"]';
const columnAge = '//div[@tabulator-field="age"][@role="gridcell"]';

describe('Test for task 2', async function () {
  before(async function () {
    await baseMethods.openURL();
    await baseMethods.loginIntoSystem();
  });

  context('Direct sorting out columns', async function () {
    it('Id column', async function () {
      await baseMethods.clickIdFilter();
      await baseMethods.checkDirectFilterOfId();
      const idArray = await baseMethods.getValueOfcolumn(columnId);
      const sortedIdArray = idArray.sort((a, b) => a - b);
      await expect(sortedIdArray).toEqual(idArray);
    });

    it('Name column', async function () {
      await baseMethods.clickNameFilter();
      await baseMethods.checkDirectFilterOfName();
      const nameArray = await baseMethods.getValueOfcolumn(columnName);
      const sortedNameArray = nameArray.sort((a, b) => a - b);
      await expect(sortedNameArray).toEqual(nameArray);
    });

    it('Age column', async function () {
      await baseMethods.clickAgeFilter();
      await baseMethods.checkDirectFilterOfAge();
      const ageArray = await baseMethods.getValueOfcolumn(columnAge);
      const sortedAgeArray = ageArray.sort((a, b) => a - b);
      await expect(sortedAgeArray).toEqual(ageArray);
    });
  });

  context('Indirect sorting out columns', async function () {
    it('Id column', async function () {
      await baseMethods.clickIdFilter();
      await baseMethods.clickIdFilter();
      await baseMethods.checkIndirectFilterOfId();
      const idArray = await baseMethods.getValueOfcolumn(columnId);
      const sortedIdArray = idArray.sort((a, b) => b - a);
      await expect(sortedIdArray).toEqual(idArray);
    });

    it('Name column', async function () {
      await baseMethods.clickNameFilter();
      await baseMethods.clickNameFilter();
      await baseMethods.checkIndirectFilterOfName();
      const nameArray = await baseMethods.getValueOfcolumn(columnName);
      const sortedNameArray = nameArray.sort((a, b) => b - a);
      await expect(sortedNameArray).toEqual(nameArray);
    });

    it('Age column', async function () {
      await baseMethods.clickAgeFilter();
      await baseMethods.clickAgeFilter();
      await baseMethods.checkIndirectFilterOfAge();
      const ageArray = await baseMethods.getValueOfcolumn(columnAge);
      const sortedAgeArray = ageArray.sort((a, b) => b - a);
      await expect(sortedAgeArray).toEqual(ageArray);
    });
  });
});

// npx wdio run ./wdio.conf.js
// npm run test
