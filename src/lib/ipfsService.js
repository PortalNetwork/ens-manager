import ipfsAPI from 'ipfs-api';

const ipfs = ipfsAPI({host: 'ipfs.infura.io', port: '5001', protocol: 'https'});

export const add = async (files) => {
  try {
    const hash = await ipfs.files.add(files, { recursive: false });

    return hash;
  } catch (err) {
    console.log('add: ', files, err);
    return 'add not found';
  }
}
