const DeedMultiPayout = artifacts.require("DeedMultiPayout");

module.exports = function (deployer, _network, accounts) {
  // in this deployment, account[0] will be the lawyer, account[1] will be 
  // the beneficiary, the timelock will be 1 second and we will send
  // 100 wei into the contract
  deployer.deploy(DeedMultiPayout, accounts[0], accounts[1], 1, {value: 100});
};
