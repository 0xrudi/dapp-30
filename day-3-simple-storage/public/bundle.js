const simpleStorageABI = [
    {
        "constant": true,
        "inputs": [],
        "name": "data",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "internalType": "string",
            "name": "_data",
            "type": "string"
          }
        ],
        "name": "set",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "get",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      }
];
const simpleStorageAddress = '0x6174fdF6FD9C2AB499b87F3A5A8a232755309B85';
const web3 = new Web3('http://localhost:9545');
const simpleStorage = new web3.eth.Contract(simpleStorageABI, simpleStorageAddress);

document.addEventListener('DOMContentLoaded', () => {
    // this is a pointer to the setData form in the html file, this will be used later for sending data to the smart contract
    const $setData = document.getElementById('setData');
    
    // this is a pointer to the data form in the html file, will be later used to interact with the smart contract
    const $data = document.getElementById('data');
    // we need an array of unlocked accounts so the the smart contract can be updated
    let accounts = [];

    web3.eth.getAccounts()
    .then(_accounts => {
        accounts = _accounts;
    });

    //this is creating a variable function that will call the getter function in the smart contract to retrieve the latest blockchain value
    const getData = () => {
        simpleStorage.methods
            .get()
            .call()
            .then(result => { 
                $data.innerHTML = result;
            });
    };
    
    getData();


    $setData.addEventListener('submit', e => { 
        e.preventDefault();
        // this is pulling the input value from the form
        const data = e.target.elements[0].value
        simpleStorage.methods
            .set(data)
            .send({from: accounts[0]})
            .then(getData);
    });
});
