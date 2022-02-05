/* global artifacts: false */

const WyvernExchange = artifacts.require('./WyvernExchange.sol')
const WyvernProxyRegistry = artifacts.require('./WyvernProxyRegistry.sol')
const WyvernTokenTransferProxy = artifacts.require('./WyvernTokenTransferProxy.sol')


module.exports = async (deployer) => {
  // Deploy the proxy registry
  await deployer.deploy(WyvernProxyRegistry);
  await deployer.deploy(WyvernTokenTransferProxy, WyvernProxyRegistry.address);

  // Deploying the exchange
  await deployer.deploy(WyvernExchange,
    /* Address of the registry instance this exchange will use */         
    WyvernProxyRegistry.address,
    /* TokenTransferProxy */    
    WyvernTokenTransferProxy.address,
    /* Address of the token used for protocol fees */ 
    tokenInstance.address, 
    /* Where to send protocol fees */
    '0xF8dac7973f0F444E19bf671915187A0A92f18313'
  );

  // Authenticate wyvern proxy registry
  let proxyRegistry = await WyvernProxyRegistry.deployed();
  let exchange = await WyvernExchange.deployed();
  await proxyRegistry.grantInitialAuthentication(exchange.address);
}
