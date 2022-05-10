import { isHex } from '@polkadot/util';

const HashValidator = (value: string) => isHex(value, 256);

export default HashValidator;
