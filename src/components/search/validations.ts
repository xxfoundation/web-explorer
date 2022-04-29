import { SearchTypes } from '../../schemas/search.schema';
import HashValidator from '../HashValidator';
import isValidXXNetworkAddress from '../IsValidXXNetworkAddress';

const extrinsicPattern = /^([a-z\-])+$/;

const validNumber = (value: string) => !isNaN(Number(value));
const validStringWithHifen = (value: string) => !!value.match(extrinsicPattern)?.length;

const validators: Record<SearchTypes, (v: string) => boolean> = {
  all: (value: string) => !!value,
  blocks: (value: string) => validNumber(value),
  extrinsics: (value: string) =>
    validNumber(value) || validStringWithHifen(value) || HashValidator(value),
  event: (value: string) => validNumber(value) || validStringWithHifen(value),
  account: (value: string) => isValidXXNetworkAddress(value)
};

export default validators;
