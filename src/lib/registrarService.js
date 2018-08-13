import { getEthereumProvider, getEthereumRegistrarAddress } from './web3Service';
import Registrar from './registrar';
const abi = require('ethereumjs-abi');
const Web3 = require('web3');
let web3 = new Web3();
let registrar = null;

const setWeb3Provider = () => {
  web3.setProvider(new web3.providers.HttpProvider(getEthereumProvider(process.env.WNS_NETWORK)));
  registrar = new Registrar(web3, getEthereumRegistrarAddress(process.env.WNS_NETWORK));
}

export const mode = ["Open", "Auction", "Owned", "Forbidden", "Reveal", "NotYetAvailable"];

/**
 * @description STEP 1: 確認一下該.eth狀態，回傳 tuple 多維度資訊
 * https://github.com/ethereum/ens/blob/master/contracts/HashRegistrarSimplified.sol#L174
 * 
 * Example Usage: 
 *   entries("foobar");  // 只需搜尋需要註冊的名稱
 * 
 * @param {*} name 
 * @returns {array} tuple
 */
export const getEntries = async (name) => {
  try {
    setWeb3Provider();
    const result = await registrar.entries(web3.sha3(name));
    return {
      state: mode[result[0].toString()],
      deed: result[1],
      registrationDate: new Date(result[2].toNumber() * 1000),
      value: result[3].toNumber(),
      highestBid: result[4].toNumber()
    }
  } catch (err) {
    console.log('getEntries: ', name, err);
    return 'entries not found';
  }
}

/**
 * @description 如果 entires[0] 回傳是5，則代表"soft launch"結束後可以開標
 * @param {*} name 
 */
export const getAllowedTime = async (name) => {
  try {
    setWeb3Provider();
    return await registrar.getAllowedTime(web3.sha3(name));
  } catch (err) {
    console.log('getAllowedTime: ', name, err);
    return 'getAllowedTime not found';
  }
}

/**
 * TODO: 輸出 JSON 格式，可以允許匯入，順便支援 ens.domains 的格式
 * 
 * @description 加密投標資訊，選定網域名稱設定混淆投標金額以及密碼
 * https://github.com/ethereum/ens/blob/master/contracts/HashRegistrarSimplified.sol#L333
 * @param {*} name 
 * @param {*} address
 * @param {*} ether
 * @param {*} secret
 * @returns {string} bid hash
 */
export const getShaBid = async (name, address, ether, secret) => {
  try {
    setWeb3Provider();
    //console.log('toWei', ether, web3.toWei(ether, 'ether'));
    return await registrar.shaBid(web3.sha3(name), address, web3.toWei(ether, 'ether'), web3.sha3(secret));
  } catch (err) {
    console.log('getShaBid: ', name, address, ether, secret, err);
    return 'getShaBid not found';
  }
}

/**	
 * @description STEP 2: 同時開標並且投標，整合 startAuction + newBid		
 * https://github.com/ethereum/ens/blob/master/contracts/HashRegistrarSimplified.sol#L369		
 * return transactionHash		
 * @param {*} name 	
 * @param {*} address 		
 * @param {*} ether 		
 * @param {*} secret 			
 * @returns {string} byteData
 */		
export const startAuctionsAndBid = async (name, address, ether, secret) => {
  try {
    const bid = await getShaBid(name, address, ether, secret);
    let byteData = "0x" + 		
                abi.methodID("startAuctionsAndBid", [ "bytes32[]", "bytes32" ]).toString("hex") + 		
                abi.rawEncode([ "bytes32[]", "bytes32" ], [ [web3.sha3(name)], bid ]).toString("hex");
    return byteData;
  } catch (err) {
    console.log('startAuctionsAndBid: ', name, address, ether, secret, err);
    return 'startAuctionsAndBid error';
  }
}

/**
 * @description STEP 3: 投標，將加密後的資訊發送至合約
 * https://github.com/ethereum/ens/blob/master/contracts/HashRegistrarSimplified.sol#L350
 * @param {*} name 
 * @param {*} address 
 * @param {*} ether
 * @param {*} secret 
 * @returns {string} byteData
 */
export const newBid = async (name, address, ether, secret) => {
  try {
    const bid = await getShaBid(name, address, ether, secret);
    let byteData = "0x" +
                  abi.methodID("newBid", [ "bytes32" ]).toString("hex") +
                  abi.rawEncode([ "bytes32" ], [ bid ]).toString("hex");
    return byteData;
  } catch (err) {
    console.log('newBid: ', name, address, ether, secret, err);
    return 'newBid error';
  }
}

/**
 * @description STEP 4: 揭標，將資訊發送至合約
 * https://github.com/ethereum/ens/blob/master/contracts/HashRegistrarSimplified.sol#L381
 * @param {*} name 
 * @param {*} ether 
 * @param {*} secret
 * @returns {string} transactionHash
 */
export const unsealBid = (name, ether, secret) => {
  try {
    let byteData = "0x" +
                  abi.methodID("unsealBid", [ "bytes32", "uint", "bytes32" ]).toString("hex") +
                  abi.rawEncode([ "bytes32", "uint", "bytes32" ], 
                  [ web3.sha3(name), web3.toWei(ether, "ether") ,web3.sha3(secret) ]).toString("hex");
    return byteData;
  } catch (err) {
    console.log('unsealBid: ', name, ether, secret, err);
    return 'unsealBid error';
  }
}

/**
 * @description STEP 5: 結標，將網域名發送至合約以完成結標，如果多人得標，將會退回第一名與第二名間差額的標金
 * https://github.com/ethereum/ens/blob/master/contracts/HashRegistrarSimplified.sol#L458
 * @param {*} name 
 * @returns {string} transactionHash
 */
export const finalizeAuction = (name) => {
  try {
    let byteData = "0x" +
                  abi.methodID("finalizeAuction", [ "bytes32" ]).toString("hex") +
                  abi.rawEncode([ "bytes32" ], [ web3.sha3(name) ]).toString("hex");
    return byteData;
  } catch (err) {
    console.log('finalizeAuction: ', name, err);
    return 'finalizeAuction error';
  }
}

/**
 * @description 如果忘記揭標，可以之後呼叫這隻取回一部分的標金
 * https://github.com/ethereum/ens/blob/master/contracts/HashRegistrarSimplified.sol#L434
 * @param {*} name 
 * @param {*} ether 
 * @param {*} secret 
 * @returns {string} byteData
 */
export const cancelBid = async (name, address, ether, secret) => {
  try {
    const bid = await getShaBid(name, address, ether, secret);
    let byteData = "0x" +
                  abi.methodID("cancelBid", [ "address", "bytes32" ]).toString("hex") +
                  abi.rawEncode([ "address", "bytes32" ], [ address, bid ]).toString("hex");
    return byteData;
  } catch (err) {
    console.log('cancelBid: ', name, address, ether, secret, err);
    return 'cancelBid error';
  }
}

/**
 * @description 轉移網域所有權，整個網域移交給另外一個帳戶管理，這個網域不再屬於你
 * https://github.com/ethereum/ens/blob/master/contracts/HashRegistrarSimplified.sol#L475
 * @param {*} name 
 * @param {*} address 
 * @returns {string} byteData
 */
export const transfer = (name, address) => {
  try {
    let byteData = "0x" +
                  abi.methodID("transfer", [ "bytes32", "address" ]).toString("hex") +
                  abi.rawEncode([ "bytes32", "address" ], [ web3.sha3(name), address ]).toString("hex");
    return byteData;
  } catch (err) {
    console.log('transfer: ', name, address, err);
    return 'transfer error';
  }
}
