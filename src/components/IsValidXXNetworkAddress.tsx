import { decodeAddress } from '@polkadot/keyring';

// Check if an address is a valid xx network address
// Use ss58 format 55, which is registered for xx network
const isValidXXNetworkAddress = (address: string): boolean => {
  try {
    decodeAddress(address, false, 55);
    return true;
  } catch (error) {
    return false;
  }
};

export default isValidXXNetworkAddress;
