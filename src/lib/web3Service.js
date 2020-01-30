const isSupTestNet = false;
const nId = isSupTestNet ? "3" : "1";
const RegistrarAddr = '0xc19fd9004b5c9789391679de6d766b981db94610';
const RegistryAddr = '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e';
const ResolverAddr = '0x4c641fb9bad9b60ef180c31f56051ce826d21a9a';
const SubDomainAddr = '0x5c5860c3f35efd9b72a6c789d393769deb64399f';
export const getEtherscanUrl = (result, networkId = nId) => {
  switch (networkId) {
    case '1':
      return `https://etherscan.io/tx/${result}`;
    case '3':
      return `https://ropsten.etherscan.io/tx/${result}`;
    default:
      return `https://ropsten.etherscan.io/tx/${result}`;
  }
}

export const getEthereumProvider = (networkId = nId) => {
  switch (networkId) {
    case '1':
      return 'https://mainnet.infura.io/';
    case '3':
      return 'https://ropsten.infura.io/';
    case '4':
      return 'https://rinkeby.infura.io/';
    case '42':
      return 'https://kovan.infura.io/';
    default:
      return 'http://localhost:3000/';
  }
}

export const getEthereumRegistrarAddress = (networkId = nId) => {
  switch (networkId) {
    case '1': 
      return '0x6090A6e47849629b7245Dfa1Ca21D94cd15878Ef';
    case '3':
      return isSupTestNet ? RegistrarAddr : '0x0';
    default:
      return '0x0';
  }
}

export const getEthereumRegistryAddress = (networkId = nId) => {
  switch (networkId) {
    case '1':
      return '0x314159265dD8dbb310642f98f50C066173C1259b';
    case '3':
      return isSupTestNet ? RegistryAddr : '0x0';
    default:
      return '0x0';
  }
}

export const getEthereumSubdomainRegistrarAddress = (networkId = nId) => {
  switch (networkId) {
    case '1':
      return '0xf2b95d46e0e191115c5e9079c0c79a0105f36dd9';
    case '3':
      return isSupTestNet ? SubDomainAddr : '0x0';
    default:
      return '0x0';
  }
}

export const getEthereumResolverAddress = (networkId = nId) => {
  switch (networkId) {
    case '1':
      return '0x0b3ebeccc00e9ceae2bf3235d558eda7398be91e';
    case '3':
      return isSupTestNet ? ResolverAddr : '0x0';
    default:
      return '0x0';
  }
}

export const getCurrentAddress = (web3) => {
  if (web3 === null) return;
  return web3.eth.accounts[0];
}

export const getCurrentNetwork = (web3) => {
  if (web3 === null) return;
  return web3.version.network;
}
