export default async function getSelectedAccount(web3) {
  return await new Promise((resolve, reject) => {
    web3.eth.getAccounts((error, result) => {
      return error ? reject(error) : resolve(result[0])
    })
  })
}