const DeedMultiPayout = artifacts.require('DeedMultiPayout');

contract('DeedMultiPayout', (accounts) => {
    let deedMultiPayout = null;
    before(async () => {
        deedMultiPayout = await DeedMultiPayout.deployed();
    });

    it('should withdraw for all payouts (1)', async () => {
        for(let i = 0; i < 4; i++) {
            const initialBalance = web3.utils.toBN(await web3.eth.getBalance(accounts[1]));
            await new Promise(resolve => setTimeout(resolve, 1000));
            await deedMultiPayout.withdraw({from: accounts[1]});
            const finalBalance = web3.utils.toBN(await web3.eth.getBalance(accounts[1]));
            assert(finalBalance.sub(initialBalance).toNumber() === 25);
        }
    });

    it('should withdraw for all payouts (2)', async () => {
        const deedMultiPayout = await DeedMultiPayout.new(accounts[0], accounts[1], 1, {value: 100});
        for(let i = 0; i < 2; i++) {
            const balanceBefore = web3.utils.toBN(await web3.eth.getBalance(accounts[1]));
            await new Promise(resolve => setTimeout(resolve, 2000));
            await deedMultiPayout.withdraw({from: accounts[1]});
            const balanceAfter = await web3.utils.toBN(web3.eth.getBalance(accounts[1]));
            assert(balanceAfter.sub(balanceBefore).toNumber() === 50);
        }
    });

    it('should NOT withdraw if no payout left', async () => {
        try {
          await deedMultiPayout.withdraw({from: accounts[1]});
        } catch (e) {
          assert(e.message.includes('no payouts left'));
          return;
        }
        assert(false);
      });

    it('should not withdraw if too early', async () => {
        const deedMultiPayout = await DeedMultiPayout.new(accounts[0], accounts[1], 5, {value: 100});
        try {
            await deedMultiPayout.withdraw({from: accounts[1]});
        } catch (e) {
            assert(e.message.includes('amount can not yet be distributed'));
            return;
        }
        assert(false);
    });

    it('should not withdraw if sender is not lawyer', async () => {
        const deedMultiPayout = await DeedMultiPayout.new(accounts[0], accounts[1], 5, {value: 100});
        try {
            await new Promise(resolve => setTimeout(resolve, 5000));
            await deedMultiPayout.withdraw({from: accounts[4]});
        } catch (e) {
            assert(e.message.includes('only beneficiary can withdrawal'));
            return;
        }
        assert(false);
    });
});