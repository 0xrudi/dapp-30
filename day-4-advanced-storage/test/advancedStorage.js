const AdvancedStorage = artifacts.require('AdvancedStorage')

contract('AdvancedStorage', () => {
    // describing advancedStorage outside of the tests since it is repeated in all of the tests
    let advancedStorage = null;
    before(async () => {
        advancedStorage = await AdvancedStorage.deployed();
    });
    // test to validate the add function by pushing an id and then returning index of 0
    it('Should add element to ids array', async () => {
        await advancedStorage.add(10);
        const result = await advancedStorage.ids(0);
        assert(result.toNumber() === 10);
    });
    // test to validate the get function to return a specific id by location
    it('Should return an element from the ids array', async () => {
        await advancedStorage.add(20);
        const result = await advancedStorage.get(1);
        // result has to be transformed by .toNumber because 
        assert(result.toNumber() === 20);
    });

    // test to return the array of ids
    it('Should return the ids array', async () => {
        const rawIds = await advancedStorage.getAll();
        const ids = rawIds.map(id => id.toNumber());
        // assert is using an additional function to validate the individual elements of the array
        assert.deepEqual(ids, [10,20]);
    });

    it('Should return the length of the ids array', async () => {
        const length = await advancedStorage.length();
        const result = length.toNumber();
        assert(result === 2);
    });


});