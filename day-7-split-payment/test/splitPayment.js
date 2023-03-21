const SplitPayment = artifacts.require('SplitPayment');

contract('SplitPayment', (accounts) => {
    let splitPayment = null;
    before(async () => {
        splitPayment = await SplitPayment.deployed();
    });

    it('Should split payment', async () => {
        const recipients = [accounts[1], accounts[2], accounts[3]];
        const amounts = [200000, 300000, 400000];
        // declare initial balances to create an array of the 
        // balances of each address before the transaction is sent
        const initialBalances = await Promise.all(
            // map function will map an address to an amount
            recipients.map((recipient) => {
                return web3.eth.getBalance(recipient);
        }));
        await splitPayment.send(
            recipients,
            amounts,
            {from: accounts[0], value: 900000}
        );
        const finalBalances = await Promise.all(
            recipients.map((recipient) => {
                return web3.eth.getBalance(recipient);
        }));
        // here we are iterating through the recipient lists and retrieving their
        // initial and final balances
        recipients.forEach((_item, i) => {
            const finalBalance = web3.utils.toBN(finalBalances[i]);
            const initialBalance = web3.utils.toBN(initialBalances[i]);
            assert(finalBalance.sub(initialBalance).toNumber() === amounts[i]);
        });
    });

    it('should NOT split payment if array lengths mismatch', async () => {
        const recipients = [accounts[1], accounts[2], accounts[3]];
        const amounts = [200000, 300000, 400000, 500000];
        try{
            await splitPayment.send(
                recipients,
                amounts,
                {from: accounts[0], value: 900000}
            );
        } catch (e) {
            assert(e.message.includes('to and amount arrays must hace the same length'));
            return
        }
        assert(false);
    });

    it('should NOT send payment if sender is not owner', async () => {
        try {
            const recipients = [accounts[1], accounts[2], accounts[3]];
            const amounts = [200000, 300000, 400000];
        // declare initial balances to create an array of the 
        // balances of each address before the transaction is sent
            await splitPayment.send(
                recipients,
                amounts,
                {from: accounts[5], value: 900000}
            );
        } catch (e) {
            assert(e.message.includes('sender must be owner'));
            return;
        }
        assert(false);
    });
});