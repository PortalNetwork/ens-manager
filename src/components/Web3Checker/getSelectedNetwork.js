export default async function getSelectedNetwork(web3) {
  return await new Promise((resolve, reject) => {
    web3.version.getNetwork((error, result) => {
      return error ? reject(error) : resolve(result)
    })
  })
}