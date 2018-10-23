// duck pattern
const OPEN_TRANSFER_POP = 'ENSManager/app/OPEN_TRANSFER_POP';

const OPEN_SET_RESOLVER_POP = 'ENSManager/app/OPEN_SET_RESOLVER_POP';

const OPEN_SET_SUBDOMAIN_POP = 'ENSManager/app/OPEN_SET_SUBDOMAIN_POP';

const OPEN_SET_ADDRESS_POP = 'ENSManager/app/OPEN_SET_ADDRESS_POP';

const OPEN_IPFS_POP = 'ENSManager/app/OPEN_IPFS_POP';

const CLOSE_POPUP = 'ENSManager/app/CLOSE_POPUP';

export function openTransferPop() {
  return ({
    type: OPEN_TRANSFER_POP,
  });
}

export function openSetResolverPop() {
  return ({
    type: OPEN_SET_RESOLVER_POP,
  });
}

export function openSetSubDomainPop() {
  return ({
    type: OPEN_SET_SUBDOMAIN_POP,
  });
}

export function openSetAddressPop() {
  return ({
    type: OPEN_SET_ADDRESS_POP,
  });
}

export function openSetIPFSPop() {
  return ({
    type: OPEN_IPFS_POP,
  });
}

export function closePopUp() {
  return ({
    type: CLOSE_POPUP,
  });
}

const initialState = {
  isFoggy: false,             // 模糊效果
  isEditResover: false,
  isTransferOwner: false,
  isSetSubdomain: false,
  isSetAddress: false,
  isSetIpfs: false,
};

export default (state = initialState, action = {}) => {
  switch(action.type) {
    case OPEN_TRANSFER_POP:
      return ({
        ...state,
        isFoggy: true,
        isTransferOwner: true,
      });
      break;
    case OPEN_SET_RESOLVER_POP:
      return ({
        ...state,
        isFoggy: true,
        isEditResover: true,
      });
      break;
    case OPEN_SET_SUBDOMAIN_POP:
      return ({
        ...state,
        isFoggy: true,
        isSetSubdomain: true,
      });
      break;
    case OPEN_SET_ADDRESS_POP:
      return ({
        ...state,
        isFoggy: true,
        isSetAddress: true,
      });
      break;
    case OPEN_IPFS_POP:
      return ({
        ...state,
        isFoggy: true,
        isSetIpfs: true,
      });
      break;
    case CLOSE_POPUP:
      return ({
        ...state,
        isFoggy: false,
        isTransferOwner: false,
        isEditResover: false,
        isSetSubdomain: false,
        isSetAddress: false,
        isSetIpfs: false,
      });
      break;
    default:
      return state;
  }
}