import Web3 from 'web3';
import EtherWallet from '../build/contracts/EtherWallet.json';

let web3;
let etherWallet;

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

const initContract = async () => {
  const networkId = await web3.eth.net.getId();
  return new web3.eth.Contract(
    EtherWallet.abi, 
    EtherWallet
      .networks[networkId]
      .address
  );
};

const initApp = () => {
  // Start the initApp by declaring variables to point to the HTML code
  const $deposit = document.getElementById('deposit');
  const $depositResult = document.getElementById('deposit-result');
  const $send = document.getElementById('send');
  const $sendResult = document.getElementById('send-result');
  const $balance = document.getElementById('balance');


  let accounts = [];

  web3.eth.getAccounts()
    .then(_accounts => {
      accounts = _accounts;
    });

  // create a callback function to refresh the balance and display it
  const refreshBalance = () => {
    etherWallet.methods
      .balanceOf()
      .call()
      .then(result => {
        $balance.innerHTML = `balance of contract: ${result} wei`
      });
  };

  refreshBalance();
  
  $deposit.addEventListener('submit', (e) => {
    e.preventDefault();
    const amount = e.target.elements[0].value;
    etherWallet.methods
      .deposit()
      .send({from: accounts[0], value: amount})
      .then(result => {
        $depositResult.innerHTML = `Success! ${amount} wei has been deposited to the contract!`;
        refreshBalance();
      })
      .catch(_e => {
        $depositResult.innerHTML = `Ooops... there was an error while trying to deposit to the contract...`;
      });
  });

  $send.addEventListener('submit', (e) => {
    e.preventDefault();
    // declaring variables to retrieve values entered on the UI
    const sendTo = e.target.elements[0].value;
    const amount = e.target.elements[1].value;
    etherWallet.methods
      .send(sendTo, amount)
      .send({from: accounts[0]})
      .then(result => {
        $sendResult.innerHTML = `${amount} wei was sent to ${sendTo}`;
        refreshBalance();
      })
      .catch(_e => {
        $sendResult.innerHTML = `oops... there was an issue sending to ${sendTo}`;
      });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initWeb3()
    .then(_web3 => {
      web3 = _web3;
      return initContract();
    })
    .then(_etherWallet => {
      etherWallet = _etherWallet;
      initApp(); 
    })
    .catch(e => console.log(e.message));
});
