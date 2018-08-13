import { getEthereumProvider } from './web3Service';
import Deed from './deed';
const Web3 = require('web3');
let web3 = new Web3();

const setWeb3Provider = () => {
  web3.setProvider(new web3.providers.HttpProvider(getEthereumProvider(process.env.WNS_NETWORK)));
}

export const getOwner = async (address) => {
  try {
    setWeb3Provider();
    let deed = new Deed(web3, address);
    return await deed.getOwner();
  } catch (err) {
    console.log('getOwner: ', address, err);
    return 'owner addr not found';
  }
}
