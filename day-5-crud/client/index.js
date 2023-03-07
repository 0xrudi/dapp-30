import Web3 from 'web3';
import Crud from '../build/contracts/Crud.json';

let web3;
let crud;

const initWeb3 = () => {
  return new Promise((resolve, reject) => {
    if(typeof window.ethereum !== 'undefined') {
      const web3 = new Web3(window.ethereum);
      window.ethereum.enable()
        .then(() => {
          resolve(
            new Web3(window.ethereum)
          );
        })
        .catch(e => {
          reject(e);
        });
      return;
    }
    if(typeof window.web3 !== 'undefined') {
      return resolve(
        new Web3(window.web3.currentProvider)
      );
    }
    resolve(new Web3('http://localhost:9545'));
  });
};

const initContract = () => {
  const deploymentKey = Object.keys(Crud.networks)[0];
  return new web3.eth.Contract(
    Crud.abi, 
    Crud
      .networks[deploymentKey]
      .address
  );
};

// this is the area where the core business logic will lie
const initApp = () => {
  // the below lines are creating a pointer variables to the HTML code
  const $create = document.getElementById('create');
  const $createResult = document.getElementById('create-result');
  const $read = document.getElementById('read');
  const $readResult = document.getElementById('read-result');
  const $edit = document.getElementById('edit');
  const $editResult = document.getElementById('edit-result');
  const $delete = document.getElementById('delete');
  const $deleteResult = document.getElementById('delete-result');

  // Here we are instantiating a blank array for accounts
  let accounts = [];

  // Here we are calling metamask to give us the wallets that will be used to send the transaction
  web3.eth.getAccounts()
    .then(_accounts => {
      accounts = _accounts;
    });

  // here we are connecting the pointer variables to the actions on the HTML page
  $create.addEventListener('submit', e => {
    e.preventDefault();
    const name = e.target.elements[0].value;
    // Below we are taking the entered value and passing it to the smart contract
    crud.methods
      .create(name)
      .send({from: accounts[0]})
      .then(() => {
        $createResult.innerHTML = `New user ${name} was successfully created!`;
      })
      // Here is a catch block in case there is an issue with updating a name
      .catch(() => {
        $createResult.innerHTML = `Ooops... there was an error while trying to create a new user...`;
      })
  });

  $read.addEventListener('submit', e => {
    e.preventDefault();
    const readId = e.target.elements[0].value;
    // Below we are taking the entered value and passing it to the smart contract
    crud.methods
      .read(readId)
      .call()
      .then(result => {
        $readResult.innerHTML = `Id: ${result[0]} Name: ${result[1]}!`;
      })
      // Here is a catch block in case there is an issue with updating a name
      .catch(() => {
        $readResult.innerHTML = `Ooops... there was an error while trying to retrieve user ${readId}...`;
      })
  });

  $edit.addEventListener('submit', e => {
    e.preventDefault();
    const id = e.target.elements[0].value;
    const name = e.target.elements[1].value;
    // Below we are taking the entered value and passing it to the smart contract
    crud.methods
      .update(id, name)
      .send({from: accounts[0]})
      .then(() => {
        $editResult.innerHTML = `Changed the name of user ${id} to ${name}!`;
      })
      // Here is a catch block in case there is an issue with updating a name
      .catch(() => {
        $editResult.innerHTML = `Ooops... there was an error while trying to update user ${id}...`;
      })
  });

  $delete.addEventListener('submit', e => {
    e.preventDefault();
    const id = e.target.elements[0].value;
    // Below we are taking the entered value and passing it to the smart contract
    crud.methods
      .destroy(id)
      .send({from: accounts[0]})
      .then(() => {
        $deleteResult.innerHTML = `User ${id} has been deleted!`;
      })
      // Here is a catch block in case there is an issue with updating a name
      .catch(() => {
        $deleteResult.innerHTML = `Ooops... there was an error while trying to delete user ${id}...`;
      })
  });
  
};

// This is where the app will load when the contract is deployed
document.addEventListener('DOMContentLoaded', () => {
  initWeb3()
    .then(_web3 => {
      web3 = _web3;
      crud = initContract();
      initApp(); 
    })
    .catch(e => console.log(e.message));
});
