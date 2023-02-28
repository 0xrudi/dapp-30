const SimpleStorage = artifacts.require('SimpleStorage');

contract('SimpleStorage', () => {
  // unit test to validate the set function will update the data variable within the smart contract
  it('should set the value of data variable in smart contract', async () => {
    const simpleStorage = await SimpleStorage.deployed();
    await simpleStorage.set('this');
    const result = await simpleStorage.get();
    assert(result, 'this');
  });
});
