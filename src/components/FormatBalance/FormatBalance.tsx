import BN from 'bn.js';

import React from 'react';

import { formatBalance } from './formatter';

interface Props {
  children?: React.ReactNode;
  symbol?: string;
  precision?: number;
  denomination?: number;
  className?: string;
  isShort?: boolean;
  label?: React.ReactNode;
  labelPost?: LabelPost;
  value: BN | string;
  withCurrency?: boolean;
  withSi?: boolean;
}

// for million, 2 * 3-grouping + comma
const M_LENGTH = 6 + 1;
const K_LENGTH = 3 + 1;

type LabelPost = string | React.ReactNode

function createElement(prefix: string, postfix: string, unit: string, label: LabelPost = '', isShort = false): React.ReactNode {
  const hasDecimal = !isShort && !!postfix;
  return <>{`${prefix}${hasDecimal ? '.' : ''}`}{!isShort && <span className='ui--FormatBalance-postfix'>{postfix ? `${postfix || ''}` : ''}</span>}<span className='ui--FormatBalance-unit'>&nbsp;{unit}</span>{label}</>;
}

function applyFormat(value: BN | string, denomination: number, symbol: string, withCurrency = true, withSi?: boolean, _isShort?: boolean, labelPost?: LabelPost, precision?: number): React.ReactNode {
  const [prefix, postfix] = formatBalance(value, { decimals: denomination, forceUnit: '-', precision, withSi: false }).split('.');
  const isShort = _isShort || (withSi && prefix.length >= K_LENGTH);
  const unitPost = withCurrency ? symbol : '';

  if (prefix.length > M_LENGTH) {
    const formatted = formatBalance(value, { decimals: denomination, precision, withUnit: false });
    const divider = formatted.includes('.') ? '.' : ' ';
    const [major, rest] = formatted.split(divider);
    const [minor, unit] = rest.includes(' ') ? rest.split(' ') : [, rest];

    return <>{major}{minor ? '.' : ''}<span className='ui--FormatBalance-postfix'>{minor}</span><span className='ui--FormatBalance-unit'> {unit}{unit ? unitPost : ` ${unitPost}`}</span>{labelPost || ''}</>;
  }

  return createElement(prefix, postfix, unitPost, labelPost, isShort);
}

function FormatBalance({ children, className = '', denomination = 9, isShort, label, labelPost, precision = 2, symbol = 'XX', value, withCurrency, withSi }: Props): React.ReactElement<Props> {
  const formatted = applyFormat(value, denomination, symbol, withCurrency, withSi, isShort, labelPost, precision)
  return (
    <span className={`ui--FormatBalance ${className}`}>
      {label ? <>{label}&nbsp;</> : ''}
      <span
        className='ui--FormatBalance-value'
        data-testid='balance-summary'
      >
        {formatted}
      </span>
      {children}
    </span>
  );
}

export default FormatBalance;
