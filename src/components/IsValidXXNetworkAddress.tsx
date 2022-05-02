import { decodeAddress, encodeAddress } from '@polkadot/keyring';

// Check if an address is a valid xx network address
const isValidXXNetworkAddress = (address: string): boolean => {
  // Quit early if hex string
  if (address.startsWith('0x')) {
    return false;
  }
  try {
    // Use ss58 format 55, which is registered for xx network
    const val = decodeAddress(address, false, 55);
    const addr = encodeAddress(val, 55);
    return addr.length === 48;
  } catch (error) {
    return false;
  }
};

export default isValidXXNetworkAddress;
