/* global artifacts: false */

const MerkleProof = artifacts.require('./MerkleProof.sol')
const WyvernToken = artifacts.require('./WyvernToken.sol')
const WyvernDAO = artifacts.require('./WyvernDAO.sol')

const { utxoMerkleRoot, utxoAmount } = require('../test/auxiliary.js')

module.exports = async (deployer, network) => {

  // For now, it will skip this step. 
  // We don't need a DAO right now, nor do we need our own token. We just need an exchange.
  return;

  if (network === 'main' || network === 'rinkeby') return;

  // Deploys the merkle proof from when WyvernToken used to be on a blockchain.
  await deployer.deploy(MerkleProof);
  deployer.link(MerkleProof, WyvernToken);
  await deployer.deploy(WyvernToken, utxoMerkleRoot, utxoAmount);
  await deployer.deploy(WyvernDAO, WyvernToken.address);

  let tokenInstance = await WyvernToken.deployed();
  let daoInstance = await WyvernDAO.deployed();
  await tokenInstance.releaseTokens.sendTransaction(daoInstance.address);
}
