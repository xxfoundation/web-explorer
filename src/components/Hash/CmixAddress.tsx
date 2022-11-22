import type { Props as HashProps } from './index';

import React from 'react';
import Hash from './index';
import { toDashboardNodeUrl } from '../../utils';
import { useTranslation } from 'react-i18next';

type Props = HashProps

const CmixAddress: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  if (!props.value) {return (
    <>{t('N/A')}</>)
  }
  return (<Hash {...props} url={toDashboardNodeUrl(props.value)} />)
};

export default CmixAddress;
