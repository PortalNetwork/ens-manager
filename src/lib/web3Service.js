export const getEthereumProvider = (networkId = '1') => {
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

export const getEthereumRegistrarAddress = (networkId = '1') => {
  switch (networkId) {
    case '1': 
      return '0x6090A6e47849629b7245Dfa1Ca21D94cd15878Ef';
    case '3':
      return '0x0';
    default:
      return '0x0';
  }
}

export const getEthereumRegistryAddress = (networkId = '1') => {
  switch (networkId) {
    case '1':
      return '0x314159265dD8dbb310642f98f50C066173C1259b';
    case '3':
      return '0x0';
    default:
      return '0x0';
  }
}

export const getEthereumResolverAddress = (networkId = '1') => {
  switch (networkId) {
    case '1':
      return '0x0b3ebeccc00e9ceae2bf3235d558eda7398be91e';
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
