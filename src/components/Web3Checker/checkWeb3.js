import getSelectedAccount from './getSelectedAccount'
import getSelectedNetwork from './getSelectedNetwork'

export default async function checkWeb3(web3, network = null, account = null) {
  if (typeof web3 !== 'object' || web3 === null) {

    throw new Error(`Can't find Web3 injected object!`)

  } else if (
    ![undefined, null, false].includes(network) &&
    parseInt(await getSelectedNetwork(web3)) !== network
  ) {

    throw new Error(`Web3's selected network is not the same as given (${network})!`)

  } else if (
    ![undefined, null, false].includes(account) &&
    await getSelectedAccount(web3) !== account
  ) {

    throw new Error(`Web3's selected account is not the same as given (${account})!`)

  }
}