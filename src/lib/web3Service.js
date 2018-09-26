export const getEthereumProvider = (networkId = '1') => {
  switch (networkId) {
    case '1':
      return "http://wanchain-testnet.portal.network" //Wanchain testnet
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

export const getEthereumRegistrarAddress = (networkId = '1') => {
  alert(networkId)
  switch (networkId) {
    case '1':
      return "0xeec6bc4d213bf5d7b247a578b9bf13d7443b5546" //Wanchain testnet
    case '3':
      return '0x0';
    default:
      return '0x0';
  }
}

export const getEthereumRegistryAddress = (networkId = '1') => {
  switch (networkId) {
    case '1':
      return "0xe85cFDF43a0db4aa0ec054A57451AF7C73d4625b" //Wanchain testnet
    case '3':
      return '0x0';
    default:
      return '0x0';
  }
}

export const getEthereumResolverAddress = (networkId = '1') => {
  switch (networkId) {
    case '1':
      return "0x3f5ad0ab415d451bcec48cfcbd61aee126687cd4" //Wanchain testnet
    case '3':
      return '0x0';
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
