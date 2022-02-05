/* global artifacts: false */

const TestToken = artifacts.require('./TestToken.sol')
const TestDAO = artifacts.require('./TestDAO.sol')
const TestStatic = artifacts.require('./TestStatic.sol')

module.exports = async (deployer, network) => {
  // Deploy test contracts if on development
  if (network === 'development' || network === 'develop') {
    await deployer.deploy(TestToken);
    await deployer.deploy(TestDAO, TestToken.address);
    await deployer.deploy(TestStatic);
  }
}
