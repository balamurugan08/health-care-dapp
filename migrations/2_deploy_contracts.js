
const SimpleStorage = artifacts.require("SimpleStorage");
const User = artifacts.require("User");

module.exports = function(deployer) {
  
  deployer.deploy(SimpleStorage);
  deployer.deploy(User);
};