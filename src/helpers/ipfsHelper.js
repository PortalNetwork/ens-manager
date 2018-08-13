import multihash from './multihash';

/**
 * store in content
 * @param {*} hash 
 */
export const toMultiHash = function(hash) {
  let buf = multihash.fromB58String(hash);
  return '0x' + multihash.toHexString(buf);
}

/**
 * 
 * @param {*} hash 
 */
export const fromMultiHash = function(hash) {
  let hex = hash.substring(2)
  let buf = multihash.fromHexString(hex);
  return multihash.toB58String(buf);
}

/**
 * 
 * @param {*} hash 
 */
export const toContentHash = function(hash) {
  let buf = multihash.fromB58String(hash)
  let digest = multihash.decode(buf).digest
  return '0x' + multihash.toHexString(digest)
}

/**
 * 
 * @param {*} hash 
 */
export const fromContentHash = function(hash) {
  const hex = hash.substring(2)
  const buf = multihash.fromHexString(hex)
  return multihash.toB58String(multihash.encode(buf, 'sha2-256'))
}

/**
 * 
 * @param {*} ipfsHash 
 */
export const getContentHash = function(ipfsHash) {
  let buf = multihash.fromB58String(ipfsHash)
  let digest = multihash.decode(buf).digest
  return '0x' + multihash.toHexString(digest)
}