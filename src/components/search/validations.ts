import { SearchTypes } from '../../schemas/search.schema';

const eventkeyPattern = /^[0-9]+(\-[0-9]+)?$/;

const validNumber = (value: string) => !isNaN(Number(value));
const patternVerification = (pattern: RegExp, value: string) => !!value.match(pattern)?.length;

const validators: Record<SearchTypes, (v: string) => boolean> = {
  all: (value: string) => !!value,
  blocks: (value: string) => validNumber(value),
  events: (value: string) => patternVerification(eventkeyPattern, value)
  // extrinsics: (value: string) =>
  //   validNumber(value) || patternVerification(extrinsicPattern, value) || HashValidator(value),
  // account: (value: string) => isValidXXNetworkAddress(value)
};

export default validators;
