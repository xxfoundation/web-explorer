// Copyright 2017-2022 @polkadot/react-query authors & contributors
// SPDX-License-Identifier: Apache-2.0

import BN from 'bn.js';

import React from 'react';

import { formatBalance } from '@polkadot/util';

interface Props {
  children?: React.ReactNode;
  symbol?: string;
  decimals?: number;
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

function createElement (prefix: string, postfix: string, unit: string, label: LabelPost = '', isShort = false): React.ReactNode {
  return <>{`${prefix}${isShort ? '' : '.'}`}{!isShort && <span className='ui--FormatBalance-postfix'>{`0000${postfix || ''}`.slice(-4)}</span>}<span className='ui--FormatBalance-unit'> {unit}</span>{label}</>;
}

function applyFormat (value: BN | string, decimals: number, symbol: string, withCurrency = true, withSi?: boolean, _isShort?: boolean, labelPost?: LabelPost): React.ReactNode {
  const [prefix, postfix] = formatBalance(value, { decimals, forceUnit: '-', withSi: false }).split('.');
  const isShort = _isShort || (withSi && prefix.length >= K_LENGTH);
  const unitPost = withCurrency ? symbol : '';


  if (prefix.length > M_LENGTH) {
    const [major, rest] = formatBalance(value, { decimals, withUnit: false }).split('.');
    const minor = rest.slice(0, 4);
    const unit = rest.slice(4);

    return <>{major}.<span className='ui--FormatBalance-postfix'>{minor}</span><span className='ui--FormatBalance-unit'>{unit}{unit ? unitPost : ` ${unitPost}`}</span>{labelPost || ''}</>;
  }

  return createElement(prefix, postfix, unitPost, labelPost, isShort);
}

function FormatBalance ({ children, className = '', decimals = 0, isShort, label, labelPost, symbol = 'XX', value, withCurrency, withSi }: Props): React.ReactElement<Props> {
  const formatted = applyFormat(value, decimals, symbol, withCurrency, withSi, isShort, labelPost)
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