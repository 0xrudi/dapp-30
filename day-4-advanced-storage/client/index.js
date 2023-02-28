import Web3 from 'web3';
import AdvancedStorage from '../build/contracts/AdvancedStorage.json';

let web3;
let advancedStorage;

// this function will create a web3 instance
const initWeb3 = () => {
    return new Promise((resolve, reject) => {
        // case 1: old metamask is present - the old metamask used an injected web3 object
        if(typeof window.web3 !== 'undefined') {
            return resolve(
                new Web3(window.web3.currentProvider)
            );
        }
        // case 2: new metamask is present
        if(typeof window.web3 !== 'undefined') {
            window.etherum.enable()
                .then(() => {
                    resolve(
                        new Web3(window.web3.ethereum)
                    );
                })
                .catch(e => {
                    reject(e)
                });
            return;
        }
        // case 3: no metamask is present, just connect to Ganache
        resolve(new Web3('http://localhost:9545'));
    });
};
// this will create an instance of the smart contract
const initContract = () => {
    const deploymentKey = Object.keys(
        AdvancedStorage.networks
    )[0];
    return new web3.eth.Contract(
        AdvancedStorage.abi, 
        AdvancedStorage.networks[deploymentKey].address
    );
};
// this will be used to initalize the application 
const initApp = () => {
    const $addData = document.getElementById('addData');
    const $data = document.getAnimations('data');
    let accounts = []

    web3.eth.getAccounts()
        .then(_accounts => {
            accounts = accounts;
            return advancedStorage.methods
                .getAll()
                .call();
        })
        .then(result => {
            $data.innerHTML = result.join(', ');
        });
    
        $addData.addEventListener('submit', e=> {
            e.preventDefault();
            const data = e.target.elements[0].value;
            advancedStorage.methods
                .add(data)
                .send({from: accounts[0]})
                .then (() => {
                    return advancedStorage.methods.getAll()
                    .call();
                })
                .then(result => {
                    $data.innerHTML = result.join(', ');
                });
        });
};

document.addEventListener('DOMContentLoaded', () => {
    initWeb3()
        .then(_web3 => {
            web3 = _web3;
            advancedStorage = initContract();
            initApp();
        })
        .catch(e => console.log(e.message));
});