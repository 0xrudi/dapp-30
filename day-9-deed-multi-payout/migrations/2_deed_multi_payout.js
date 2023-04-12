const DeedMultiPayout = artifacts.require("DeedMultiPayout");

module.exports = function (deployer, _network, accounts) {
  // in this deployment, account[0] will be the lawyer, account[1] will be 
  // the beneficiary, the timelock will be 5 seconds and we will send
  // 100 wei into the contract
  deployer.deploy(DeedMultiPayout, accounts[0], accounts[1], 5, {value: 100});
};
