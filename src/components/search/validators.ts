import { isValidXXNetworkAddress, validateExtrinsicHash } from '../../utils';
import { SearchTypes } from './types';

const validNumber = (value: string) => !isNaN(Number(value));

const validators: Record<SearchTypes, (v: string) => boolean> = {
  blocks: (value: string) => validNumber(value),
  extrinsic: (value: string) => validNumber(value) || validateExtrinsicHash(value),
  accounts: (value: string) => value.length === 48 && isValidXXNetworkAddress(value)
};

export default validators;
