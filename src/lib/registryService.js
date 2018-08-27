import {
  getEthereumProvider,
  getEthereumRegistryAddress
} from './web3Service';
import Registry from './registry';
import registryJSON from './registry.json';
const abi = require('ethereumjs-abi');
const Web3 = require('web3');
const namehash = require('eth-ens-namehash');
let web3 = new Web3();
let registry = null;

const setWeb3Provider = () => {
  web3.setProvider(new web3.providers.HttpProvider(getEthereumProvider(process.env.ENS_NETWORK)));
  registry = new Registry(web3, getEthereumRegistryAddress(process.env.ENS_NETWORK));
}

/**
 * @description 
 * 
 * Example Usage: 
 *   entries("foobar");  // 只需搜尋需要註冊的名稱
 * 
 * @param {*} name 
 * @param {*} label
 * @param {*} owner
 */
export const setSubnodeOwner = (name, label, owner) => {
  try {
    // name 要用 namehash
    let byteData = "0x" +
      abi.methodID("setSubnodeOwner", ["bytes32", "bytes32", "address"]).toString("hex") +
      abi.rawEncode(["bytes32", "bytes32", "address"], [namehash.hash(name), web3.sha3(label), owner]).toString("hex");
    return byteData;
  } catch (err) {
    console.log('setSubnodeOwner: ', name, label, owner, err);
    return 'setSubnodeOwner error';
  }
}

/**
 * 
 * @param {*} name 
 * @param {*} resolver 
 */
export const setResolver = (name, resolver) => {
  try {
    // name 要用 namehash
    let byteData = "0x" +
      abi.methodID("setResolver", ["bytes32", "address"]).toString("hex") +
      abi.rawEncode(["bytes32", "address"], [namehash.hash(name), resolver]).toString("hex");
    return byteData;
  } catch (err) {
    console.log('setResolver: ', name, resolver, err);
    return 'setResolver error';
  }
}

export const getResolver = async (name) => {
  try {
    setWeb3Provider();
    registry = new Registry(web3, getEthereumRegistryAddress(process.env.ENS_NETWORK));
    const resolver = await registry.getResolver(namehash.hash(name));
    return resolver;
  } catch (err) {
    console.log('getResolver: ', name, err);
    return 'getResolver error';
  }
}

export const getOwner = async (name) => {
  try {
    setWeb3Provider();
    registry = new Registry(web3, getEthereumRegistryAddress(process.env.ENS_NETWORK));
    const owner = await registry.getOwner(namehash.hash(name));
    return owner;
  } catch (err) {
    console.log('getOwner: ', name, err);
    return 'getOwner error';
  }
}

export const newOwnerEvent = async (web3, name) => {
  try {
    const registryInstance = await web3.eth.contract(registryJSON).at(getEthereumRegistryAddress(process.env.ENS_NETWORK));
    
    const newOwnerEvent = registryInstance.NewOwner({node: namehash.hash(name)}, {fromBlock: 3327417, toBlock: 'latest'});
    return newOwnerEvent;
  } catch (err) {
    console.log('newOwnerEvent: ', err);
    return 'newOwnerEvent error';
  }
}
