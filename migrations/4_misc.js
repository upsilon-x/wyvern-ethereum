/* global artifacts: false */

const WyvernDAOProxy = artifacts.require('./WyvernDAOProxy.sol')
const WyvernAtomicizer = artifacts.require('./WyvernAtomicizer.sol')


module.exports = async (deployer, network) => {

  // Sounds like the atomicizer is just a primitive multicall
  if (network !== 'development' || network !== "develop") {
    await deployer.deploy(WyvernDAOProxy);
    await deployer.deploy(WyvernAtomicizer);
  }

}
