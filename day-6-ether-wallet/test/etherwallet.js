const EtherWallet = artifacts.require('EtherWallet');

// specify accounts as an arguement in the callback to have access to truffle accounts
contract('EtherWallet', (accounts) => {
    // set up a null instance of the smart contract
    let etherWallet = null;
    before(async () => {
        etherWallet = await EtherWallet.deployed();
    });

    it('Should set accounts[0] as the contract owner', async () => {
        const owner = await etherWallet.owner();
        assert(owner === accounts[0]);
    });

    it('Should deposit ether to wallet', async () => {
        await etherWallet.deposit({
            // we don't technically have to specify the sending address
            // truffle will default to accounts[0], but wanted to be explicit here
            from: accounts[0],
            // value is in wei
            value: 100
        });
        const balance = await web3.eth.getBalance(etherWallet.address);
        assert(parseInt(balance) === 100);
    });

    it('Should return balance of the contract', async () => {
        const balance = await etherWallet.balanceOf();
        assert(parseInt(balance) === 100);
    });

    it('Should transfer ether from contract to another address', async () => {
        // we want to calculate the balance of the recipient address 
        // before the send transaction takes place so it can be compared to after
        const balancRecipientBefore = await web3.eth.getBalance(accounts[1]);
        await etherWallet.send(accounts[1], 50, {
            from: accounts[0]
        });
        const balanceWallet = await web3.eth.getBalance(etherWallet.address);
        'Since 50 wei is sent from the contract, we assert that 50 wei should remain in the contract'
        assert(parseInt(balanceWallet) === 50);
        
        // Here we are capturing the balance of the recipient address after the send transaction happens
        const balancRecipientAfter = await web3.eth.getBalance(accounts[1]);
        
        //Here we are converting the amounts to javascript big number so they can be manipulated in the validation
        const finalBalance = web3.utils.toBN(balancRecipientAfter);
        const initialBalance = web3.utils.toBN(balancRecipientBefore);
        // Here we subtract the final balance using built in sub function and then convert back to normal javascript number for validation
        assert(finalBalance.sub(initialBalance).toNumber() === 50);
    });

    it('should not transfer ether if the sender is not the owner', async () => {
        try {
            await etherWallet.send(accounts[1], 50, {
                from: accounts[2]
            });
        } catch(e) {
            assert(e.message.includes('sender is not allowed'));
            return;
        }
        assert(false);
    });

})