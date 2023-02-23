var contractABI = [];
var contractAddress = '0x27e3e17f4eefd471ed89ef2a71c4166152953312ab6afbc24d3a68df06bae53e';
var web3 = Web3('http://localhost:9545')
var simpleSmartContract = new web3.eth.Contract(contractABI, contractAddress);

console.log(simpleSmartContract);

web3.eth.getAccounts()
.then(console.log)