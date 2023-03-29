const Deed = artifacts.require('Deed');

contract('Deed', (accounts) => {
    let deed = null;
    before(async () => {
        deed = await Deed.deployed();
    });

    it('should withdraw', async () => {
        // using the web3 utils "to big number" function to transform balance to BN
        const initialBalance = web3.utils.toBN(await web3.eth.getBalance(accounts[1]));
        // specifying the from address to ensure our test is explicit
        await new Promise(resolve => setTimeout(resolve, 5000));
        await deed.withdraw({from: accounts[0]});
        // using the web3 utils "to big number" function to transform balance to BN
        const finalBalance = web3.utils.toBN(await web3.eth.getBalance(accounts[1]));
        assert(finalBalance.sub(initialBalance).toNumber() === 100);
    });
    
    it('should not withdraw if too early', async () => {
        const deed = await Deed.new(accounts[0], accounts[1], 5, {value: 100});
        try {
            await deed.withdraw({from: accounts[0]});
        } catch (e) {
            assert(e.message.includes('amount can not yet be distributed'));
            return;
        }
        assert(false);
    });

    it('should not withdraw if sender is not lawyer', async () => {
        const deed = await Deed.new(accounts[0], accounts[1], 5, {value: 100});
        try {
            await new Promise(resolve => setTimeout(resolve, 5000));
            await deed.withdraw({from: accounts[4]});
        } catch (e) {
            assert(e.message.includes('sender not authorized'));
            return;
        }
        assert(false);
    });
});