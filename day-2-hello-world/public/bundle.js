var contractABI = [
    {
      "constant": true,
      "inputs": [],
      "name": "hello",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "pure",
      "type": "function"
    }
];
//contract abi is copied from HelloWorld.JSON file within the build -> contracts folder
var contractAddress = '0x895F9578020e2883Ce3AD318D6B73f4c5f79beB6';
// contract address is retrieved from running truffle develop then the migrate command 
// and copying the contract address for the Hello World smart contract

var web3 = new Web3('http://localhost:9545')
var helloWorld = new web3.eth.Contract(contractABI, contractAddress);
// helloWorld is a variable holding a pointer to the existing instance of a smart contract

document.addEventListener('DOMContentLoaded', () => {
  helloWorld.methods.hello().call()
    .then(result => {
        document.getElementById('hello').innerHTML = result;
  });
});
