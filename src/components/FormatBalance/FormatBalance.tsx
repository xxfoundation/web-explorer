import React from 'react';
import { BN } from '@polkadot/util/bn';
import { formatBalance } from './formatter';
import { stripNonDigits } from '../../utils';
import { CustomTooltip } from '../Tooltip';
import PriceTag from '../PriceTag';

interface Props {
  children?: React.ReactNode;
  symbol?: string;
  precision?: number;
  denomination?: number;
  className?: string;
  isShort?: boolean;
  label?: React.ReactNode;
  labelPost?: LabelPost;
  value: string | BN;
  withCurrency?: boolean;
  withSi?: boolean;
  withTooltip?: boolean;
  price?: boolean;
}

// for million, 2 * 3-grouping + comma
const M_LENGTH = 6 + 1;
const K_LENGTH = 3 + 1;

type LabelPost = string | React.ReactNode;

function createElement(
  prefix: string,
  postfix: string,
  unit: string,
  label: LabelPost = '',
  isShort = false
): React.ReactNode {
  const hasDecimal = !isShort && !!postfix;
  return (
    <>
      {`${prefix}${hasDecimal ? '.' : ''}`}
      {!isShort && (
        <span className='ui--FormatBalance-postfix'>{postfix ? `${postfix || ''}` : ''}</span>
      )}
      <span className='ui--FormatBalance-unit'>&nbsp;{unit}</span>
      {label}
    </>
  );
}

export function applyFormat(
  value: Props['value'],
  denomination: number,
  symbol: string,
  withCurrency = true,
  withSi?: boolean,
  _isShort?: boolean,
  labelPost?: LabelPost,
  precision?: number
): React.ReactNode {
  const stripped = stripNonDigits(value);
  const [prefix, postfix] = formatBalance(stripped, {
    decimals: denomination,
    forceUnit: '-',
    precision,
    withSi: false
  }).split('.');
  const isShort = _isShort || (withSi && prefix.length >= K_LENGTH);
  const unitPost = withCurrency ? symbol : '';

  if (prefix.length > M_LENGTH) {
    const formatted = formatBalance(stripped, {
      decimals: denomination,
      precision,
      withUnit: false
    });
    const divider = formatted.includes('.') ? '.' : ' ';
    const [major, rest] = formatted.split(divider);
    const [minor, unit] = rest.includes(' ') ? rest.split(' ') : [, rest];

    return (
      <>
        {major}
        {minor ? '.' : ''}
        <span className='ui--FormatBalance-postfix'>{minor}</span>
        <span className='ui--FormatBalance-unit'>
          {' '}
          {unit}
          {unit ? unitPost : ` ${unitPost}`}
        </span>
        {labelPost || ''}
      </>
    );
  }

  return createElement(prefix, postfix, unitPost, labelPost, isShort);
}

function FormatBalance({
  children,
  className = '',
  denomination = 9,
  isShort,
  label,
  labelPost,
  precision = 2,
  price = false,
  symbol = 'XX',
  value,
  withCurrency,
  withSi,
  withTooltip = true,
}: Props): React.ReactElement<Props> {
  const formatted = applyFormat(
    value,
    denomination,
    symbol,
    withCurrency,
    withSi,
    isShort,
    labelPost,
    precision
  );
  const coinValue = parseFloat(window.localStorage.getItem('coin_value') || '0')
  const priceTag = applyFormat(
    new BN(parseFloat((value+''))/1_000 * (coinValue)).muln(1000),
    denomination,
    '$',
    withCurrency,
    withSi,
    isShort,
    labelPost,
    precision 
  )
  const formattedBalance = (
    <span className={`ui--FormatBalance ${className}`}>
      {label ? <>{label}&nbsp;</> : ''}
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'end'}}>
        <span className='ui--FormatBalance-value' data-testid='balance-summary'>
          {formatted}
        </span>
        {price ? <PriceTag value={priceTag} /> : <></>}
      </div>
      {children}
    </span>
  );

  return withTooltip
      ? <CustomTooltip title={formatBalance(value, { withSi: false, precision: 9, decimals: 9, forceUnit: '-' })}>{formattedBalance}</CustomTooltip>
      : formattedBalance
}

export default FormatBalance;
