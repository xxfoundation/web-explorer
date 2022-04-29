import { SearchTypes } from '../../schemas/search.schema';

// const extrinsicPattern = /^([a-z\-])+$/;
const eventComposedKeyPattern = /^[0-9]+\-[0-9]+$/;

const validNumber = (value: string) => !isNaN(Number(value));
const patternVerification = (pattern: RegExp, value: string) => !!value.match(pattern)?.length;

const validators: Record<SearchTypes, (v: string) => boolean> = {
  all: (value: string) => !!value,
  blocks: (value: string) => validNumber(value),
  event: (value: string) =>
    validNumber(value) || patternVerification(eventComposedKeyPattern, value)
  // extrinsics: (value: string) =>
  //   validNumber(value) || patternVerification(extrinsicPattern, value) || HashValidator(value),
  // account: (value: string) => isValidXXNetworkAddress(value)
};

export default validators;
