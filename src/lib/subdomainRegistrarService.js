import { getEthereumProvider, getEthereumRegistrarAddress } from './web3Service';
import SubdomainRegistrar from './subdomainRegistrar.js';
const abi = require('ethereumjs-abi');
const Web3 = require('web3');
let web3 = new Web3();
let subdomainRegistrars = null;

const setWeb3Provider = () => {
  web3.setProvider(new web3.providers.HttpProvider(getEthereumProvider(process.env.WNS_NETWORK)));
  subdomainRegistrars = new SubdomainRegistrar(web3, getEthereumRegistrarAddress(process.env.WNS_NETWORK));
}
// setWeb3Provider();
/**
 * TODO: 設定 User Subdomain
 * 
 * @description 設定 Subdomain
 * @param {*} _subdomain 
 * @param {*} _domain
 * @param {*} _topdomain
 * @param {*} _owner
 * @param {*} _target
 * @returns {string} bid hash
 */
export const setSubdomain = (_subdomain, _domain, _topdomain, _owner, _target) => {
    try {
        let byteData = "0x" + 		
            abi.methodID("newSubdomain", [ "string", "string", "string", "address", "address" ]).toString("hex") + 		
            abi.rawEncode([ "string", "string", "string", "address", "address" ], [ _subdomain, _domain, _topdomain, _owner, _target ]).toString("hex");
        return byteData;
    } catch (err) {
        console.log('setSubdomain: ', _subdomain, _domain, _topdomain, _owner, _target);
        return 'setSubdomain error';
    }
}
  