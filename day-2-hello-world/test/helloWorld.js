const HelloWorld = artifacts.require('HelloWorld');

contract('HelloWorld', () => {
    it('Should return Hello World', async () => {
        // use async because we are using the await keyword
        const helloWorld = await HelloWorld.deployed();
        // constant will point to an instance of the deployed HelloWorld contract using the truffle-contracts library
        // use await keyword because the deployment method will return a promise
        // HelloWorld refers to the imported smart contract artifact
        const result = await helloWorld.hello();
        // .hello is a public function within the smart contract that we are testing
        assert(result === 'Hello World');
        // the test is validated by requiring the stored value to match the string above
    });
});