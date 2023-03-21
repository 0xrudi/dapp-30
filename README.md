# dapp-30
This repositories includes will include a portfolio of smart contract mini projects that I completed to learn the fundametals of developing Solidity smart contracts.

Package dependencies to run the projects
- Truffle
- Ganache
- WebPack

How to run each of the project folders
  - clone/download the code within each folder
  - run truffle

# day 1 - Simple Smart Contract
This inital folder is focused on getting reoriented with the formalities of setting up a smart contract and deploying in remix.

# day 2 - Hello World
In this simple project, I created my first function to simply return a static value. The function itself is nothing to write home about, but I learned how to connect the function returned value to read on the web page.

# day 3 - Simple Storage
Today, I created a new smart contract that allowed me to store an updateable attribute in the smart contract. This was cool because after hooking the smart contract to the webpage, I was able to arbitrarily change the value stored on-chain using a simple user interface.

# day 4 - Advanced Storage
This project builds off of the previous day with an additional nuance. Within the smart contract, the "data" variable is an array of numbers,  Consequently, upon clicking submit, the entered value will be appended to the array instead of replacing the single value.
In this project there were some additional achievements made with the front-end portion. Instead of connecting the dapp to the local ganache blockchain instance in the background, I connected the metamask instance directly in the browser to more closely simulate real world interactions. 

# day 5 - CRUD (Create, Read, Update, Delete)
CRUD is commonly used in database management and here we apply the functionality to smart contracts. Here I begin to use structs for the first time and used that struct as an array. 
Over the course of a project, i did a little bit of refactoring and created a helper function to remove redundant loops of code.
When testing the smart contracts, I used try/catch blocks to perform negative test scenarios (scenarios that should intentionally fail).

# day 6 - Ether Wallet
This project is my first attempt to use solidity for one of it's primary uses, financial transactions. The basic functionality for this contract will be to send, receive, and hold ether. For basic utility, I added a security feature that requires withdrawals from the smart contract to be performed by the owner of the contract. In the context of this project, the owner of the contract is the address that deploys the wallet. While this may cause User Experience hurdles in production, this feature is a necessity to prevent any arbitrary user from withdrawing the funds.

For the frontend of this project, I updated the logic to retrieve the contract address to more closely replicate mainnet. In this project, I utilized web3.eth.net.getId() to retrieve the id of the network that is currently selected in the user's metamask instance. This is important because an app may be deployed on several different networks and it is important to retrieve the correct contract based on what the user has picked.

# day 7 - Split Payment
The use case for this project is building off of the previous wallet project. Imagine a DAO is maintaining their treasury on-chain and has to send payments for various expenses. This project will allow them to send payments to multiple parties within a single transaction. This is useful for instances like payroll, where they make recurring payments to multiple individuals, therefore they can minimize amounts of transactions and costs by combining into one transaction.

In this project, I used the modifier keyword for the first time to modify behav