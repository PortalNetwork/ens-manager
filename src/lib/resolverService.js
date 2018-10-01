import {
  getEthereumProvider
} from './web3Service';
import Resolver from './resolver';
import {
  getContentHash
} from '../helpers/ipfsHelper';
const abi = require('ethereumjs-abi');
const namehash = require('eth-ens-namehash');
let resolver = null;

/**
 * 
 * @param {*} name 
 * @param {*} content 
 */
export const setContent = (name, content) => {
  try {
    // name 要用 namehash
    let byteData = "0x" +
      abi.methodID("setContent", ["bytes32", "bytes32"]).toString("hex") +
      abi.rawEncode(["bytes32", "bytes32"], [namehash.hash(name), getContentHash(content)]).toString("hex");
    console.log('HASHED: name', namehash.hash(name), 'content', getContentHash(content));
    return byteData;
  } catch (err) {
    console.log('setResolver: ', name, content, err);
    return 'setResolver error';
  }
}

/**
 * 
 * @param {*} name 
 * @param {*} resolverAddr 
 * @param {*} web3Provider 
 */
export const getContent = async (name, resolverAddr, web3Provider) => {
  try {
    resolver = new Resolver(web3Provider, resolverAddr);
    const content = await resolver.contentHash(namehash.hash(name));
    return content;
  } catch (err) {
    console.log('getContent: ', name, err);
    return 'getContent not found';
  }
}

/**
 * 
 * @param {*} name 
 * @param {*} address 
 */
export const setAddress = (name, address) => {
  try {
    let byteData = "0x" +
      abi.methodID("setAddr", ["bytes32", "address"]).toString("hex") +
      abi.rawEncode(["bytes32", "address"], [namehash.hash(name), address]).toString("hex");
    return byteData;
  } catch (err) {
    console.log('setAddress: ', name, address, err);
    return 'setAddress error';
  }
}

/**
 * 
 * @param {*} name 
 * @param {*} resolverAddr 
 * @param {*} web3Provider 
 */
export const getAddress = async (name, resolverAddr, web3Provider) => {
  try {
    resolver = new Resolver(web3Provider, resolverAddr);
    const content = await resolver.address(namehash.hash(name));
    return content;
  } catch (err) {
    console.log('getAddress: ', name, err);
    return 'getAddress not found';
  }
}

/**
 * 
 * @param {*} name 
 * @param {*} key 
 * @param {*} value 
 */
export const setText = (name, key, value) => {
  try {
    let byteData = "0x" +
      abi.methodID("setText", ["bytes32", "string", "string"]).toString("hex") +
      abi.rawEncode(["bytes32", "string", "string"], [namehash.hash(name), key, value]).toString("hex");
    return byteData;
  } catch (err) {
    console.log('setText: ', name, key, value, err);
    return 'setText error';
  }
}

/**
 * 
 * @param {*} name 
 * @param {*} key 
 * @param {*} resolverAddr 
 * @param {*} web3Provider 
 */
export const getText = async (name, key, resolverAddr, web3Provider) => {
  try {
    resolver = new Resolver(web3Provider, resolverAddr);
    const content = await resolver.getText(namehash.hash(name), key);
    console.log('text', content);
    return content;
  } catch (err) {
    console.log('getText: ', name, key, err);
    return 'getText not found';
  }
}

export const getSupportsInterface = async (method, resolverAddr, web3Provider) => {
  try {
    resolver = new Resolver(web3Provider, resolverAddr);
    const content = await resolver.supportsInterface(method);
    return content;
  } catch (err) {
    console.log('getSupportsInterface: ', method, err);
    return 'getSupportsInterface not found';
  }
}
