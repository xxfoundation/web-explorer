import { bnToBn, calcSi, formatDecimal, isBoolean } from '@polkadot/util';
import { SiDef, ToBn } from '@polkadot/util/types';
import { SI, SI_MID } from '@polkadot/util/format/si';
import BN from 'bn.js';

const defaultDecimals = 9;

interface Options {
  precision?: number;
  decimals?: number;
  forceUnit?: string;
  withSi?: boolean;
  withSiFull?: boolean;
  withUnit?: boolean | string;
}

function getUnits(si: SiDef, withSi: boolean, withSiFull: boolean, withUnit: boolean | string): string {
  const unit = isBoolean(withUnit)
    ? SI[SI_MID].text
    : withUnit;

  return withSi || withSiFull
    ? si.value === '-'
      ? withUnit
        ? ` ${unit}`
        : ''
      : ` ${withSiFull ? `${si.text}${withUnit ? ' ' : ''}` : si.value}${withUnit ? unit : ''}`
    : '';
}


function getPrePost(text: string, decimals: number, forceUnit?: string, precision = 4): [SiDef, string, string] {
  // NOTE We start at midpoint (8) minus 1 - this means that values display as
  // 123.456 instead of 0.123k (so always 6 relevant). Additionally we use ceil
  // so there are at most 3 decimal before the decimal separator
  const si = calcSi(text, decimals, forceUnit);
  const mid = text.length - (decimals + si.power);
  const prefix = text.substring(0, mid);
  const padding = mid < 0 ? 0 - mid : 0;
  const padded = new Array(padding + 1).join('0')
  const post = `${padded}${text}`.substring(mid < 0 ? 0 : mid);
  const precisionpad = new Array(precision + 1).join('0')
  const postfix = `${post}${precisionpad}`.substring(0, precision);

  return [si, prefix || '0', postfix];
}

// Formats a string/number with <prefix>.<postfix><type> notation
export function formatBalance<ExtToBn extends ToBn>(input?: number | string | bigint | ExtToBn | BN, options: Options | boolean = true, optDecimals: number = defaultDecimals): string {
  let text = bnToBn(input).toString();

  if (text.length === 0 || text === '0') {
    return '0';
  }

  // extract options - the boolean case is for backwards-compat
  const { decimals = optDecimals, forceUnit = undefined, precision = 2, withSi = true, withSiFull = false, withUnit = true } = isBoolean(options)
    ? { withSi: options }
    : options;

  // strip the negative sign so we can work with clean groupings, re-add this in the
  // end when we return the result (from here on we work with positive numbers)
  let sign = '';

  if (text[0].startsWith('-')) {
    sign = '-';
    text = text.substring(1);
  }

  const [si, prefix, postfix] = getPrePost(text, decimals, forceUnit, precision);
  const units = getUnits(si, withSi, withSiFull, withUnit);

  return `${sign}${formatDecimal(prefix)}${postfix ? '.' : ''}${postfix}${units}`;
}